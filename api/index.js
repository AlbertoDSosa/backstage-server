var express = require('express')

var apiRouter = express.Router()

//var users = require('./users').router
var equipaments = require('./equipaments').router
var shows = require('./shows').router
//apiRouter.use('/', users)
apiRouter.use('/', equipaments)
apiRouter.use('/', shows)

module.exports = apiRouter
