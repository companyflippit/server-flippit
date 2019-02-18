
const Claims = (exp, jti) => ({
  iss: 'iss-momopocket-44',
  sub: 'sub-cupros',
  aud: [
    '/token',
  ],
  exp,
  iat: Math.floor(Date.now() / 1000),
  jti,
});

module.exports = {
  Claims,
};
