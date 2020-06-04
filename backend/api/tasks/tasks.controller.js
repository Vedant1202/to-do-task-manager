/* eslint-disable no-unused-vars */
const Tasks = require('./tasks.dao');

exports.createTask = function (req, res, next) {
    const task = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        status: req.body.status,
        tags: req.body.tags,
        addedOn: req.body.addedOn,
        addedBy: req.decoded.userId,
    };

    Tasks.create(task, function (err, result) {
        if (err) {
            res.json({
                error: err,
            });
        } else {
            res.json({
                message: 'Task created successfully',
            });
        }
    });
};

exports.getTasks = function (req, res, next) {
    Tasks.get({ addedBy: req.decoded.userId }, function (err, tasks) {
        if (err) {
            res.json({
                error: err,
            });
        } else {
            res.json({
                tasks,
            });
        }
    });
};

exports.updateTask = function (req, res, next) {
    const task = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        status: req.body.status,
        tags: req.body.tags,
        addedOn: req.body.addedOn,
        addedBy: req.decoded.userId,
    };
    Tasks.update({ _id: req.body._id }, task, function (err, result) {
        if (err) {
            res.json({
                error: err,
            });
        } else {
            res.json({
                message: 'Task updated successfully',
            });
        }
    });
};

exports.removeTask = function (req, res, next) {
    Tasks.delete({ _id: req.body._id, addedBy: req.decoded.userId }, function (err, task) {
        if (err) {
            res.json({
                error: err,
            });
        } else {
            res.json({
                message: 'Task deleted successfully',
            });
        }
    });
};
