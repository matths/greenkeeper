var data = require('./mocked_data.js');

var sqlite3 = require('sqlite3').verbose();

var fs = require("fs");
var file = "test.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

db.serialize(function() {
	if (!exists) {

		db.run('CREATE TABLE users (id TEXT, name TEXT, password TEXT, avatar TEXT, PRIMARY KEY (id))');
		var stmt = db.prepare('INSERT INTO users VALUES (?, ?, ?, ?)');
		for (var i = 0; i < data.users.length; i++) {
			var user = data.users[i];
			stmt.run(user.id, user.name, 'hackday', user.avatar); // USER
		}
		for (var i = 0; i < data.stream.length; i++) {
			var streamItem = data.stream[i];
			for (var k = 0; k < streamItem.users.length; k++) {
				var user = streamItem.users[k];
				var id = guid();
				streamItem.users[k].id = id
				stmt.run(id, user.name, 'hackday', user.avatar); // USER
			}
		}
		stmt.finalize();

		// db.each('SELECT * FROM users', function(err, row) {
		// 	console.log(err, row);
		// });

		var streamItems = [];

		db.run('CREATE TABLE tasks (id TEXT, title TEXT, description TEXT, project TEXT, client TEXT, PRIMARY KEY (id))');
		var stmt = db.prepare('INSERT INTO tasks VALUES (?, ?, ?, ?, ?)');
		for (var i = 0; i < data.tasks.length; i++) {
			var task = data.tasks[i];
			stmt.run(task.id, task.title, task.description, task.project, task.client); // TASK
		}
		for (var i = 0; i < data.stream.length; i++) {
			var streamItem = data.stream[i];
			var event = streamItem.event;
			var moment = streamItem.moment;
			var timestamp = streamItem.timestamp;
			var id = guid();
			stmt.run(id, streamItem.title, streamItem.description, 'NO PROJECT', 'NO CLIENT'); // TASK
			for (var k = 0; k < streamItem.users.length; k++) {
				var user = streamItem.users[k];
				var userId = user.id;
				streamItems.push([id, userId, event, moment, timestamp?timestamp:'']); // STREAM ITEM prepared
			}
		}
		stmt.finalize();

		// db.each('SELECT * FROM tasks', function(err, row) {
		// 	console.log(err, row);
		// });

		db.run('CREATE TABLE stream (taskId TEXT, userId TEXT, event TEXT, moment TEXT, timestamp TEXT, PRIMARY KEY (taskId, userId))');
		var stmt = db.prepare('INSERT INTO stream VALUES (?, ?, ?, ?, ?)');
		for (var i = 0; i < streamItems.length; i++) {
			var streamItem = streamItems[i];
//			console.log(streamItem);
//			stmt.run.apply(this, streamItem); // STREAM ITEM
			stmt.run(streamItem[0], streamItem[1], streamItem[2], streamItem[3], streamItem[4]); // STREAM ITEM
		}
		stmt.finalize();
	}
});
	
db.close();