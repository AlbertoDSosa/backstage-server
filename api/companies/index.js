var mongoose = require('mongoose')
var express = require('express')

var CompanySchema = new mongoose.Schema({
	//id: { type: Number, required: true, unique: true },
	name: { type: String },
	location: { type: String },
	webSite: { type: String },
	email: { type: String },
	phone: { type: String },
	email: { type: String },
	fax: { type: String }
}, { collection: 'companies' })

var Company = mongoose.model('Company', CompanySchema)
