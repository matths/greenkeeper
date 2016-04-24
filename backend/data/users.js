var dh = require('./dataHelper.js');

function _userByRow(row, callback) {
	var task = {
		id: row.id,
		name: row.title,
		avatar: row.avatar
	};
	callback(task);
}

function _findUserById(id, callback) {
	dh.getDb().all('SELECT * FROM users WHERE id=?', function(err, row) {
		_userByRow(row, callback);
	});
}

module.exports = {
	'findUserById': _findUserById
};