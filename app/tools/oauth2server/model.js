// ** 1) clientId: es un identificador público de mi app que se utiliza en el front channel.
// ** 2) clientSecret: es un identificador privado entre mi app y el oauthServer que se usa,
// **    para indentificar la app cuando esta realiza una petición de accessToken.

const { getClient } = require('./domain/client');
const { getUser } = require('./domain/user');
const {
  getAccessToken,
  saveToken,
  revokeToken,
  getRefreshToken,
} = require('./domain/token');

module.exports = {
  getClient,
  saveToken,
  getUser,
  getAccessToken,
  revokeToken,
  getRefreshToken,
};
