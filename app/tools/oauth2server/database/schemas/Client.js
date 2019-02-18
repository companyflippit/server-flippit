const mongoose = require('mongoose');
const { db } = require('../../tools/mongoDb');

const ClientSchema = new mongoose.Schema({
  name: String,
  clientId: String,
  clientSecret: String,
  basic: String,
  redirectUris: {
    type: [String],
  },
  grants: {
    type: [String],
    default: ['authorization_code', 'password', 'refresh_token', 'client_credentials'],
  },
  scope: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = db.model('Client', ClientSchema);
