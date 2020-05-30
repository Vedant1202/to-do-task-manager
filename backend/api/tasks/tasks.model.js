const mongoose = require('mongoose');

const { Schema } = mongoose;
const tasksSchema = new Schema(
  {
    title: {
      type: String,
      unique: false,
      required: true,
    },
    description: {
      type: String,
      unique: false,
      required: false,
    },
    dueDate: {
      type: String,
      unique: false,
      required: true,
    },
    status: {
      type: String,
      unique: false,
      required: true,
    },
    tags: [
      {
        type: String,
        unique: false,
        required: false,
      },
    ],
    addedOn: {
      type: String,
      unique: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = tasksSchema;
