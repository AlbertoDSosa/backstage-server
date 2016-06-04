var mongoose = require('mongoose')
var express = require('express')
var db = require('helpers/query')

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

	db.query(req, res, 'save', Equipament)

})

router.get('/equipaments/:feature?', function (req, res) {

  db.query(req, res, 'find', Equipament)

})

router.get('/equipament/:id?', function (req, res) {

  db.query(req, res, 'findOne', Equipament)

})

router.put('/equipament/:id?', function (req, res) {
  db.query(req, res, 'update', Equipament)

})

router.delete('/equipament/:id?', function (req, res) {
  var id = req.params.id

  db.query(req, res, 'delete', Equipament)

})

module.exports = {
  router: router,
  model: Equipament
}
