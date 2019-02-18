const express = require('express');
const OauthServer = require('oauth2-server');
const model = require('../model');

const oauth = new OauthServer({ model });
const { Request, Response } = OauthServer;
const router = express.Router();

const oAuth2token = async (req, res, next) => {
  const oAuth2Request = new Request(req);
  const oAuth2Response = new Response(res);
  try {
    const response = await oauth.token(oAuth2Request, oAuth2Response);
    delete response.client;
    delete response.user;
    res.send({ data: response, status: 200 });
  } catch (error) {
    next(error);
  }
};
router.post('/', oAuth2token);

module.exports = router;
