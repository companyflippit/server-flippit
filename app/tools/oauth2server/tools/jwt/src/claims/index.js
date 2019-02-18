/**
 * sub: clientId,
 * iss: userId,
 * exp: expiration time,
 * @param  {string} sub
 * @param  {string} iss
 * @param  {string} exp
 */
const Claims = (sub, iss) => ({
  sub,
  iss,
});

module.exports = {
  Claims,
};
