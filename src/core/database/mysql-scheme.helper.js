module.exports.MysqlScheme = class {
  constructor(createTableSql, ...Migration) {
    this.createTable = createTableSql;
    this.migrations = Migration;
  }

  getTableName() {
    return this.createTable
        .replace(/`/g, '')
        .replace(/\s+/g, ' ')
        .match(/\s(\S+)\s*\(/)[1];
  }

  async initialize(pool) {
    console.log(`[KWEB] Initialize table ${this.getTableName()}`);
    try {
      await pool.execute(this.createTable);
    } catch (e) {
      console.log(`[KWEB] Initialize table ${this.getTableName()} FAIELD`);
    }

    for (const migrationSql of this.migrations) {
      await pool.execute(migrationSql);
    }
  }
};
