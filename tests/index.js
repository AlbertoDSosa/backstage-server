var test = require('tape');
var app = require('../');

test('should create a server', function (t) {
	t.ok(app.hello, 'should exist');
	t.end();
});
