const express = require('express');

const router = express.Router();
const accessTokenDomain = require('../domain/accessToken');

const getAccessToken = async (req, res, next) => {
  try {
    const response = await accessTokenDomain.clientAuth();
    res.send({ data: response, status: 200 });
  } catch (error) {
    next(error);
  }
};

router.post('/', getAccessToken);

module.exports = router;
