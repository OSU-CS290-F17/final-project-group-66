// Initial data to DB
var mysql = require('mysql');
var $conf = require('../conf/conf');
var $sql = require('./houseSqlMapping');

var datajs = require('./data');

var pool = mysql.createPool($conf.mysql);

module.exports = {
    initialDB: function () {
        var data = datajs.getData();
        pool.getConnection(function (err, connection) {
            for (var i = 0; i < data.length; i++) {
                var param = data[i];

                connection.query(
                    $sql.insert,
                    [param.name, param.code, param.addr1, param.addr2, param.addr3, param.lng, param.lat, param.price, param.safety],
                    function (err, result) {
                        if (!result) {
                            console.log('ERROR!!!\ni - ' + i + '\tparam = ' + param);
                        }

                    });
            }
            connection.release();
        });
    }
};