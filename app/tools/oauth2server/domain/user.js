const { AppError } = require('error-delpinos').errors;
require('dotenv').config();

const cryptoHash = require('../tools/hash');
const userDatabase = require('../database/user');
const clientDomain = require('./client');
const joi = require('../tools/joi');

const create = async (object) => {
  const checkedUser = joi.user.createUserValidate(object);
  const { email, password } = checkedUser;
  let { username } = checkedUser;
  if (!username) {
    username = email;
    checkedUser.username = email;
  }
  const existUsername = await userDatabase.getUser({ username });
  if (existUsername) {
    throw new AppError('Username unavailable!', 400);
  }
  const existEmail = await userDatabase.getUser({ email });
  if (existEmail) {
    throw new AppError('Email unavailable!', 400);
  }
  const user = checkedUser;
  const { passwordHash, salt } = cryptoHash.generatePassword(password);
  user.password = passwordHash;
  user.salt = salt;
  const response = await userDatabase.create(user);
  return response.toObject();
};

const getUser = async (username, password) => {
  const checkedUsername = joi.user.usernameValidate(username);
  const checkedPassword = joi.user.passwordValidate(password);

  const user = await userDatabase.getUser({ username: checkedUsername });
  if (!user) {
    throw new AppError('Invalid credentials!', 400);
  }
  const verifiedPassword = cryptoHash.verifyPassword(checkedPassword, user.salt, user.password);
  if (!verifiedPassword) {
    throw new AppError('Invalid credentials!', 400);
  }
  return user;
};

const getUserLoggedIn = async (userId) => {
  const response = await userDatabase.getUser({ _id: userId });
  return response.toObject();
};

const editUser = async (userId, newUser) => {
  const checkedUser = joi.user.editUserValidate(newUser);

  const oldUser = await userDatabase.getUser({ _id: userId });
  if (!oldUser) {
    throw new AppError('User not found!', 400);
  }
  const { username, email } = checkedUser;
  if (oldUser.username !== checkedUser.username) {
    const existUsername = await userDatabase.getUser({ username });
    if (existUsername) {
      throw new AppError('Username unavailable!', 400);
    }
  }
  if (oldUser.email !== checkedUser.email) {
    const existEmail = await userDatabase.getUser({ email });
    if (existEmail) {
      throw new AppError('Email unavailable!', 400);
    }
  }
  const response = await userDatabase.updateUser(userId, checkedUser);
  return response.toObject();
};

const createAdmin = async () => {
  const username = process.env.OAUTH_ADMIN_USERNAME;
  const password = process.env.OAUTH_ADMIN_PASSWORD;
  const email = process.env.OAUTH_ADMIN_EMAIL;
  const existUsername = await userDatabase.getUser({ username });
  if (existUsername) {
    throw new AppError('The administrator has already been created!', 400);
  }
  const user = { username, password, email };
  const { passwordHash, salt } = cryptoHash.generatePassword(user.password);
  user.password = passwordHash;
  user.salt = salt;
  const admin = await userDatabase.create(user);
  const client = await clientDomain.create({ user: admin._id.toString(), name: admin.username });
  const response = Object.assign({ admin }, { client });
  return response;
};
module.exports = {
  create,
  getUser,
  createAdmin,
  getUserLoggedIn,
  editUser,
};
