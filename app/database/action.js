const Action = require('./schemas/Action');

const createAction = object => Action
  .create(object);

const getAllActions = query => Action
  .find(query);

module.exports = {
  createAction,
  getAllActions,
};
