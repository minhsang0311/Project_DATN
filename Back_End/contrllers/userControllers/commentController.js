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

    // Kiểm tra dữ liệu đầu vào
    if (!User_ID || !Product_ID || !Ratting || !Comment || !User_Name) {
        return res.status(400).json({ message: 'Thiếu dữ liệu cần thiết' });
    }

    // Kiểm tra đơn hàng và trạng thái đã giao
    const checkOrderAndReviewSql = 
       ` SELECT 
            o.User_ID, od.Product_ID, o.Status
        FROM orders o
        JOIN order_details od ON o.Order_ID = od.Order_ID        
        WHERE o.User_ID = ? AND od.Product_ID = ? AND o.Status = 5`
    ;

    db.query(checkOrderAndReviewSql, [User_ID, Product_ID], (err, results) => {
        if (err) {
            console.error("Error checking order and review:", err);
            return res.status(500).json({ message: 'Lỗi khi kiểm tra dữ liệu', error: err });
        }

        // Nếu không tìm thấy đơn hàng đã giao, người dùng không thể bình luận
        if (results.length === 0) {
            return res.status(403).json({ message: 'Bạn chỉ có thể bình luận sau khi nhận hàng' });
        }

        // Kiểm tra xem người dùng đã bình luận cho sản phẩm này chưa
        const checkExistingReviewSql = `SELECT * FROM reviews WHERE User_ID = ? AND Product_ID = ?`;
        db.query(checkExistingReviewSql, [User_ID, Product_ID], (err, reviewResults) => {
            if (err) {
                console.error("Error checking existing review:", err);
                return res.status(500).json({ message: 'Lỗi khi kiểm tra bình luận', error: err });
            }

            // Nếu đã bình luận rồi, không cho phép bình luận thêm
            if (reviewResults.length > 0) {
                return res.status(403).json({ message: 'Bạn đã bình luận cho sản phẩm này' });
            }

            // Nếu chưa có bình luận, tiến hành thêm bình luận mới
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
    });
};
// API kiểm tra quyền bình luận
exports.canComment = (req, res) => {
    const { userId, productId } = req.params;

    // Kiểm tra đơn hàng của người dùng
    const sql = `SELECT o.Status 
                 FROM orders o
                 JOIN order_details od ON o.Order_ID = od.Order_ID
                 WHERE o.User_ID = ? AND od.Product_ID = ? AND o.Status = 5`; // 5 là trạng thái đã giao

    db.query(sql, [userId, productId], (err, results) => {
        if (err) {
            console.error("Error checking can comment:", err);
            return res.status(500).json({ message: 'Lỗi khi kiểm tra quyền bình luận', error: err });
        }

        if (results.length > 0) {
            return res.json({ canComment: true }); // Người dùng có thể bình luận
        } else {
            return res.json({ canComment: false }); // Người dùng không thể bình luận
        }
    });
};
exports.putReview = (req, res) => {
    const reviewId = parseInt(req.params.reviewId);
    const { User_ID, Ratting, Comment, Show_Hidden } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!Ratting || !Comment) {
        return res.status(400).json({ message: 'Thiếu dữ liệu cần thiết' });
    }

    // Kiểm tra xem bình luận có tồn tại không
    const checkReviewSql = `SELECT * FROM reviews WHERE Review_ID = ? AND User_ID = ?`;
    db.query(checkReviewSql, [reviewId, User_ID], (err, results) => {
       

        // Cập nhật bình luận
        const updateReviewSql = `UPDATE reviews SET Ratting = ?, Comment = ?, Show_Hidden = ? WHERE Review_ID = ?`;
        db.query(updateReviewSql, [Ratting, Comment, Show_Hidden, reviewId], (err, result) => {
            if (err) {
                console.error("Error updating review:", err);
                return res.status(500).json({ message: 'Lỗi khi cập nhật bình luận', error: err });
            }

            res.json({ message: 'Cập nhật bình luận thành công' });
        });
    });
};
