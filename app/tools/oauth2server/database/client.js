const OAuthClient = require('./schemas/Client');

const create = object => OAuthClient
  .create(object);

const getClient = query => OAuthClient
  .findOne(query);

module.exports = {
  create,
  getClient,
};
