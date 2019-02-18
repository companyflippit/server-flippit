const OauthServer = require('oauth2-server');
const { AppError } = require('error-delpinos').errors;
const model = require('../../model');

const oauth = new OauthServer({ model });
const { Request, Response } = OauthServer;
const clientDomain = require('../../domain/client');

const authenticate = async (req, res, next) => {
  const oAuth2Request = new Request(req);
  const oAuth2Response = new Response(res);
  try {
    const response = await oauth.authenticate(oAuth2Request, oAuth2Response);
    const { user } = response;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    await clientDomain.getClientByUserId(req.user.id);
    next();
  } catch (error) {
    next(error);
  }
};

const confirmPasswords = async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const isSamePassword = (
    password === confirmPassword && password !== undefined && confirmPassword !== undefined
  );
  if (isSamePassword) {
    next();
  } else {
    next(new AppError('Passwords do not match!', 400));
  }
};

module.exports = {
  authenticate,
  isAdmin,
  confirmPasswords,
};
