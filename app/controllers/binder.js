module.exports = function () {
    'use strict';
    var express = require('express'),
        Binder = require('../models/Binder'),
        auth = require('../utils/auth'),
        router = express.Router();

    // Global calls for the entire controller
    router.use(function (req, res, next) {
        auth.require(req, res, next);
    });

    // Create a new binder
    router.post('/', function (req, res, next) {
        var name = req.body.name,
            collection = req.body.collection,
            color = req.body.color;

        // Check if the collection exists and is owned by the authenticated user.
        req.db.collection('collections')
            .findById(collection, function (err, result) {
                if (err) throw err;
                // If the collection is found add the binder to it
                if (result !== null && result.user_id === req.user._id.toHexString()) {
                    req.db.collection('binders')
                        .insertOne(new Binder(name, color, collection, result.user_id), function (err, r) {
                            if (err) throw err;
                            if (r.insertedCount > 0) {
                                res.status(201).send();
                            } else {
                                res.status(409).send();
                            }
                            next();
                        });
                } else {
                    res.status(404).send();
                    next();
                }
            });
    });

    // Get a binder
    router.get('/:id', function (req, res, next) {
        var binder = req.params.id;

        req.db.collection('binders')
            .findById(binder, function (err, result) {
                if (err) throw err;
                if (result !== null && result.user_id === req.user._id.toHexString()) {
                    res.status(200).json(result);
                } else {
                    res.status(404).send();
                }
                next();
            });
    });

    return router;
};
