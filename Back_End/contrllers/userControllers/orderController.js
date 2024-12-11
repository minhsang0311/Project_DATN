const db = require('../../config/db');

exports.getOrderList = (req, res) => {
    const userId = req.params.userId;
    const sql = `
        SELECT o.Order_ID, o.User_ID, o.Phone, o.User_Name, o.Address,  
               o.payment_method, o.total_amount, o.created_at,  
               o.total_quantity, o.Note, os.Status_Name AS Status 
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
exports.getOrderDetail = (req, res) => {
    const orderId = req.params.orderId;
    const sql = `
        SELECT o.Order_ID, o.User_ID, o.Phone, o.User_Name, o.Address,  
               o.payment_method, o.total_amount, o.created_at,  
               o.total_quantity, o.Note, os.Status_Name AS Status 
        FROM orders o
        JOIN order_status os ON o.Status = os.Status_ID
        WHERE o.Order_ID = ?
    `;
    db.query(sql, [orderId], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi lấy chi tiết đơn hàng", err });
        }
        res.json(data);
    });
};

exports.putcancelOrder = (req, res) => {
    const { orderId } = req.params;
    const { reason } = req.body;  // Lý do hủy

    // Kiểm tra xem lý do hủy có tồn tại không
    if (!reason) {
        return res.status(400).json({ message: 'Vui lòng cung cấp lý do hủy.' });
    }

    // Truy vấn để kiểm tra trạng thái đơn hàng
    const query = 'SELECT * FROM orders WHERE Order_ID = ?';
    db.query(query, [orderId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Lỗi khi lấy thông tin đơn hàng.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Đơn hàng không tồn tại.' });
        }

        const order = results[0];

        // Kiểm tra xem đơn hàng có trạng thái "Chờ xác nhận" không
        if (order.Status !== 1) {
            return res.status(400).json({ message: 'Không thể hủy đơn hàng khi đã xác nhận hoặc đang trong quá trình vận chuyển.' });
        }

        // Cập nhật trạng thái đơn hàng và lý do hủy
        const updateQuery = 'UPDATE orders SET Status = ?, canceled_reason = ? WHERE Order_ID = ?';
        db.query(updateQuery, [ 6, reason, orderId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái đơn hàng.' });
            }

            return res.status(200).json({ message: 'Đơn hàng đã được hủy', orderId });
        });
    });
};