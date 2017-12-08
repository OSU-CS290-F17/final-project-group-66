// dao/userDao.js
var mysql = require('mysql');
var $conf = require('../conf/conf');
var $sql = require('./userSqlMapping');

var pool = mysql.createPool($conf.mysql);

var jsonWrite = function (res, ret) {
	if (typeof ret === 'undefined') {
		res.json({
			code: '1',
			msg: 'FAILED!'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function (err, connection) {
			var param = req.query || req.params;

			// INSERT INTO
			connection.query(
				$sql.insert,
				[param.name, param.age],
				function (err, result) {
					if (result) {
						result = {
							code: 200,
							msg: 'Saved successfully!'
						};
					}

					jsonWrite(res, result);
					connection.release();
				});
		});
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function (err, connection) {
			var id = +req.query.id; // floor
			connection.query($sql.delete, id, function (err, result) {
				if (result.affectedRows > 0) {
					result = {
						code: 200,
						msg: 'Deleted successfully!'
					};
				} else {
					result = void 0;
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	update: function (req, res, next) {
		// update by id
		var param = req.query;
		if (param.name == null || param.age == null || param.id == null) {
			jsonWrite(res, undefined);
			return;
		}

		pool.getConnection(function (err, connection) {
			connection.query(
				$sql.update,
				[param.name, param.age, param.id],
				function (err, result) {
					if (result.affectedRows > 0) {
						result = {
							code: 200,
							msg: 'Update completed!'
						};
					} else {
						result = void 0;
					}
					jsonWrite(res, result);
					connection.release();
				});
		});

	},
	queryById: function (req, res, next) {
		var id = +req.query.id; // floor
		pool.getConnection(function (err, connection) {
			connection.query($sql.queryById, id, function (err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	queryByFilter: function (req, res, next) {
		var param = req.query || req.params;
		pool.getConnection(function (err, connection) {
			connection.query($sql.queryByFilter, ['%' + param.name + '%', param.left, param.right, param.field], function (err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	queryAll: function (req, res, next) {
		pool.getConnection(function (err, connection) {
			connection.query($sql.queryAll, function (err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	}

};