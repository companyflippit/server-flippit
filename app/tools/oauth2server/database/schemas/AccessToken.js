const mongoose = require('mongoose');
const { db } = require('../../tools/mongoDb');

const AccessTokenSchema = new mongoose.Schema({
  accessToken: String,
  accessTokenExpiresAt: Date,
  scope: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
});

module.exports = db.model('AccessToken', AccessTokenSchema);
