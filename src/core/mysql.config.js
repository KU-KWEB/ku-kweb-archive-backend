const mysql = require('mysql2');

const pool = mysql.createPoolPromise({
  host: 'localhost',
  user: 'root',
  database: 'test',
  multipleStatements: true,
});

module.exports.MysqlPool = pool;
