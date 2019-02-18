const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const publicDirname = require('../../public/dirname');

const setExpress = (app) => {
  app.use(compression());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(publicDirname));
};
module.exports = {
  setExpress,
};
