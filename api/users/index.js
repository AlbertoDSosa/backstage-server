var mongoose = require('mongoose')
var express = require('express')

var UserSchema = new mongoose.Schema({
	//id: { type: Number, required: true, unique: true },
	name: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, required: true }
	//data: { type: objectId }
})

var User = mongoose.model('User', UserSchema)

var router = express.Router()


// Peticiones http

router.post('/user', function (req, res) {
	var userId, user

	var onSave = function (err) {
		if(err){
			if (err.message === 'User validation failed') {
				res.status(400).json(err)
			} else {
				res.status(503).json(err)
			}

		} else {
			res.status(201).json(user)
		}
	}

	User.find({}, function (err, users) {
		if(err){
			res.status(503).json(err)
		} else if(users.length >= 1){
			var last = users.length - 1
			userId = users[last].userId
			user = new User(req.body)
			user.userId = userId + 1
			user.save(onSave)
		} else {
			user = new User(req.body)
			user.userId = 1
			user.save(onSave)
		}
	})
})

router.get('/user/:userId', function (req, res) {
	var userId = req.params.userId
	User.findOne({userId: userId}, function (err, user) {
		if(err){
			res.status(503).json(err)
		} else if (!user) {
			res.status(400).json()
		} else {
			res.json(user)
		}
	})
})

router.put('/user/:userId?', function (req, res) {
  User
    .findOneAndUpdate(
      {
       userId: req.params.userId
      },
      {
	      $set: req.body
      },
      {
      	new: true
      },
			function (err, user) {
			  if (err) {
  				res.status(503).json(err)
			  } else if(!user){
		  		res.status(400).json()
		  	} else {
		    	res.json(user)
		  	}
			})
})

router.delete('/user/:userId?', function (req, res) {
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
 			res.status(503).json(err)
 		} else if(!user && result === undefined){
  		res.status(400).json()
  	} else if(user && result){
    	res.json(result)
  	}
 	})
})


router.get('/users', function (req, res) {
	User.find({}, function (err, users) {
		if(err){
			// Si hay algún error en la base de datos
			res.status(503).json(err)
		} else if (users.length === 0) {
			// Si no encuentra usuarios
			res.sendStatus(204)
		} else {
			// Si encuentra usuarios los devuelve
			res.json(users)
		}
	})
})

module.exports = {
	router: router,
	model: User
}
