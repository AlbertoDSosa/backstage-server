
var mongoose = require('mongoose');
var express = require('express');

var UserSchema = new mongoose.Schema({
	userId: { type: Number, required: true, unique: true },
	firstName: { type: String },
	lastName: { type: String },

	// Administrador, etc..
	userRole: { type: String },
});

var model = mongoose.model('User', UserSchema);

var router = express.Router();

router.get('/users', function (req, res) {
	model.find({}, function (err, users) {
		if(err){
			return res.sendStatus(500).json(err);
		}
		res.json(users);
	});
});

router.post('/user', function (req, res) {
	var userId = 0, user;

	var onSave = function (err) {
		if(err){
			res.sendStatus(500).json(err);
		}
		res.json(user);
	};

	model.find({}, function (err, users) {

			if (users.length >= 1) {

				var last = users.length - 1;
				userId = users[last].userId;
				user = new model();
				user.userId = userId + 1;
				user.firstName = req.body.firstName;
				user.lastName = req.body.lastName;
				user.userRole = req.body.userRole;
				user.save(onSave);

			} else {

				user = new model();
				user.userId = 1;
				user.firstName = req.body.firstName;
				user.lastName = req.body.lastName;
				user.userRole = req.body.userRole;
				user.save(onSave);
			}
	});

});

router.delete('/user/:userId', function (req, res) {
	var userId = req.params.userId;

	model.findOne({ userId: userId }, function (err, user) {
		if(user){
			user.remove(function (error, userRes) {
				if(error){
					res.sendStatus(500).json(error)
				} else {
					res.json(userRes);
				}
			});
		} else {
			res.sendStatus(500).json(err);
		}
	});

});

router.put('/user/:userId', function (req, res) {

	model
		.findOneAndUpdate(
			{
				userId: req.params.userId
			},
			{
				$set: {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					userRole: req.body.userRole
				}
			},

			function (err, updateRes) {

				if (err) {
					res.sendStatus(500).json(err);
				} else {
					res.json(updateRes);
				}

			});

});

module.exports = {
	router: router,
	model: model
}