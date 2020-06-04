const User = require('../users/users.dao');
const jwtHandler = require('./jwt.controller');

module.exports = {
    validateTokenHandler: (req, res, next) => {
        const authorizationHeader = req.headers.authorization;
        let result;
        if (authorizationHeader) {
            const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
            try {
                result = jwtHandler.verify(token);
                req.decoded = result;
                next();
            } catch (err) {
                result = {
                    error: 'Internal server error.',
                    status: 500,
                };
                res.status(500).send(result);
                throw new Error(err);
            }
        } else {
            result = {
                error: 'Authentication error. Token required.',
                status: 401,
            };
            res.status(401).send(result);
        }
    },

    authenticateUserHandler(req, res, next) {
        if (req.decoded.email && req.decoded.password) {
            User.getByEmail({ email: req.decoded.email }, function (err, user) {
                if (err) {
                    res.json({
                        error: err,
                    });
                }
                if (String(req.decoded.password) === String(user.password)) {
                    next();
                } else {
                    const msg = {
                        error: 'Unauthorized. Wrong credentials.',
                        status: 401,
                    };
                    res.status(401).send(msg);
                }
            });
        } else {
            res.status(401).send({
                error: 'Authorization error. Missing data in token.',
                status: 401,
            });
        }
    },
};
