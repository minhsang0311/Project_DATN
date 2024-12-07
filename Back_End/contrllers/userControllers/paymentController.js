
const db = require('../../config/db');

exports.paymentController = (req, res) => {
    const {
        Address,
        User_Name,
        Phone,
        Email,
        payment_method,
        total_amount,
        items,
        User_ID,
        Voucher_ID,
        total_quantity, // Nhận tổng số lượng từ frontend
        Note
    } = req.body;

    if (!User_ID) {
        return res.status(400).json({ success: false, message: 'Người dùng không tồn tại' });
    }

    const orderItems = items
        .filter(item => item.Product_ID && item.Quantity > 0 && item.Price >= 0)
        .map(item => [null, item.Product_ID, item.Quantity, item.Price]);

    if (orderItems.length === 0) {
        return res.status(400).json({ success: false, message: 'Trang giỏ hàng không chứa sản phẩm' });
    }

    const defaultStatus = 1;

    // Hàm tạo đơn hàng
    function createOrder(validVoucherID) {
        const query = `
            INSERT INTO orders (
                User_ID, Voucher_ID, Address, Phone, User_Name, Email, payment_method, total_amount, Status, total_quantity, Note
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(
            query,
            [
                User_ID,
                validVoucherID,
                Address,
                Phone,
                User_Name,
                Email,
                payment_method,
                total_amount,
                defaultStatus,
                total_quantity,
                Note || null
            ],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Lỗi tạo đơn hàng', err });
                }
                const orderId = result.insertId;

                const detailsQuery = 'INSERT INTO order_details (Order_ID, Product_ID, Quantity, Price) VALUES ?';
                const values = orderItems.map(item => [orderId, ...item.slice(1)]);

                db.query(detailsQuery, [values], (err) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: 'Lỗi lưu chi tiết đơn hàng', err });
                    }

                    res.status(200).json({
                        success: true,
                        message: 'Đơn hàng đã được lưu thành công!',
                        orderId: orderId
                    });
                });
            }
        );
    }

    // Kiểm tra voucher nếu được cung cấp
    if (Voucher_ID) {
        const checkVoucherQuery = `
            SELECT v.Voucher_ID, v.Expiration_Date, o.User_ID AS Used_By
            FROM Vouchers v
            LEFT JOIN orders o ON v.Voucher_ID = o.Voucher_ID
            WHERE v.Code = ? AND v.Expiration_Date > NOW()
        `;
        db.query(checkVoucherQuery, [Voucher_ID], (err, voucherResults) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Lỗi kiểm tra voucher', err });
            }

            if (voucherResults.length === 0) {
                return res.status(400).json({ success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn' });
            }

            const voucher = voucherResults[0];

            // Kiểm tra nếu voucher đã được sử dụng bởi người dùng hiện tại
            if (voucher.Used_By) {
                if (voucher.Used_By === User_ID) {
                    return res.status(400).json({ 
                        success: false, 
                        message: 'Mã giảm giá đã được sử dụng bởi tài khoản của bạn' 
                    });
                } else {
                    return res.status(400).json({ 
                        success: false, 
                        message: 'Mã giảm giá đã được sử dụng bởi tài khoản khác' 
                    });
                }
            }

            // Tiến hành tạo đơn hàng với voucher hợp lệ
            createOrder(voucher.Voucher_ID);
        });
    } else {
        // Nếu không có mã voucher, tiếp tục tạo đơn hàng
        createOrder(null);
    }
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
