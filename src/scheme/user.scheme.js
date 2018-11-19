const {MysqlScheme} = require('../core/database/mysql-scheme.helper');

module.exports.UserScheme = new MysqlScheme(`
CREATE TABLE IF NOT EXISTS User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    identity VARCHAR(25) NOT NULL,
    credential VARCHAR(192) NOT NULL,
    status TINYINT NOT NULL DEFAULT 0,
    email VARCHAR(255) NOT NULL,
    kweb_status TINYINT NOT NULL DEFAULT 0,
    kweb_gereration INT NOT NULL DEFAULT 1
);
`);
