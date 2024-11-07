// paymentController.js

const db = require('../../config/db');

exports.paymentController = (req, res) => {
    const { Product_Name, Address, Phone, Email, payment_method, total_amount, items, User_ID, Voucher_ID } = req.body;

    // Kiểm tra xem User_ID có được cung cấp không
    if (!User_ID) {
        return res.status(400).json({ success: false, message: 'User_ID is required' });
    }

    // Kiểm tra xem giỏ hàng có chứa sản phẩm hợp lệ hay không
    const orderItems = items
        .filter(item => item.Product_ID && item.Quantity > 0 && item.Price >= 0)
        .map(item => [null, item.Product_ID, item.Quantity, item.Price]);

    if (orderItems.length === 0) {
        return res.status(400).json({ success: false, message: 'No valid items in the cart. Please check your cart and try again.' });
    }

    // Insert order vào bảng `order`
    const query = 'INSERT INTO `order` (User_ID, Voucher_ID, Product_Name, Address, Phone, Email, payment_method, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [User_ID, Voucher_ID || null, Product_Name, Address, Phone, Email, payment_method, total_amount], (err, result) => {
        if (err) {
            console.error('Order creation error:', err);
            return res.status(500).json({ success: false, message: 'Failed to create order.', err });
        }

        const orderId = result.insertId; // ID của đơn hàng vừa tạo

        // Insert các sản phẩm hợp lệ vào bảng `order_details`
        const detailsQuery = 'INSERT INTO order_details (Order_ID, Product_ID, Quantity, Price) VALUES ?';
        const values = orderItems.map(item => [orderId, ...item.slice(1)]);

        db.query(detailsQuery, [values], (err) => {
            if (err) {
                console.error('Order details creation error:', err);
                return res.status(500).json({ success: false, message: 'Failed to create order items.', err });
            }
            res.status(200).json({ success: true, message: 'Order created successfully!' });
        });
    });
};
