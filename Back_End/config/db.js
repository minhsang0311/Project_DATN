
const mysql = require('mysql');
const util = require('util')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'datn2'

});
db.connect(err => {
    if (err) throw err;
    console.log('Đã kết nối database');
}); 
db.query = util.promisify(db.query);
module.exports = db;
