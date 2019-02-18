const user = require('./user');
const token = require('./token');
const client = require('./client');
const password = require('./password');

const assignRoutes = (app) => {
  app.use('/oauth2/token', token);
  app.use('/oauth2/user', user);
  app.use('/oauth2/client', client);
  app.use('/oauth2/password', password);
};

module.exports = {
  assignRoutes,
};
