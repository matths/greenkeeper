var express = require('express');
var app = express();

var moment = require('moment');

app.use(express.static('../frontend'));

var data = require('./mocked_data.js'); // global in memory database with prefilled data ;)

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function findTask(id) {
	for (var i=0; i<data.tasks.length; i++) {
		if (data.tasks[i].id==id) {
			return data.tasks[i];
		}
	}
	return false;
}

function findStreamitemForUser(userId) {
	for (var i=0; i<data.stream.length; i++) {
		var users = data.stream[i].users;
		if (users) for (var j=0; j<users.length; j++) {
			if (users[j].id == userId) {
				return data.stream[i];
			}
		}
	}
	return false;
}

function findUser(userId) {
	for (var i=0; i<data.users.length; i++) {
		if (data.users[i].id == userId) {
			return data.users[i];
		}
	}
	return false;
}

function updateStreamTimes() {
	data.stream.map(function (value, index) {
		if (value.timestamp) {
			value.moment = moment(value.timestamp).fromNow();
		}
	});
}

setInterval(updateStreamTimes, 1000);

function createEvent(task, event, user) {
	var newItem = {
		"id": guid(),
	    "title": task.title,
	    "event": event,
	    "timestamp": Date.now(),
	    "moment": "gerade eben",
	    "description": task.description,
	    "users": [
	      {
	        "id": user.id,
	        "avatar": user.avatar,
	        "name": user.name
	      }
	    ]
	};
	data.stream.unshift(newItem);
}

app.use('/*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
	next();
});

app.get('/tasks', function(req, res) {
	res.json(data.tasks);
});

app.get('/currentStreamItem/:userId', function(req, res) {
	var selectedStreamitem = findStreamitemForUser(req.params.userId);
	if (selectedStreamitem) {
		res.json(selectedStreamitem);
	} else {
		var selectedUser = findUser(req.params.userId);
		if (selectedUser) {
			res.json({
			    "id": "na",
			    "title": "Check now in",
			    "event": "none",
			    "moment": "",
			    "description": "",
			    "users": [selectedUser]
			});
		} else {
			res.sendStatus(404);
		}
	}
});


app.get('/task/checkin/:taskId', function(req, res) {
	var selectedTask = findTask(req.params.taskId);
	if (selectedTask) {
		createEvent(selectedTask, "checkin" , data.users[0]);
		res.redirect('widget.html');
	} else {
		res.sendStatus(404);
	}
});

app.get('/task/checkout/:userId', function(req, res) {
	var selectedStreamitem = findStreamitemForUser(req.params.userId);
	if (selectedStreamitem) {
		createEvent(selectedStreamitem, "checkout" , data.users[0]);
		res.redirect('widget.html');
	} else {
		res.sendStatus(404);
	}
});

app.get('/stream', function(req, res) {
	res.json(data.stream);
});

app.get('/task/flame/:taskId', function(req, res) {
});

app.get('/task/unflame/:taskId', function(req, res) {
});

app.listen(5000);
