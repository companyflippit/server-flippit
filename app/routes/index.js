
const wallet = require('./wallet');
const action = require('./action');
const client = require('./client');

const assignRoutes = (app) => {
  app.get('/', (req, res) => {
    res.redirect('/generic.jpg');
  });
  app.use('/api/wallet', wallet);
  app.use('/api/action', action);
  app.use('/api/client', client);
};

module.exports = {
  assignRoutes,
  action,
};
