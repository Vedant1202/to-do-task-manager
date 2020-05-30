const Tasks = require('./tasks.dao');

exports.createTask = function (req, res, next) {
  const task = {
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    status: req.body.status,
    tags: req.body.tags,
    addedOn: req.body.addedOn,
  };

  Tasks.create(task, function (err, task) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Task created successfully',
    });
  });
};

exports.getTasks = function (req, res, next) {
  Tasks.get({}, function (err, tasks) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      tasks,
    });
  });
};

exports.getTask = function (req, res, next) {
  Tasks.get({ title: req.params.title }, function (err, tasks) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      tasks,
    });
  });
};

exports.updateTask = function (req, res, next) {
  const task = {
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    status: req.body.status,
    tags: req.body.status,
    addedOn: req.body.addedOn,
  };
  Tasks.update({ _id: req.body.id }, task, function (err, task) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Task updated successfully',
    });
  });
};

exports.removeTask = function (req, res, next) {
  Tasks.delete({ _id: req.body.id }, function (err, task) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Task deleted successfully',
    });
  });
};
