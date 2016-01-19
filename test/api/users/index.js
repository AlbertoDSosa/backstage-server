var User = require('api/users')
var server = require('server')
var request = require('supertest')
var host = process.env.API_TEST_HOST || server

request = request(host)

describe('recurso /users', function () {
  describe('GET', function () {
    it('debera respoder con json', function (done) {
      var users = []

      request
        .get('/users')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          done()
        })
    })
  })
})
