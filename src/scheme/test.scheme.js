const {MysqlScheme} = require('../core/database/mysql-scheme.helper');

module.exports.TestTable = new MysqlScheme(`
CREATE TABLE IF NOT EXISTS test_tb (
    id int(11) NOT NULL AUTO_INCREMENT,
    \`key\` varchar(255) DEFAULT NULL,
    value varchar(255) DEFAULT NULL,
    PRIMARY KEY (id)
);
`);
