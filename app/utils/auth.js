module.exports = {
    authenticate: function (req, res, next) {
        'use strict';
        // Check for a token.
        if (req.query.token !== null && req.query.token !== undefined) {
            // Find the user owning the given token
            req.db.collection('users')
                .find({ token: req.params.token })
                .limit(1)
                .toArray(function (err, result) {
                    if (err) {
                        throw err;
                    }
                    // If none, return a 401 error
                    if (result.length < 1) {
                        res.status(401).send();
                    } else {
                        req.user = result[0];
                    }
                    next();
                });
        // If there is no token, proceed as an unauthenticated request:
        } else {
            req.user = null;
            next();
        }
    },
    require: function (req, res, next) {
        'use strict';
        if (req.user === undefined || req.user === null) {
            res.status(401).send();
        }
        next();
    }
};
