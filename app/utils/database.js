module.exports = (function () {
    'use strict';
    var mongo = require('mongoskin');

    return {
        connect: function (req, res, next) {
            req.db = mongo.db('mongodb://test_user:test_pass@ds047762.mongolab.com:47762/nekoiku');
            next();
        },
        disconnect: function (req, res, next) {
            req.db.close();
            next();
        }
    };

}());
