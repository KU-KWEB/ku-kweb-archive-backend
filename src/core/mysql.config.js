const mysql = require('mysql2');


const pool = mysql.createPoolPromise({
  host: 'localhost',
  user: 'root',
  database: 'test',
});

module.exports.MysqlPool = pool;
