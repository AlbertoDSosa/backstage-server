var mongoose = require('mongoose')
var User = mongoose.model('User')
var server = require('server')
var request = require('supertest')
var host = process.env.API_TEST_HOST || server


request = request(host)

function saveUser (done) {
	var data = {
			'firstName': 'Sebastián',
			'lastName': 'D.Sosa',
			'userRole': 'Gamer'
		}

		request
				.post('/user')
				.set('Accept', 'application/json')
				.send(data)
				.expect('Content-Type', /application\/json/)
				.expect(201)
				.end(done)
}

describe('Recurso /user', function () {

	var user = {
		'firstName': 'Alberto',
		'lastName': 'D.Sosa',
		'userRole': 'Técnico'
	}

	var newUser = {
		'firstName': 'Orlando',
		'lastName': 'D.Sosa',
		'userRole': 'Realizador'
	}

	var badUser = {
		'firstName': 'Alberto',
		'lastName': 'D.Sosa',
	}

	before(saveUser)

	describe('Petición POST', function () {
		it('debería registrar un usuario', function (done) {
			request
				.post('/user')
				.set('Accept', 'application/json')
				.send(user)
				.expect('Content-Type', /application\/json/)
				.expect(201)
				.end(function (err, res) {
					var body = res.body
					if(err){
						done(err)
					} else {
						expect(res.body).to.have.property('userId')
						expect(res.body).to.have.property('firstName')
						expect(res.body).to.have.property('lastName')
						expect(res.body).to.have.property('userRole')
						done()
					}
				})
		})

		it('debería devolver 400 si no se pasa bien un usuario', function (done) {
			request
				.post('/user')
				.set('Accept', 'application/json')
				.send(badUser)
				.expect('Content-Type', /application\/json/)
				.expect(400)
				.end(done)
		})
	})

	describe('Petición GET', function () {
		it('debería responder con un usuario', function (done) {
			request
				.get('/user/1')
				.set('Accept', 'application/json')
				.expect('Content-Type', /application\/json/)
				.expect(200)
				.end(function (err, res) {
					if(err){
						done(err)
					} else {
						expect(res.body).to.have.property('userId')
						expect(res.body).to.have.property('firstName')
						expect(res.body).to.have.property('lastName')
						expect(res.body).to.have.property('userRole')
						done()
					}
				})
		})

		it('debería devolver 400 si el id pasado es incorrecto', function (done) {
			request
				.get('/user/4')
				.expect('Content-Type', /application\/json/)
				.expect(400)
				.end(done)
		})
	})

	describe('Petición PUT', function () {
		it('debería modificar un usuario', function (done) {
			request
				.put('/user/1')
				.set('Accept', 'application/json')
				.send(newUser)
				.expect('Content-Type', /application\/json/)
				.expect(200)
				.end(function (err, res) {
					if(err){
						done(err)
					} else {
						var body = res.body
						expect(body.userId).to.equal(1)
						expect(body.firstName).to.equal('Orlando')
						expect(body.lastName).to.equal('D.Sosa')
						expect(body.userRole).to.equal('Realizador')
						done()
					}
				})
		})

		it('debería devolver 400 si el id pasado es incorrecto', function (done) {
			request
				.put('/user/4')
				.set('Accept', 'application/json')
				.send(newUser)
				.expect('Content-Type', /application\/json/)
				.expect(400)
				.end(done)
		})

	})

	describe('Petición DELETE', function () {
		it('debería eliminar un usuario', function (done) {
			request
				.delete('/user/1')
				.set('Accept', 'application/json')
				.expect('Content-Type', /application\/json/)
				.expect(200)
				.end(function (err, res) {
					if(err){
						done(err)
					} else {
						var body = res.body
						expect(body.ok).to.equal(1)
						expect(body.value.userId).to.equal(1)
						expect(body.value.firstName).to.equal('Orlando')
						expect(body.value.lastName).to.equal('D.Sosa')
						expect(body.value.userRole).to.equal('Realizador')
						done()
					}
				})
		})

		it('debería devolver 400 si el id pasado es incorrecto', function (done) {
			request
				.delete('/user/4')
				.expect('Content-Type', /application\/json/)
				.expect(400)
				.end(done)
		})
	})
})

describe('Recurso /users', function (done) {

	describe('Petición GET', function () {

		beforeEach(saveUser)

		afterEach(function (done) {
			User.remove({}, function (err) {
				if(err) {
					done(err)
				} else {
					done()
				}
			})
		})


		it('debería listar todos los usuarios', function (done) {

			request
				.get('/users')
				.set('Accept', 'application/json')
				.expect('Content-Type', /application\/json/)
				.end(function (err, res) {
					if (err) return done(err)
					expect(res.body).to.be.an('array')
						.and.to.have.length(2)
					var user_1 = res.body[0]
					var user_2 = res.body[1]

					expect(user_1).to.have.property('_id')
					expect(user_2).to.have.property('_id')

					expect(user_1.userId).to.equal(2)
					expect(user_1.firstName).to.equal('Alberto')
					expect(user_1.lastName).to.equal('D.Sosa')
					expect(user_1.userRole).to.equal('Técnico')

					expect(user_2.userId).to.equal(3)
					expect(user_2.firstName).to.equal('Sebastián')
					expect(user_2.lastName).to.equal('D.Sosa')
					expect(user_2.userRole).to.equal('Gamer')

					done()
				})
		})
	})

	describe('Sin datos', function () {

		it('debería responder 204 si no encuentra usuarios', function (done) {

			request
				.get('/users')
				.expect(204)
				.end(function (err, res) {
					if(err) return done(err)
					done()
				})
		})
	})



})
