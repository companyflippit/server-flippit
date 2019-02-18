/* eslint no-param-reassign: ["error", { "props": false }] */
const mongoose = require('mongoose');
const { db } = require('../../tools/mongoDb');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  code: String,
  phone: Number,
  validated: {
    type: Boolean,
    default: true,
  },
  validationCode: {
    type: String,
  },
  scope: {
    type: String,
    default: 'profile',
  },
}, {
  timestamps: true,
  toObject: {
    transform: (doc, object) => {
      delete object._id;
      delete object.password;
      delete object.salt;
      delete object.__v;
      delete object.scope;
      delete object.validationCode;
    },
  },
});

module.exports = db.model('User', UserSchema);
