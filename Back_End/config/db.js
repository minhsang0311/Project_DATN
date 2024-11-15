
const mysql = require('mysql');
const util = require('util')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
<<<<<<< HEAD
    port: 3307,
    database: 'datn'
=======
    port: 3306,
    database: 'datn2'
>>>>>>> efb196e8958326bcab0d39305e77de6a2642a86f
});
db.connect(err => {
    if (err) throw err;
    console.log('Đã kết nối database');
}); 
db.query = util.promisify(db.query);
module.exports = db;
