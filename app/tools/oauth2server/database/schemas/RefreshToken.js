const mongoose = require('mongoose');
const { db } = require('../../tools/mongoDb');

const RefreshTokenSchema = new mongoose.Schema({
  refreshToken: String,
  refreshTokenExpiresAt: Date,
  scope: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
});

module.exports = db.model('RefreshToken', RefreshTokenSchema);
