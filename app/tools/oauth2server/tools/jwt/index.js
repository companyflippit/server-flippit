const { AppError } = require('error-delpinos').errors;
const jwt = require('jsonwebtoken');
const { Claims } = require('./src/claims');
require('dotenv').config();

const exp = process.env.OAUTH_JWT_EXPIRATION;
const secret = process.env.OAUTH_JWT_SECRET;


const encryptToken = (clientId, userId) => {
  const claims = Claims(clientId, userId);
  return jwt.sign(claims, secret, { expiresIn: exp });
};

const decryptToken = token => jwt.decode(token);

const verifyToken = async (token) => {
  try {
    const response = await jwt.verify(token, secret);
    return response;
  } catch (error) {
    throw new AppError(error.message, 400);
  }
};

module.exports = {
  encryptToken,
  decryptToken,
  verifyToken,
};
