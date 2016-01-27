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


// Peticiones http

router.post('/user', function (req, res) {
	var userId = 0, user

	var onSave = function (err) {
		if(err){
			res.status(503).json(err)
		}
		res.status(201).json(user)
	}

	User.find({}, function (err, users) {
		if(users.length >= 1){
			var last = users.length - 1
			userId = users[last].userId
			user = new User()
			user.userId = userId + 1
			for(var key in req.body){
				user[key] = req.body[key]
			}
			user.save(onSave)
		} else {
			user = new User()
			user.userId = 1
			for(var key in req.body){
				user[key] = req.body[key]
			}
			user.save(onSave)
		}
	})
})

router.get('/user/:userId', function (req, res) {
	var userId = req.params.userId
	User.findOne({userId: userId}, function (err, user) {
		if(err){
			res.status(503).json(err)
		} else {
			res.json(user)
		}
	})
})

router.put('/user/:userId', function (req, res) {
  User
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
      {
      	new: true
      },
			function (err, user) {
			  if (err) {
			    res.status(503).json(err)
			  } else {
			    res.json(user)
			  }
			})
})

router.delete('/user/:userId', function (req, res) {
 var userId = req.params.userId

 User.findOneAndRemove(
 	{
 		userId: userId
 	},

 	{
 		passRawResult: true
 	},

 	function (err, user, result) {
 		if(err){
 			res.status(503).json()
 		} else {
 			res.status(200).json(result)
 		}
 	})

})


// router.get('/users', function (req, res) {
// 	getUsers(function (err, users) {
// 		if(err){
// 			// Si hay algún error en la base de datos
// 			res.status(503).json(err)
// 		} else if (users.length === 0) {
// 			// Si no encuentra usuarios
// 			res.status(204).json()
// 		} else {
// 			// Si encuentra usuarios los devuelve
// 			res.json(users)
// 		}
// 	})
// })

module.exports = {
	router: router,
	model: User
}
