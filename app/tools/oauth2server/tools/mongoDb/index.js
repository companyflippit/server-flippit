const { database } = require('mongodb-delpinos');
require('dotenv').config();

const db = database(process.env.OAUTH_DB_URL);

module.exports = {
  db,
};
