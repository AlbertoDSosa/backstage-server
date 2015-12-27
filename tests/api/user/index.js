var test = require('tape');
var User = require('../../api/user');

test('should contain users', function (t) {
	t.ok(User, 'should exist');
	t.end();
});