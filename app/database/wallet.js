const Wallet = require('./schemas/Wallet');

const create = object => Wallet
  .create(object);

const getWallet = query => Wallet
  .findOne(query);

const updateWallet = (query, object) => Wallet
  .findOneAndUpdate(query, object, { new: true });

module.exports = {
  create,
  getWallet,
  updateWallet,
};
