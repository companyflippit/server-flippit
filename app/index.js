const app = require('express')();
const { errorHandler } = require('error-delpinos');
const expressTool = require('./tools/express');
const routes = require('./routes');
const corsTool = require('./tools/cors');
const oAuth2Server = require('./tools/oauth2server');

expressTool.setExpress(app);
corsTool.setCors(app);
oAuth2Server.assignRoutes(app);
routes.assignRoutes(app);
app.use(errorHandler);

module.exports = app;
