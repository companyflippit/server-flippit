const express = require('express');

const router = express.Router();
const clientDomain = require('../domain/client');
const { authenticate, isAdmin } = require('../tools/middlewares');

const getClient = async (req, res, next) => {
  try {
    const response = await clientDomain.getClientByUserId(req.user._id);
    res.send({ data: response, status: 200 });
  } catch (error) {
    next(error);
  }
};
router.get('/', authenticate, isAdmin, getClient);

module.exports = router;
