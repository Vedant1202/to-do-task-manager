const mongoose = require('mongoose');
const tasksSchema = require('./tasks.model');

tasksSchema.statics = {
  create(data, cb) {
    const task = new this(data);
    task.save(cb);
  },

  get(query, cb) {
    this.find(query, cb).sort({ _id: -1 });
  },

  getByName(query, cb) {
    this.find(query, cb);
  },

  update(query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete(query, cb) {
    this.findOneAndDelete(query, cb);
  },
};

const tasksModel = mongoose.model('Tasks', tasksSchema);
module.exports = tasksModel;
