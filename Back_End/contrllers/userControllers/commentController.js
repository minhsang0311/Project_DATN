const db = require('../../config/db');
exports.getreviews = (req, res) => {
    let productId = parseInt(req.params.productId);
  
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

exports.postreviews = (req, res) => {
    const { User_ID, Product_ID, Ratting, Comment, User_Name, Show_Hidden } = req.body;

    if (!User_ID || !Product_ID || !Ratting || !Comment || !User_Name) {
        return res.status(400).json({ message: 'Thiếu dữ liệu cần thiết' });
    }

    const checkOrderAndReviewSql = 
       ` SELECT 
            o.User_ID, od.Product_ID, o.Status
        FROM orders o
        JOIN order_details od ON o.Order_ID = od.Order_ID        
        WHERE o.User_ID = ? AND od.Product_ID = ? AND o.Status = 5`
    ;

    db.query(checkOrderAndReviewSql, [User_ID, Product_ID], (err, results) => {
        console.log(results)
        if (err) {
            console.error("Error checking order and review:", err);
            return res.status(500).json({ message: 'Lỗi khi kiểm tra dữ liệu', error: err });
        }

        if (results.length === 0) {
            return res.status(403).json({ message: 'Bạn chỉ có thể bình luận sau khi nhận hàng' });
        }
        console.log("Request Body:", req.body); 
        const review = results[0];
        if (review.Review_ID) {
            return res.status(403).json({ message: 'Bạn đã bình luận cho sản phẩm này' });
        }

        const addReviewSql = 
            `INSERT INTO reviews (User_ID, Product_ID, Ratting, Comment, User_Name, Show_Hidden)
            VALUES (?, ?, ?, ?, ?, ?)`
        ;

        db.query(addReviewSql, [User_ID, Product_ID, Ratting, Comment, User_Name, Show_Hidden], (err, result) => {
            if (err) {
                console.error("Error inserting review:", err);
                return res.status(500).json({ message: 'Lỗi khi thêm bình luận', error: err });
            }
            res.json({ message: 'Thêm bình luận thành công', reviewId: result.insertId });
        });
    });
};