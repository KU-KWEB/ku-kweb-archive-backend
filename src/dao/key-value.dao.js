const {MysqlPool} = require('../core/mysql.config');

module.exports.KeyValueDao = class {
  static async setValue(key, value) {
    const [isExist] =
        await MysqlPool.query(`
          SELECT COUNT(*) AS cnt
          FROM KeyValueStrage
          WHERE \`key\`=?
        `, key);
    if (isExist[0].cnt === 0) {
      await MysqlPool.query(`
        INSERT INTO KeyValueStrage(\`key\`, value)
        VALUES
        (?, ?)
      `, [key, value]);
    } else {
      await MysqlPool.query(`
        UPDATE KeyValueStrage
        SET value = ?
        WHERE \`key\`=?
      `, [value, key]);
    }
  }

  static async getValue(key) {
    const [result] =
        await MysqlPool.query(`
          SELECT value
          FROM KeyValueStrage WHERE \`key\`=?
        `, [key]);
    if (result.length === 0 || !result[0].key) {
      return null;
    }
    return result[0].value;
  }

  static async getAllKeys() {
    const [result] = await MysqlPool.query('SELECT `key` FROM KeyValueStrage');
    return result;
  }
};
