const accessTokenDatabase = require('../database/accessToken');
const refreshTokenDatabase = require('../database/refreshToken');
const joi = require('../tools/joi');

const getAccessToken = async (accessToken) => {
  const checkedToken = joi.token.tokenValidate(accessToken);

  const response = await accessTokenDatabase.getAccessToken({ accessToken: checkedToken });
  return response;
};

const createAccessToken = async (token, client, user) => {
  const response = await accessTokenDatabase.create({
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    client: client._id,
    user: user._id,
    scope: token.scope,
  });
  return response;
};

const createRefreshToken = async (token, client, user) => {
  const response = await refreshTokenDatabase.create({
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    client: client._id,
    user: user._id,
    scope: token.scope,
  });
  return response;
};

const saveToken = async (token, client, user) => {
  const accessToken = await accessTokenDatabase
    .getAccessToken({ client: client._id, user: user._id });
  if (accessToken) {
    await accessTokenDatabase.deleteAccessToken({ client: client._id, user: user._id });
    await refreshTokenDatabase.deleteRefreshToken({ client: client._id, user: user._id });
  }
  await createAccessToken(token, client, user);
  await createRefreshToken(token, client, user);
  return Object.assign({ client: client.clientId, user: user.username }, token);
};

const getRefreshToken = async (refreshToken) => {
  const checkedToken = joi.token.tokenValidate(refreshToken);

  const response = await refreshTokenDatabase.getRefreshToken({ refreshToken: checkedToken });
  const extendedClient = Object.assign(response.client, { id: response.client.clientId });
  return Object.assign(response, { client: extendedClient }, { scope: extendedClient.scope });
};

const revokeToken = async (token) => {
  const { refreshToken } = token;
  const response = await refreshTokenDatabase.deleteRefreshToken({ refreshToken });
  return !!response;
};

module.exports = {
  getAccessToken,
  saveToken,
  revokeToken,
  getRefreshToken,
};
