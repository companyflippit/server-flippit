const crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
const genRandomString = length => crypto
  .randomBytes(Math.ceil(length / 2))
  .toString('hex') /** convert to hexadecimal format */
  .slice(0, length); /** return required number of characters */

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  const value = hash.digest('hex');
  return { salt, passwordHash: value };
};
/**
 * Returns an object with the password and the hash.
 * @param  {String} password
 */
const saltHashPassword = (password) => {
  const salt = genRandomString(16); /** Gives us salt of length 16 */
  const passwordData = sha512(password, salt);
  return passwordData;
};
const verifyPassword = (password, salt, hashedPassword) => {
  const response = sha512(password, salt);
  return response.passwordHash === hashedPassword;
};

module.exports = {
  generatePassword: saltHashPassword,
  verifyPassword,
  sha512,
};
