var moment = require('moment');
var dh = require('./dataHelper.js');
var tasks = require('./tasks.js');
var users = require('./users.js');

function _streamItemByRow(row) {
	var moment = row.timestamp?_momentFromTimestamp(row.timestamp):row.moment;
	var streamitem = {
		id: row.taskId+"-"+row.userId,
		task: {
			id: row.taskId,
			title: row.taskTitle,
			description: row.taskDescription,
			client: row.taskClient,
			project: row.taskProject
		},
		user: {
			id: row.userId,
			name: row.userName,
			avatar: row.userAvatar
		},
		event: row.event,
		moment: moment?moment:'just now',
		timestamp: row.timestamp
	};
	return streamitem;
}

function _getAllStreamItems(callback) {
	var stream = [];
	dh.getDb().all("SELECT"+
		" stream.event, stream.moment, stream.timestamp, stream.userId, stream.taskId, "+
		" users.Name as userName, "+
		" users.Name as userAvatar, "+
		" tasks.title as taskTitle, "+
		" tasks.description as taskDescription, "+
		" tasks.project as taskProject, "+
		" tasks.client as taskClient "+
		" FROM stream"+
		" LEFT JOIN users ON users.id = stream.userId"+
		" LEFT JOIN tasks ON tasks.id = stream.taskId"+
		" WHERE stream.event!='checkout'", function(err, rows) {
			for (var i=0; i<rows.length; i++) {
				stream.push(_streamItemByRow(rows[i]));
			}
			callback(stream);
	});
}

function _createItem(taskId, userId, event) {
	dh.getDb().run("SELECT * from tasks WHERE task.id='"+taskId+"'");
}

function _findStreamItemById(id, callback) {
	dh.getDb().one('SELECT * FROM tasks WHERE id=?', function(err, rows) {
		_taskByRow(row);
	});
}

module.exports = {
	'getAllStreamItems': _getAllStreamItems,
	'findTaskById': _findStreamItemById
};