var express = require('express');

var apiRouter = express.Router();

var users = require('./users').router;


apiRouter.use('/', users);


module.exports = apiRouter;
