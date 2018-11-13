const {MysqlPool} = require('../core/mysql.config');

module.exports.KeyValueDao = class {
  static async setValue(key, value) {
    const [isExist] =
        await MysqlPool.query(`
          SELECT COUNT(*) AS cnt
          FROM test_tb
          WHERE \`key\`=?
        `, key);
    if (isExist[0].cnt === 0) {
      await MysqlPool.query(`
        INSERT INTO test_tb(\`key\`, value)
        VALUES
        (?, ?)
      `, [key, value]);
    } else {
      await MysqlPool.query(`
        UPDATE test_tb
        SET value = ?
        WHERE \`key\`=?
      `, [value, key]);
    }
  }

  static async getValue(key) {
    const [result] =
        await MysqlPool.query('SELECT value FROM test_tb WHERE `key`=?', key);
    return result[0].value;
  }

  static async getAllKeys() {
    const [result] = await MysqlPool.query('SELECT `key` FROM test_tb');
    return result;
  }
};
