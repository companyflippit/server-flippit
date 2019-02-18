const Json2csvParser = require('json2csv').Parser;
/**
 * Take 2 inputs, the columns as Array and the data as an Array of Objects (JSON).
 * @param  {Array} columns
 * @param  {Array} data
 */
const createCsv = (columns, data) => new Json2csvParser({ columns }).parse(data);

module.exports = {
  createCsv,
};
