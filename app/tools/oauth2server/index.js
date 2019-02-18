const { assignRoutes } = require('./routes');
const { authenticate } = require('./tools/middlewares');

module.exports = {
  assignRoutes,
  authenticate,
};
