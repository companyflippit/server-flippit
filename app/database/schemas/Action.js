/* eslint no-param-reassign: ["error", { "props": false }] */
const mongoose = require('mongoose');
const { db } = require('../../tools/mongoDb');

const ActionSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  web: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  toObject: {
    transform: (doc, object) => {
      delete object._id;
      delete object.__v;
      delete object.updatedAt;
    },
  },
});

module.exports = db.model('Action', ActionSchema);
