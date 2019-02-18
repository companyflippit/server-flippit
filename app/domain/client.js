const fetch = require('node-fetch');
const { AppError } = require('error-delpinos').errors;
const fs = require('fs');
const path = require('path');
const NodeRSA = require('node-rsa');


const accessTokenDomain = require('./accessToken');

const getDigest = (ts) => {
  const url = `POST https://apibaas.zonadeprueba.es/v1.0/client?ts=${ts}`;
  const cert = fs.readFileSync(path.resolve('app/domain/private.pem'));
  const key = new NodeRSA(cert, { b: 256 });
  const encrypted = key.sign(url, 'base64');
  return encrypted;
};
const createClient = async () => {
  const accessToken = await accessTokenDomain.clientAuth();
  const body = {
    agencia: 'CU',
    telefonoMovil: '+34618203670',
  };
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const ts = Math.floor(Date.now() / 1000);
    const digest = getDigest(ts);
    const url = `https://apibaas.zonadeprueba.es/v1.0/client?ts=${ts}&digest=${digest}`;
    const rawResponse = await fetch(url, options);
    const response = await rawResponse.json();
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError('Problem with client auth', 500);
  }
};

module.exports = {
  createClient,
};
