const { database } = require('mongodb-delpinos');
require('dotenv').config();

const db = database(process.env.DB_URL);

module.exports = {
  db,
};
