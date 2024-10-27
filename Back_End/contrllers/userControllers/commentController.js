const db = require('../../config/db');


// Lấy danh sách bình luận của sản phẩm
exports.getreviews = (req, res) => {
    // Lấy Product ID từ URL
    let id = parseInt(req.params.id);
    
    // Kiểm tra xem ID có hợp lệ hay không
    if (isNaN(id) || id <= 0) {
        return res.json({ "message": "Không tìm được sản phẩm", "id": id });
    }

    // Câu lệnh SQL để lấy bình luận cho sản phẩm theo Product_ID và chỉ hiện những bình luận được phép hiển thị (Show_Hidden = 1)
    const sql = 'SELECT * FROM reviews WHERE Product_ID = ? AND Show_Hidden = 1';

    // Thực hiện truy vấn SQL
    db.query(sql, [id], (err, data) => {
        if (err) {
            // Trả về lỗi nếu xảy ra sự cố khi lấy dữ liệu
            return res.json({ "message": "Lỗi khi lấy dữ liệu", err });
        }
        
        // Trả về danh sách bình luận
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
