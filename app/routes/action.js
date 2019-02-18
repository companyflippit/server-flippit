const express = require('express');

const router = express.Router();
const emailDomain = require('../domain/action');

const createAction = async (req, res, next) => {
  try {
    const response = await emailDomain.createAction(req.body);
    res.send({ data: response, status: 200 });
  } catch (error) {
    next(error);
  }
};

router.post('/', createAction);

module.exports = router;
