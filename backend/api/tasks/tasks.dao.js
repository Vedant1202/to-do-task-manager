const mongoose = require('mongoose');
const TaskSchema = require('./tasks.model');

TaskSchema.statics = {
    create(data, cb) {
        const task = new this(data);
        task.save(cb);
    },

    get(query, cb) {
        this.find(query, cb).sort({ _id: -1 });
    },

    update(query, updateData, cb) {
        this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
    },

    delete(query, cb) {
        this.findOneAndDelete(query, cb);
    },
};

const TasksModel = mongoose.model('Tasks', TaskSchema);
module.exports = TasksModel;
