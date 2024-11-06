const db = require('../../config/db');

exports.getreviews = (req, res) => {
    let id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.json({ "message": "Không tìm được sản phẩm", "id": id });
    }
    const sql = 'SELECT * FROM reviews WHERE Product_ID = ? AND Show_Hidden = 1';
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ "message": "Lỗi khi lấy dữ liệu", err });
        }
        res.json(data);
    });
};
// Thêm bình luận mới
exports.postreviews = (req, res) => {
    const { User_ID, Product_ID, Ratting, Comment, User_Name, Show_Hidden } = req.body;
    const sql = 'INSERT INTO reviews (User_ID, Product_ID, Ratting, Comment, User_Name, Show_Hidden) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [User_ID, Product_ID, Ratting, Comment, User_Name, Show_Hidden], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi thêm bình luận', error: err });
        }
        res.json({ message: 'Thêm bình luận thành công', reviewId: result.insertId });
    });
};
