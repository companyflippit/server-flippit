const mongoose = require('mongoose');
const { db } = require('../../tools/mongoDb');

const accessTokenSchema = new mongoose.Schema({
  access_token: {
    type: String,
    required: true,
  },
  exp: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = db.model('AccessToken', accessTokenSchema);
