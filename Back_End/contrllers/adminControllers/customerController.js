const db = require('../../config/db');

// Lấy danh sách tất cả người dùng
exports.getAllCustomers = (req, res) => {
    let sql = `SELECT * FROM users`;
    db.query(sql, (err, data) => {
        if (err) {
            res.status(500).json({ "thongbao": "Lỗi lấy danh sách người dùng", err });
        } else {
            res.json(data);
        }
    });
};

  