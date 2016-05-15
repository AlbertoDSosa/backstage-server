
var	express = require('express')
var app = express()
var mongoose = require('mongoose')
var api = require('./api')
var bodyParser = require('body-parser')
var cors = require('cors')

var env = process.env.NODE_ENV || 'production'

if(env === 'development'){
	mongoose.connect('mongodb://localhost/backstage-test')
} else {
	mongoose.connect('mongodb://localhost/backstage')
}

//middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Servidor
app.use('/', api)

var server = app.listen(5000)
module.exports = app
