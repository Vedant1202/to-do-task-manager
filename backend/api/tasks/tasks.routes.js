const Tasks = require('./tasks.controller');

module.exports = function (router) {
    router.post('/task/create', Tasks.createTask);
    router.get('/task/get', Tasks.getTasks);
    router.get('/task/get/:name', Tasks.getTask);
    router.put('/task/update', Tasks.updateTask);
    router.delete('/task/remove', Tasks.removeTask);
};
