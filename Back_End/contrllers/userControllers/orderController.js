const db = require('../../config/db');

exports.getOrderList = (req, res) => {
    const userId = req.params.userId;
    const sql = `
        SELECT o.Order_ID, o.User_ID, o.Address, 
               o.payment_method, o.total_amount, o.created_at, o.Product_Name, 
               o.total_quantity, os.Status_Name AS Status 
        FROM orders o
        JOIN order_status os ON o.Status = os.Status_ID
        WHERE o.User_ID = ?
    `;
    db.query(sql, [userId], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi lấy trạng thái đơn hàng", err });
        }
        res.json(data);
    });
};

