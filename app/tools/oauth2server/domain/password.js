const { AppError } = require('error-delpinos').errors;
const { sendEmail } = require('gmail-nodemailer-delpinos');
const { Email } = require('gmail-nodemailer-delpinos');
const cryptoHash = require('../tools/hash');
const userDatabase = require('../database/user');
const clientDatabase = require('../database/client');
const joi = require('../tools/joi');
const jwtTools = require('../tools/jwt');
require('dotenv').config();

const changePassword = async (id, object) => {
  const { password } = object;
  const user = object;
  const { passwordHash, salt } = cryptoHash.generatePassword(password);
  user.password = passwordHash;
  user.salt = salt;
  const response = await userDatabase.updateUser(id, user);
  return response;
};

const askResetPassword = async (object) => {
  const checkedEmail = joi.user.emailValidate(object);
  const { email } = checkedEmail;
  const user = await userDatabase.getUser({ email });
  const client = await clientDatabase.getClient({ name: process.env.OAUTH_ADMIN_USERNAME });
  const jwtToken = jwtTools.encryptToken(client.name, user.email);
  const mailOptions = Email(
    user.email,
    'Reset Password',
    `resetToken: 
    ${jwtToken}`,
    '',
  );
  await sendEmail(mailOptions);
  return 'An email has been sent!';
};

const resetPassword = async (object) => {
  const checkedObject = joi.user.resetPasswordValidate(object);

  const { resetToken, username, password } = checkedObject;
  const token = await jwtTools.verifyToken(resetToken);
  const userInDb = await userDatabase.getUser({ username, email: token.iss });
  if (!userInDb) {
    throw new AppError('Invalid credentials!', 400);
  }

  const user = { password };
  const { passwordHash, salt } = cryptoHash.generatePassword(password);
  user.password = passwordHash;
  user.salt = salt;
  await userDatabase.updateUser(userInDb._id, user);
  return 'Password has been reset!';
};

module.exports = {
  changePassword,
  askResetPassword,
  resetPassword,
};
