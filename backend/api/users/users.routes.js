const User = require('./users.controller');

module.exports = function (router) {
    router.post('/user/create', User.createUser);
    router.post('/user/auth', User.getUser);
};
