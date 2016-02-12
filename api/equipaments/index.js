var mongoose = require('mongoose')
var express = require('express')

var EquipamentSchema = mongoose.Schema({
	//id: { type: Number, required: true, unique: true },
	//manual: { type: String }
	name: { type: String },
	count: { type: Number },
	brand: { type: String },
	feature: { type: String },
	model: { type: String },
	description: { type: String },
	photo: { type: String }

}, { collection: 'equipaments' })

var Equipamet = mongoose.model('Equipamet', EquipamentSchema)

var router = express.Router()

router.post('/equipo', function (error, require, response) {

	if(error) return response.status(500).json(error)

	var equipament = new Equipament(require.body)

	equipament.save(function (err, equipament) {
		if(err) return response.status(503).json(err)

		response.status(201)json(equipament)
	})

})
