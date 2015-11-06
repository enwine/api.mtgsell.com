module.exports = function () {
    'use strict';
    var express = require('express'),
        router = express.Router();

    // Simple unauthenticated API request
    // will return only the required data
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
