var mongoose = require('mongoose')
var express = require('express')

var EquipamentSchema = mongoose.Schema({
	id: { type: String, required: true, unique: true },
	//manual: { type: String }
	name: { type: String, required: true },
	feature: { type: String, required: true },
  quantity: { type: Number, required: true },
  brand: { type: String },
	model: { type: String },
	description: { type: String }
	//photo: { type: String }

}, { collection: 'equipaments'})

var Equipament = mongoose.model('Equipament', EquipamentSchema)

var router = express.Router()

router.post('/equipament', function (req, res) {

	var equipament = new Equipament(req.body)

	equipament.save(function (err, equipament) {
		if(err) return res.status(503).json(err)

		res.status(201).json(equipament)
	})

})

router.get('/equipaments/:feature?', function (req, res) {
  var feature = req.params.feature
  Equipament.find({feature: feature}, function (err, equipaments) {
    if(err){
      // Si hay algún error en la base de datos
      res.status(503).json(err)
    } else if (equipaments.length === 0) {
      // Si no encuentra equipos
      res.sendStatus(204)
    } else {
      // Si encuentra equipos los devuelve
      res.json(equipaments)
    }
  })
})

router.get('/equipament/:id?', function (req, res) {
  var id = req.params.id
  Equipament.findOne({id: id}, function (err, equipament) {
    if(err){
      res.status(503).json(err)
    } else if (!equipament) {
      res.status(400).json()
    } else {
      res.json(equipament)
    }
  })
})

router.put('/equipament/:id?', function (req, res) {
  Equipament
    .findOneAndUpdate(
      {
       id: req.params.id
      },
      {
        $set: req.body
      },
      {
        new: true
      },
      function (err, equipament) {
        if (err) {
          res.status(503).json(err)
        } else if(!equipament){
          res.status(400).json()
        } else {
          res.json(equipament)
        }
      })
})

router.delete('/equipament/:id?', function (req, res) {
 var id = req.params.id

 Equipament
   .findOneAndRemove(
      {
        id: id
      },

      {
        passRawResult: true
      },

      function (err, equipament, result) {
        if(err){
          res.status(503).json(err)
        } else if(!equipament && result === undefined){
          res.status(400).json()
        } else if(equipament && result){
          res.json(result)
        }
      })
})

module.exports = {
  router: router,
  model: Equipament
}
