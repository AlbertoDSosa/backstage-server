var mongoose = require('mongoose')
var express = require('express')

var PersonSchema = new mongoose.Schema({
	//id: { type: Number, required: true, unique: true },
	name: { type: String, required: true, unique: true },
	phone: { type: String },
	email: { type: String },
	staff: { type: Boolean },
	freelance: { type: Boolean }
	//company: { type: objectId }
}, { collection: 'persons' })

var Person = mongoose.model('Person', PersonSchema)
