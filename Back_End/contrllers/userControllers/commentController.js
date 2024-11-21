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

    // Kiểm tra xem người dùng đã mua sản phẩm này chưa
    const checkOrderSql = `
        SELECT 
            o.User_ID, od.Product_ID 
        FROM orders o
        JOIN order_details od ON o.Order_ID = od.Order_ID
        WHERE o.User_ID = ? AND od.Product_ID = ? AND o.Status = 5
    `;

    db.query(checkOrderSql, [User_ID, Product_ID], (err, orderResults) => {
        if (err) {
            console.error("Lỗi khi kiểm tra trạng thái đơn hàng:", err);
            return res.status(500).json({ message: 'Lỗi khi kiểm tra đơn hàng', error: err });
        }

        if (orderResults.length === 0) {
            return res.status(403).json({ message: 'Bạn chỉ có thể bình luận sau khi nhận hàng' });
        }

        // Kiểm tra xem người dùng đã bình luận chưa
        const checkReviewSql = `
            SELECT Review_ID 
            FROM reviews 
            WHERE User_ID = ? AND Product_ID = ?
        `;

        db.query(checkReviewSql, [User_ID, Product_ID], (err, reviewResults) => {
            if (err) {
                console.error("Lỗi khi kiểm tra bình luận:", err);
                return res.status(500).json({ message: 'Lỗi khi kiểm tra bình luận', error: err });
            }

            if (reviewResults.length > 0) {
                return res.status(403).json({ message: 'Bạn đã bình luận cho sản phẩm này' });
            }

            // Thêm bình luận mới
            const addReviewSql = `
                INSERT INTO reviews (User_ID, Product_ID, Ratting, Comment, User_Name, Show_Hidden)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.query(addReviewSql, [User_ID, Product_ID, Ratting, Comment, User_Name, Show_Hidden], (err, result) => {
                if (err) {
                    console.error("Lỗi khi thêm bình luận:", err);
                    return res.status(500).json({ message: 'Lỗi khi thêm bình luận', error: err });
                }

                res.json({ message: 'Thêm bình luận thành công', reviewId: result.insertId });
            });
        });
    });
};

exports.getPurchaseHistory = async (req, res) => {
    try {
        const { userId } = req.params;

        // Truy vấn để lấy các sản phẩm đã mua của người dùng
        const orders = await Order.find({ userId });
        
        // Lấy chi tiết đơn hàng (sản phẩm đã mua)
        const purchasedProductIds = [];
        for (let order of orders) {
            const orderDetails = await OrderDetail.find({ orderId: order.id });
            for (let detail of orderDetails) {
                purchasedProductIds.push(detail.productId);
            }
        }

        res.status(200).json(purchasedProductIds);
    } catch (err) {
        console.error('Lỗi khi lấy lịch sử mua hàng:', err);
        res.status(500).json({ message: 'Lỗi khi lấy lịch sử mua hàng.' });
    }
};


