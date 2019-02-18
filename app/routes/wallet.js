
const express = require('express');

const router = express.Router();
const walletDomain = require('../domain/wallet');
const { authenticate } = require('../tools/oauth2server/tools/middlewares');

const getWallet = async (req, res, next) => {
  try {
    const response = await walletDomain.getWallet(req.user.email);
    res.send({ data: response, status: 200 });
  } catch (error) {
    next(error);
  }
};

router.get('/', authenticate, getWallet);

const createWallet = async (req, res, next) => {
  try {
    const response = await walletDomain.createWallet(req.user.email);
    res.send({ data: response, status: 200 });
  } catch (error) {
    next(error);
  }
};

router.post('/', authenticate, createWallet);

const updateWallet = async (req, res, next) => {
  try {
    const response = await walletDomain.updateWallet(req.user.email, req.body);
    res.send({ data: response, status: 200 });
  } catch (error) {
    next(error);
  }
};
router.patch('/', authenticate, updateWallet);

module.exports = router;
