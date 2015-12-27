
var	express = require('express');
var app = express();
var mongoose = require('mongoose');
var api = require('./api');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/backstage');

app.use('/', api);

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Servidor escuchando en http://%s:%s', host, port);
});