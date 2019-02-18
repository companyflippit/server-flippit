const express = require('express');

const router = express.Router();
const userDomain = require('../domain/user');
const { confirmPasswords, authenticate } = require('../tools/middlewares');

const getUserLoggedIn = async (req, res, next) => {
  try {
    const response = await userDomain.getUserLoggedIn(req.user._id);
    res.send({ data: response, status: 200 });
  } catch (error) {
    next(error);
  }
};
router.get('/', authenticate, getUserLoggedIn);

const createUser = async (req, res, next) => {
  try {
    const response = await userDomain.create(req.body);
    res.send({ data: response, status: 200 });
  } catch (error) {
    next(error);
  }
};
router.post('/', confirmPasswords, createUser);

const editUser = async (req, res, next) => {
  try {
    const response = await userDomain.editUser(req.user._id, req.body);
    res.send({ data: response, status: 200 });
  } catch (error) {
    next(error);
  }
};
router.patch('/', authenticate, editUser);

const createUserAdmin = async (req, res, next) => {
  try {
    const response = await userDomain.createAdmin();
    res.send({ data: response, status: 200 });
  } catch (error) {
    next(error);
  }
};
router.post('/admin', createUserAdmin);

module.exports = router;
