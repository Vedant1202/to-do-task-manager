/* eslint-disable no-unused-vars */
const User = require('./users.dao');
const jwtHandler = require('../auth/jwt.controller');
const { encryptPassword, comparePassword } = require('../auth/encrypt');

exports.createUser = function (req, res, next) {
    encryptPassword(req.body.password, (hashError, hash) => {
        if (hashError) {
            res.json({
                error: hashError,
            });
        }

        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
        };

        User.create(user, function (err, result) {
            if (err) {
                res.json({
                    error: err,
                });
            } else {
                const payload = {
                    userId: result._id,
                    email: result.email,
                    password: result.password,
                };

                res.json({
                    status: true,
                    email: user.email,
                    name: user.name,
                    token: jwtHandler.sign(payload),
                });
            }
        });
    });
};

exports.getUser = function (req, res, next) {
    if (req.body && req.body.email && req.body.password) {
        User.getByEmail({ email: req.body.email }, function (err, user) {
            if (err) {
                res.json({
                    error: err,
                });
            }
            if (user) {
                comparePassword(req.body.password, user.password, (matchError, result) => {
                    let msg;
                    if (matchError) {
                        msg = {
                            error: 'Internal server error.',
                            status: 500,
                        };
                        res.status(500).send(msg);
                    }

                    if (result) {
                        const payload = {
                            userId: user._id,
                            email: user.email,
                            password: user.password,
                        };

                        res.json({
                            success: result,
                            email: user.email,
                            name: user.name,
                            token: jwtHandler.sign(payload),
                        });
                    } else {
                        msg = {
                            success: result,
                            error: 'Wrong credentials.',
                            status: 401,
                        };
                        res.status(401).send(msg);
                    }
                });
            } else {
                res.status(401).send({
                    error: 'Authorization error. User not found.',
                    status: 401,
                });
            }
        });
    } else {
        res.status(401).send({
            error: 'Authorization error. Missing data.',
            status: 401,
        });
    }
};
