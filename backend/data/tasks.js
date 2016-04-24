var dh = require('./dataHelper.js');

function _taskByRow(row) {
	var task = {
		id: row.id,
		title: row.title,
		description: row.description,
		project: row.project,
		client: row.client
	};
	return task;
}

function _findTaskById(id, callback) {
	dh.getDb().one('SELECT * FROM tasks WHERE id=?', function(err, row) {
		console.log(row);
		callback(_taskByRow(row));
	});
}

function _getAllTasks(callback) {
	var tasks = [];
	dh.getDb().all("SELECT * FROM tasks", function(err, rows) {
		for (var i=0; i<rows.length; i++) {
			tasks.push(_taskByRow(rows[i]));
		}
		callback(tasks);
	});
}
module.exports = {
	'getAllTasks': _getAllTasks,
	'findTaskById': _findTaskById
};