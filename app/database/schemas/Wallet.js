/* eslint no-param-reassign: ["error", { "props": false }] */
const mongoose = require('mongoose');
const { db } = require('../../tools/mongoDb');

const WalletSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 10,
  },
}, {
  timestamps: true,
  toObject: {
    transform: (doc, object) => {
      delete object.__v;
      delete object._id;
    },
  },
});

module.exports = db.model('Wallet', WalletSchema);
