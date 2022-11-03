const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true // 여러 쿼리를 ';'를 기준으로 한번에 보낼 수 있게한다
});

db.connect();

module.exports = db;