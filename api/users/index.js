
var mongoose = require('mongoose')
var express = require('express')

var UserSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },

  // Administrador, etc..
  userRole: { type: String }
})

var User = mongoose.model('User', UserSchema)

var router = express.Router()

router.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      return res.status(500).json(err)
    }
    res.json(users)
  })
})

// router.post('/user', function (req, res) {
// 	var userId = 0, user

// 	var onSave = function (err) {
// 		if(err){
// 			res.status(500).json(err)
// 		}
// 		res.status(201).json(user)
// 	};

// 	User.find({}, function (err, users) {

// 		if (users.length >= 1) {

// 			var last = users.length - 1
// 			userId = users[last].userId
// 			user = new User()
// 			user.userId = userId + 1
// 			user.firstName = req.body.firstName
// 			user.lastName = req.body.lastName
// 			user.userRole = req.body.userRole
// 			user.save(onSave)

// 		} else {

// 			user = new User()
// 			user.userId = 1
// 			user.firstName = req.body.firstName
// 			user.lastName = req.body.lastName
// 			user.userRole = req.body.userRole
// 			user.save(onSave)
// 		}
// 	})

// })

// router.delete('/user/:userId', function (req, res) {
// 	var userId = req.params.userId

// 	User.findOne({ userId: userId }, function (err, user) {
// 		if(user){
// 			user.remove(function (error, userRes) {
// 				if(error){
// 					res.status(500).json(error)
// 				} else {
// 					res.json(userRes)
// 				}
// 			});
// 		} else {
// 			res.status(500).json(err)
// 		}
// 	});

// });

// router.put('/user/:userId', function (req, res) {

// 	User
// 		.findOneAndUpdate(
// 			{
// 				userId: req.params.userId
// 			},
// 			{
// 				$set: {
// 					firstName: req.body.firstName,
// 					lastName: req.body.lastName,
// 					userRole: req.body.userRole
// 				}
// 			},

// 			function (err, updateRes) {

// 				if (err) {
// 					res.status(500).json(err)
// 				} else {
// 					res.json(updateRes)
// 				}

// 			})

// })

module.exports = {
  router: router,
  model: User
}
