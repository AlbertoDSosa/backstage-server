var User = require('api/users').model
var server = require('server')
var request = require('supertest')
var host = process.env.API_TEST_HOST || server


request = request(host)

describe('Recurso /user', function () {
	var user = {
		'firstName': 'Alberto',
		'lastName': 'D.Sosa',
		'userRole': 'Técnico'
	}

	var newUser = {
		'userId': 1,
		'firstName': 'Orlando',
		'lastName': 'Green',
		'userRole': 'Realizador'
	}

	after(function (done) {
		User.remove(function (err) {
			if(err){
				done(err)
			} else {
				done()
			}
		})
	})

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
						expect(body.lastName).to.equal('Green')
						expect(body.userRole).to.equal('Realizador')
						done()

					}
				})
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
						expect(body.value.lastName).to.equal('Green')
						expect(body.value.userRole).to.equal('Realizador')
						done()
					}
				})
		})
	})
})

// describe('Recurso /users', function (done) {

// 	describe('Petición GET', function () {
// 		beforeEach(function (done) {
// 			var user = new User()
// 			user.userId = 1
// 			user.firstName = 'Alberto'
// 			user.lastName = 'D.Sosa'
// 			user.userRole = 'Profesional Tic'
// 			user.save()
// 			done()
// 		})

// 		afterEach(function (done) {
// 			User.remove({}, function (err) {
// 				if(err) {
// 					done(err)
// 				} else {
// 					done()
// 				}
// 			})
// 		})

// 		it('debería respoder 200 si la petición fue exitosa', function (done) {

// 			request
// 				.get('/users')
// 				.expect(200)
// 				.end(done)
// 		})

// 		it('debería respoder con json', function (done) {

// 			request
// 				.get('/users')
// 				.expect('Content-Type', /application\/json/)
// 				.end(done)
// 		})

// 		it('debería listar todos los usuarios', function (done) {

// 			request
// 				.get('/users')
// 				.end(function (err, res) {
// 					if (err) return done(err)
// 					expect(res.body).to.be.an('array')
// 					expect(res.body[0]).to.be.an('object')
// 					expect(res.body[0]).to.have.property('userId')
// 					done()
// 				})
// 		})
// 	})

// 	describe('Sin usuarios', function () {

// 		it('debería responder 204 si no encuentra usuarios', function (done) {

// 			request
// 				.get('/users')
// 				.expect(204)
// 				.end(done)
// 		})
// 	})
// })
