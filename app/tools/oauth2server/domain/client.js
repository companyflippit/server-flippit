const { AppError } = require('error-delpinos').errors;
const crypto = require('crypto');
const clientDatabase = require('../database/client');
const joi = require('../tools/joi');
const toBase64 = require('../tools/base64');

const create = async (object) => {
  const checkedClient = joi.client.clientValidate(object);

  const dbClient = await clientDatabase.getClient(checkedClient);
  if (dbClient) {
    throw new AppError('Client already exists!', 400);
  }
  checkedClient.clientId = crypto.createHash('md5').update(crypto.randomBytes(16)).digest('hex');
  checkedClient.clientSecret = crypto.createHash('sha256').update(crypto.randomBytes(32)).digest('hex');
  checkedClient.scope = 'profile';
  checkedClient.basic = toBase64(`${checkedClient.clientId}:${checkedClient.clientSecret}`);
  const response = await clientDatabase.create(checkedClient);
  return response;
};

const getClient = async (clientId, clientSecret) => {
  const checkedClientId = joi.client.clientIdValidate(clientId);
  const checkedClientSecret = joi.client.clientSecretValidate(clientSecret);

  const query = { clientId: checkedClientId, clientSecret: checkedClientSecret };
  const response = await clientDatabase.getClient(query);
  if (!response) {
    throw new AppError('Not client found!', 400);
  }
  return Object.assign(response, { id: checkedClientId });
};

const getClientByUserId = async (userId) => {
  const query = { user: userId };
  const response = await clientDatabase.getClient(query);
  if (!response) {
    throw new AppError('Not client found!', 400);
  }
  return response;
};
module.exports = {
  create,
  getClient,
  getClientByUserId,
};
