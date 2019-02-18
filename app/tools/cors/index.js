const cors = require('cors');
const { corsOptions } = require('../../config/cors');

const setCors = (app) => {
  app.use(cors(corsOptions));
};

module.exports = {
  setCors,
};
