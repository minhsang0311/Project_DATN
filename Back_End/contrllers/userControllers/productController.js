const db = require('../../config/db');

exports.getAllProducts = (req, res) => {
    let sql = `SELECT * FROM Products`;
    db.query(sql, (err, data) => {
        if (err) return res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        res.json(data);
    });
};
