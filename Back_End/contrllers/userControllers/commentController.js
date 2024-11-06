const db = require('../../config/db');
exports.getreviews = (req, res) => {
    let productId = parseInt(req.params.productId);
    console.log("Received productId:", productId); // In log để kiểm tra giá trị productId
    if (isNaN(productId) || productId <= 0) {
        return res.status(400).json({ "message": "Không tìm được sản phẩm", "id": productId });
    }
    
    const sql = 'SELECT * FROM reviews WHERE Product_ID = ? AND Show_Hidden = 1';
    db.query(sql, [productId], (err, data) => {
        if (err) {
            console.error("Error fetching reviews:", err); // In log lỗi nếu có
            return res.status(500).json({ "message": "Lỗi khi lấy dữ liệu", err });
        }
        if (data.length === 0) {
            return res.status(404).json({ "message": "Không có bình luận cho sản phẩm này" });
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
            console.error("Error inserting review:", err);
            return res.status(500).json({ message: 'Lỗi khi thêm bình luận', error: err });
        }
        console.log("Insert result:", result);
        res.json({ message: 'Thêm bình luận thành công', reviewId: result.insertId });
    });
};
