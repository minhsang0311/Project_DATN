
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'datn'
});

db.connect(err => {
    if (err) throw err;
    console.log('Đã kết nối database');
});

module.exports = db;
