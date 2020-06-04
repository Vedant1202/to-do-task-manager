const Tasks = require('./tasks.controller');
const authHandler = require('../auth/auth');

module.exports = function (router) {
    router.post('/task/create', authHandler.validateTokenHandler, authHandler.authenticateUserHandler, Tasks.createTask);
    router.get('/task/get', authHandler.validateTokenHandler, authHandler.authenticateUserHandler, Tasks.getTasks);
    router.put('/task/update', authHandler.validateTokenHandler, authHandler.authenticateUserHandler, Tasks.updateTask);
    router.delete('/task/remove', authHandler.validateTokenHandler, authHandler.authenticateUserHandler, Tasks.removeTask);
};
