const User = require('./schemas/User');

const create = object => User
  .create(object);

const getUser = query => User
  .findOne(query);

const updateUser = (id, object) => User
  .findOneAndUpdate({ _id: id }, object, { new: true });

module.exports = {
  create,
  getUser,
  updateUser,
};
