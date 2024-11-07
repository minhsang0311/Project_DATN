const db = require('../../config/db');

exports.paymentController = (req, res) => {
    const { Product_Name, Address, Phone, Email, payment_method, total_amount, items, User_ID, Voucher_ID } = req.body;

    // Kiểm tra xem User_ID và Voucher_ID có được cung cấp không
    if (!User_ID) {
        return res.status(400).json({ success: false, message: 'User_ID is required' });
    }

    if (!Voucher_ID) {
        return res.status(400).json({ success: false, message: 'Voucher_ID is required' });
    }

    // Insert order vào bảng orders, bao gồm Voucher_ID
    const query = 'INSERT INTO `order` (User_ID, Voucher_ID, Product_Name, Address, Phone, Email, payment_method, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [User_ID, Voucher_ID, Product_Name, Address, Phone, Email, payment_method, total_amount], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Failed to create order.', err });
        }

        const orderId = result.insertId; // Lấy ID của đơn hàng vừa thêm

        // Insert từng item vào bảng order_details
        // Validate `items` array
        const orderItems = items
            .filter(item => item.Product_ID) // Ensure `Product_ID` exists
            .map(item => [
                orderId, item.Product_ID, item.Quantity, item.Price
            ]);

        if (orderItems.length === 0) {
            return res.status(400).json({ success: false, message: 'No valid items in order.' });
        }

        // Insert validated items into order_details
        db.query('INSERT INTO order_details (Order_ID, Product_ID, Quantity, Price) VALUES ? ', [orderItems], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Failed to create order items.', err });
            }
            res.status(200).json({ success: true, message: 'Order created successfully!' });
        });

    });

};
