const db = require('../../config/db');

exports.getOrderList = (req, res) => {
    const userId = req.params.userId;
    const sql = `

       SELECT 
    o.Order_ID, 
    o.User_ID, 
    o.Phone, 
    o.User_Name, 
    o.Address,  
    o.payment_method, 
    o.total_amount, 
    o.created_at,  
    o.total_quantity, 
    o.Note, 
    os.Status_Name AS Status,
    p.Product_Name,
    od.quantity,
    od.Order_Detail_ID
   
FROM orders o
JOIN order_status os ON o.Status = os.Status_ID
JOIN order_details od ON o.Order_ID = od.Order_ID
JOIN products p ON od.Product_ID = p.Product_ID
WHERE o.User_ID = ?

    `;
    db.query(sql, [userId], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi lấy trạng thái đơn hàng", err });
        }
        res.json(data);
    });
};

exports.getOrderDetailById = (req, res) => {
    const { orderDetailId } = req.params; // Get the order_detail_id from the URL

    const sql = `
        SELECT 
            o.Order_ID,
            o.User_ID,
            o.Phone,
            o.User_Name,
            o.Address,
            o.payment_method,
            o.total_amount,
            o.created_at,
            o.total_quantity,
            o.Note,
            os.Status_Name AS Status,
            od.Order_Detail_ID,
            p.Product_Name,
            od.Quantity,
            od.Price
        FROM order_details od
        JOIN orders o ON od.Order_ID = o.Order_ID
        JOIN order_status os ON o.Status = os.Status_ID
        JOIN products p ON od.Product_ID = p.Product_ID
        WHERE od.Order_Detail_ID = ?
    `;

    db.query(sql, [orderDetailId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving order detail', err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Order detail not found' });
        }

        res.json(results);
    });
};

exports.putcancelOrder = (req, res) => {
    const orderDetailId = req.params.orderDetailId;  // Lấy Order_Detail_ID từ URL
    const { reason } = req.body;  // Lý do hủy

    // Kiểm tra xem lý do hủy có tồn tại không
    if (!reason) {
        return res.status(400).json({ message: 'Vui lòng cung cấp lý do hủy.' });
    }

    // Truy vấn để lấy Order_ID từ Order_Detail_ID
    const query = 'SELECT Order_ID FROM order_details WHERE Order_Detail_ID = ?';
    db.query(query, [orderDetailId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi lấy thông tin chi tiết đơn hàng.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Chi tiết đơn hàng không tồn tại.' });
        }

        const orderId = results[0].Order_ID;  // Lấy Order_ID từ kết quả truy vấn

        // Truy vấn để lấy thông tin đơn hàng từ bảng orders
        const orderQuery = 'SELECT * FROM orders WHERE Order_ID = ?';
        db.query(orderQuery, [orderId], (err, orderResults) => {
            if (err) {
                return res.status(500).json({ message: 'Lỗi khi lấy thông tin đơn hàng.' });
            }

            if (orderResults.length === 0) {
                return res.status(404).json({ message: 'Đơn hàng không tồn tại.' });
            }

            const order = orderResults[0];

            // Kiểm tra trạng thái của đơn hàng chính
            if (order.Status !== 1) {  
                return res.status(400).json({ message: 'Không thể hủy đơn hàng khi đã xác nhận hoặc đang trong quá trình vận chuyển.' });
            }

            // Cập nhật lý do hủy và trạng thái trong bảng orders
            const updateOrderQuery = 'UPDATE orders SET canceled_reason = ?, Status = ? WHERE Order_ID = ?';
            const newStatus = 6; 
            db.query(updateOrderQuery, [reason, newStatus, orderId], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Lỗi khi cập nhật lý do hủy trong đơn hàng chính.' });
                }

                // Trả về phản hồi thành công
                return res.status(200).json({ message: 'Đơn hàng đã được hủy và lý do hủy đã được lưu.', orderDetailId });
            });
        });
    });
};



