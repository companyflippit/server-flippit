const MomoJWT = require('./schemas/accessToken');

const create = object => MomoJWT
  .create(object);

const get = () => MomoJWT
  .find({})
  .sort({ createdAt: '-1' });

module.exports = {
  create,
  get,
};
