module.exports = function () {
    'use strict';
    var express = require('express'),
        Product = require('../models/Product'),
        auth = require('../utils/auth'),
        router = express.Router();

    // Global calls for the entire controller
    router.use(function (req, res, next) {
        auth.require(req, res, next);
    });

    router.get('/:name', function (req, res, next) {
        var name = req.params.name;

        req.db.collection('products')
            .find({ name: { $regex: new RegExp('^' + name, 'i') } })
            .toArray(function (err, result) {
                if (err) throw err;
                var i = result.length;
                while (i--) {
                    switch (req.user.membership.level) {
                        default:
                        case 'STANDARD':
                            result[i].analysis = 'This content is reserved for PREMIUM users.';
                        case 'PREMIUM':
                            result[i].stockage = 'This content is reserved for PROFESSIONAL users.';
                            break;
                    }
                }
                res.json(result);
            });
    });
    router.get('/name/:name', function(req, res) {
        console.log('Searching by name!');

        var name = req.params.name;

        req.db.collection('products')
            .find({ name: { $regex: new RegExp('^' + name, 'i') } })
            .toArray(function (err, result) {
                if (err) {
                    throw err;
                }
                res.send(result);
            });
    });


    router.get('/multiverse/:multiverse_id', function(req, res) {
        var multiverse_id = req.params.multiverse_id;

        req.db.collection('products')
            .find({ multiverse_id: { $eq: multiverse_id }})
            .toArray(function (err, result) {
                if (err) {
                    throw err;
                }
                if (result.length < 1) {
                    res.status(404);
                    res.send({error: 'This multiverse_id is not on our DB.'});
                }
                res.send(result[0]);
            });

    });


    return router;
};
