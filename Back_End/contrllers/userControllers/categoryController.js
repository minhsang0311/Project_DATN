const db = require('../../config/db');

exports.getAllCategories = (req, res) => {
    let sql = `SELECT * FROM Categories`;
    db.query(sql, (err, data) => {
        if (err) return res.json({ "message": "Lỗi lấy danh sách danh muc", err });
        res.json(data);
    });
};