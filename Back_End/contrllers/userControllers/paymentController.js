const db = require('../../config/db');

exports.paymentController = (req, res) => {
    const { Product_Name, Address, Phone, Email, payment_method, total_amount, items, User_ID, Voucher_ID } = req.body;

    // Kiểm tra xem User_ID có được cung cấp không
    if (!User_ID) {
        return res.status(400).json({ success: false, message: 'Người dùng không tồn tại' });
    }

    // Kiểm tra xem giỏ hàng có chứa sản phẩm hợp lệ hay không
    const orderItems = items
        .filter(item => item.Product_ID && item.Quantity > 0 && item.Price >= 0)
        .map(item => [null, item.Product_ID, item.Quantity, item.Price]);

    if (orderItems.length === 0) {
        return res.status(400).json({ success: false, message: 'Trang giỏ hàng không chứa sản phẩm' });
    }

    // Mặc định trạng thái đơn hàng là "Pending" (có thể thay đổi trạng thái theo yêu cầu)
    const defaultStatus = 1;  // Giả sử 1 là ID trạng thái "Pending" trong bảng `order_status`

    // Insert order vào bảng `orders`
    const query = 'INSERT INTO `orders` (User_ID, Voucher_ID, Product_Name, Address, Phone, Email, payment_method, total_amount, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [User_ID, Voucher_ID || null, Product_Name, Address, Phone, Email, payment_method, total_amount, defaultStatus], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Lỗi tạo đơn hàng', err });
        }

        const orderId = result.insertId; // ID của đơn hàng vừa tạo

        // Insert các sản phẩm hợp lệ vào bảng `order_details`
        const detailsQuery = 'INSERT INTO order_details (Order_ID, Product_ID, Quantity, Price) VALUES ?';
        const values = orderItems.map(item => [orderId, ...item.slice(1)]);

        db.query(detailsQuery, [values], (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Lỗi lưu đơn hàng chi tiết', err });
            }

            // Tính tổng số lượng sản phẩm trong bảng `order_details`
            const totalItemsQuery = 'SELECT SUM(Quantity) AS total_quantity FROM order_details WHERE Order_ID = ?';
            db.query(totalItemsQuery, [orderId], (err, result) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Lỗi khi tính tổng số sản phẩm', err });
                }

                const totalQuantity = result[0].total_quantity;

                // Cập nhật tổng số lượng sản phẩm vào bảng `orders`
                const updateOrderQuery = 'UPDATE orders SET total_quantity = ? WHERE Order_ID = ?';
                db.query(updateOrderQuery, [totalQuantity, orderId], (err) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: 'Lỗi khi cập nhật tổng sản phẩm', err });
                    }

                    // Trả về thông tin đơn hàng cùng với tổng số sản phẩm
                    res.status(200).json({
                        success: true,
                        message: 'Đơn hàng đã được luu thành công!',
                        total_quantity: totalQuantity, // Tổng số sản phẩm
                        orderId: orderId // ID đơn hàng
                    });
                });
            });
        });
    });
};
