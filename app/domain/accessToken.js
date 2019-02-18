const { AppError } = require('error-delpinos').errors;
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Claims } = require('../tools/jwt');
const accessTokenDatabase = require('../database/accessToken');


const getMomoJWT = async () => {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60;
  const jti = crypto.createHash('sha256').update(crypto.randomBytes(32)).digest('hex');
  const cert = fs.readFileSync(path.resolve('app/domain/private.pem'));
  const token = jwt.sign(Claims(exp, jti), cert, { algorithm: 'RS256' });
  return token;
};
const getAccessToken = async () => {
  try {
    const options = {
      method: 'POST',
      body: '',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const token = await getMomoJWT();
    const url = `https://oauth2.zonadeprueba.es/token?grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}`;
    const response = await fetch(url, options);
    const json = await response.json();
    return json.access_token;
  } catch (error) {
    throw new AppError('Problem with client auth', 500);
  }
};

const clientAuth = async () => {
  const createdAccessToken = await accessTokenDatabase.get();
  if (!createdAccessToken[0]) {
    const accessToken = await getAccessToken();
    const exp = Math.floor(Date.now() / 1000) + 60 * 60;
    const object = {
      access_token: accessToken,
      exp,
    };
    const newAccessToken = await accessTokenDatabase.create(object);
    return newAccessToken.access_token;
  }
  if (createdAccessToken[0].exp - Math.floor(Date.now() / 1000) < 0) {
    const accessToken = await getAccessToken();
    const exp = Math.floor(Date.now() / 1000) + 60 * 60;
    const object = {
      access_token: accessToken,
      exp,
    };
    const newAccessToken = await accessTokenDatabase.create(object);
    return newAccessToken.access_token;
  }
  return createdAccessToken[0].access_token;
};

module.exports = {
  clientAuth,
};
