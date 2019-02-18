const OAuthRefreshToken = require('./schemas/RefreshToken');

const create = object => OAuthRefreshToken
  .create(object);

const getRefreshToken = query => OAuthRefreshToken
  .findOne(query)
  .populate('user')
  .populate('client');

const deleteRefreshToken = query => OAuthRefreshToken
  .findOneAndDelete(query);

module.exports = {
  create,
  getRefreshToken,
  deleteRefreshToken,
};
