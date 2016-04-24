var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("greenkeeper.db");

function _getUniqueId() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function _getDb() {
	return db;
}
	
module.exports = {
  'getUniqueId': _getUniqueId,
  'getDb': _getDb
};
