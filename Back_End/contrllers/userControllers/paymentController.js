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
// exports.paymentOnline = async function (req, res, next) {
//     var ipAddr = req.headers['x-forwarded-for'] ||
//         req.connection.remoteAddress ||
//         req.socket.remoteAddress ||
//         req.connection.socket.remoteAddress;

//     var config = require('../../config/db');
//     const dateFormat = (await import('dateformat')).default;

    
//     var tmnCode = config.OODMO816;
//     var secretKey = config.JFEAHS70MQRZEPCZZ09PMQMPCYK63M34;
//     var vnpUrl = config.vnp_Url;
//     var returnUrl = config.vnp_ReturnUrl;

//     var date = new Date();

//     var createDate = dateFormat(date, 'yyyymmddHHmmss');
//     var orderId = dateFormat(date, 'HHmmss');
//     var amount = req.body.amount;
//     var bankCode = req.body.bankCode;
    
//     var orderInfo = req.body.orderDescription;
//     var orderType = req.body.orderType;
//     var locale = req.body.language;
//     if(locale === null || locale === ''){
//         locale = 'vn';
//     }
//     var currCode = 'VND';
//     var vnp_Params = {};
//     vnp_Params['vnp_Version'] = '2.1.0';
//     vnp_Params['vnp_Command'] = 'pay';
//     vnp_Params['vnp_TmnCode'] = tmnCode;
//     // vnp_Params['vnp_Merchant'] = ''
//     vnp_Params['vnp_Locale'] = locale;
//     vnp_Params['vnp_CurrCode'] = currCode;
//     vnp_Params['vnp_TxnRef'] = orderId;
//     vnp_Params['vnp_OrderInfo'] = orderInfo;
//     vnp_Params['vnp_OrderType'] = orderType;
//     vnp_Params['vnp_Amount'] = amount * 100;
//     vnp_Params['vnp_ReturnUrl'] = returnUrl;
//     vnp_Params['vnp_IpAddr'] = ipAddr;
//     vnp_Params['vnp_CreateDate'] = createDate;
//     if(bankCode !== null && bankCode !== ''){
//         vnp_Params['vnp_BankCode'] = bankCode;
//     }
    
//     vnp_Params = sortObject(vnp_Params);

//     var querystring = require('qs');
//     var signData = querystring.stringify(vnp_Params, { encode: false });
//     var crypto = require("crypto");     
//     var hmac = crypto.createHmac("sha512", secretKey);
//     var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
//     vnp_Params['vnp_SecureHash'] = signed;
//     vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

//     res.redirect(vnpUrl)
// }
