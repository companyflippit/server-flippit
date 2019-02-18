const OAuthAccessToken = require('./schemas/AccessToken');

const create = object => OAuthAccessToken
  .create(object);

const getAccessToken = query => OAuthAccessToken
  .findOne(query)
  .populate('user')
  .populate('client');

const deleteAccessToken = query => OAuthAccessToken
  .findOneAndDelete(query);
module.exports = {
  create,
  getAccessToken,
  deleteAccessToken,
};
