

var query = function (req, res, query, Resource) {
  if (query === 'find' ) {

    var feature = req.params.feature

    Resource.find({ feature: feature }, function (err, resObj) {
      if(err){
        // Si hay algún error en la base de datos
        res.status(503).json(err)
      } else if (resObj.length === 0) {
        // Si no encuentra recursos
        res.sendStatus(204)
      } else {
        // Si encuentra recursos los devuelve
        res.json(resObj)
      }
    })
  } else if (query === 'save') {

    var resource = new Resource(req.body)

    resource.save(function (err, resObj) {
      if(err) return res.status(503).json(err)

      res.status(201).json(resObj)
    })

  } else if (query === 'update') {

    var id = req.params.id

    Resource.findOneAndUpdate(

      { id: id },

      {
        $set: req.body
      },
      {
        new: true
      },
      function (err, resObj) {
        if (err) {
          res.status(503).json(err)
        } else if(!resObj){
          res.status(400).json()
        } else {
          res.json(resObj)
        }
      })

  } else if (query === 'delete') {

    var id = req.params.id

    Resource.findOneAndRemove(

      { id: id },

      {
        passRawResult: true
      },

      function (err, resObj, result) {
        if(err){
          res.status(503).json(err)
        } else if(!resObj && result === undefined){
          res.status(400).json()
        } else if(resObj && result){
          res.json(result)
        }
      })

  } else if (query === 'findOne') {

    var id = req.params.id

    Resource.findOne({ id: id }, function (err, resObj) {
      if(err){
      res.status(503).json(err)
    } else if (!resObj) {
      res.status(400).json()
    } else {
      res.json(resObj)
    }
    })
  }

}

module.exports = {
  query: query
}

