const express = require('express');

const router = express.Router();
const clientDomain = require('../domain/client');

const createClient = async (req, res, next) => {
  try {
    const response = await clientDomain.createClient();
    res.send({ data: response, status: 200 });
  } catch (error) {
    next(error);
  }
};

router.post('/', createClient);

module.exports = router;
