
var mongoose = require('mongoose');
var express = require('express');


var UserSchema = new mongoose.Schema({
	userId: { type: Number },
	firstName: { type: String },
	lastName: { type: String },

	// Administrador, etc..
	userRole: { type: String },
});

var model = mongoose.model('User', UserSchema);

var router = express.Router();

router.get('/users/', function (req, res) {
	model.find({}, function (err, users) {
		if(err){
			return res.sendStatus(500).json(err)
		}
		res.json(users);
	});
});


module.exports = {
	router: router
}