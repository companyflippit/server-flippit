const express = require('express');

const router = express.Router();
const passwordDomain = require('../domain/password');
const { authenticate, confirmPasswords } = require('../tools/middlewares');

const changePassword = async (req, res, next) => {
  try {
    const response = await passwordDomain.changePassword(req.user._id, req.body);
    res.send({ data: response, status: 200 });
  } catch (error) {
    next(error);
  }
};
router.post('/', confirmPasswords, authenticate, changePassword);

const askResetPassword = async (req, res, next) => {
  try {
    const response = await passwordDomain.askResetPassword(req.body);
    res.send({ data: response, status: 200 });
  } catch (error) {
    next(error);
  }
};
router.post('/reset/step1', askResetPassword);

const resetPassword = async (req, res, next) => {
  try {
    const response = await passwordDomain.resetPassword(req.body);
    res.send({ data: response, status: 200 });
  } catch (error) {
    next(error);
  }
};
router.post('/reset/step2', confirmPasswords, resetPassword);

module.exports = router;
