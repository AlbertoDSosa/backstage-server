var mongoose = require('mongoose')

var express = require('express')

var objectId = mongoose.Schema.ObjectId

var ShowSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  place: { type: String, required: true },
  makedBy: { type: String, required: true },
  chekedBy: { type: String, required: true },
  // date: { type: Date, required: true },
  equipaments: [{
    type: objectId,
    ref: 'Equipament',
    required: true
  }],
  descripcion: String

}, { collection: 'shows' })

var Show = mongoose.model('Show', ShowSchema)

var router = express.Router()

router.post('/show', function (req, res) {
  console.log(req.body)
  var show = new Show(req.body)

  show.save(function (err, show) {
    if(err) return res.status(503).json(err)

    res.status(201).json(show)
  })
})


module.exports = {
  router: router,
  model: Show
}
