const { AppError } = require('error-delpinos').errors;
const walletDatabase = require('../database/wallet');

const createWallet = async (email) => {
  const wallet = await walletDatabase.getWallet({ owner: email });
  if (wallet) {
    throw new AppError('There are already a wallet!', 400);
  }
  const response = await walletDatabase.create({ owner: email });
  return response.toObject();
};

const getWallet = async (email) => {
  const response = await walletDatabase.getWallet({ owner: email });
  if (!response) {
    throw new AppError('No wallet!', 400);
  }
  return response.toObject();
};

const updateWallet = async (email, body) => {
  const wallet = await walletDatabase.getWallet({ owner: email });
  if (!wallet) {
    throw new AppError('No wallet!', 400);
  }
  if (body.balance < 0) {
    throw new AppError('Permission denied!', 400);
  }
  const newBalance = wallet.balance - body.balance;
  if (newBalance < 0) {
    throw new AppError('You has not enougth flips!', 400);
  }
  const response = await walletDatabase.updateWallet({ _id: wallet._id }, { balance: newBalance });
  if (!response) {
    throw new AppError('Some error occours!', 400);
  }
  return response.toObject();
};

module.exports = {
  createWallet,
  getWallet,
  updateWallet,
};
