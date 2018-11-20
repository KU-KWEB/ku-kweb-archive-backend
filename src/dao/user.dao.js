const {MysqlPool} = require('../core/mysql.config');

module.exports.UserDao = class {
  static async createUser(id, pwHash, email) {
    const sql = `INSERT INTO user (identity, credential, email)
        VALUES
        (?, ?, ?)
        `;
    await MysqlPool.query(sql, [id, pwHash, email]);
  }
};
