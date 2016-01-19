
var	express = require('express')
var app = express()
var mongoose = require('mongoose')
var api = require('./api')
var bodyParser = require('body-parser')

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/backstage')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json())

app.use('/', api)

var server = app.listen(5000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Servidor escuchando en http://%s:%s', host, port)
})

module.exports = app
