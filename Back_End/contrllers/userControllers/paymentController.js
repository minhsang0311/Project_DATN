const querystring = require('qs');
const crypto = require("crypto");
const { log } = require('console');
const db = require('../../config/db');
const { VNPay, ignoreLogger } = require('vnpay');
const { payment } = require('../../utils/payment');
const sortObject = require('../../utils/sortObject');
require('dotenv').config()
if (!process.env.VNP_HASHSECRET || !process.env.VNP_TMNCODE) {
    throw new Error("Missing VNPAY_SECURE_SECRET or VNPAY_TMN_CODE");
}
const vnpay = new VNPay({
    secureSecret: process.env.VNP_HASHSECRET,
    tmnCode: process.env.VNP_TMNCODE,
    vnpayHost: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    testMode: true,
    hashAlgorithm: "SHA512",
    enableLog: true,
    loggerFn: ignoreLogger,
});
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
                console.log("day lla order", result)
                if (err) {
                    return res.status(500).json({ success: false, message: 'Lỗi tạo đơn hàng', err });
                }
                const orderId = result.insertId;
                const detailOrderID = `SELECT * FROM orders WHERE Order_ID=?`

                db.query(detailOrderID, orderId, (err, result) => {

                    console.log("order detail", result)
                    const URL = payment(result[0].Order_ID, "VNPAY", "", result[0].total_amount)
                    const detailsQuery = 'INSERT INTO order_details (Order_ID, Product_ID, Quantity, Price) VALUES ?';
                    const values = orderItems.map(item => [orderId, ...item.slice(1)]);
                    db.query(detailsQuery, [values], (err) => {
                        if (err) {
                            return res.status(500).json({ success: false, message: 'Lỗi lưu chi tiết đơn hàng', err });
                        }
                        res.status(200).json({
                            success: true,
                            url: URL,
                            message: 'Đơn hàng đã được lưu thành công!',
                            orderId: orderId
                        });
                    });
                })

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

exports.getBankList = async (req, res) => {
    try {
        const bankList = (await vnpay.getBankList())
        return res.status(200).json({
            showTitle: true,
            bankList,
        });
    }
    catch (
    error
    ) {
        console.log(error)
    }

}
exports.vnpay_return = (req, res) => {
    let vnp_Params = req.query;
    console.log("abcàhsuidfghdiusghndrf", vnp_Params);

    let secureHash = vnp_Params['vnp_SecureHash'];

    // Xóa các tham số liên quan đến chữ ký
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    // Sắp xếp tham số
    vnp_Params = sortObject(vnp_Params);

    let secretKey = process.env.VNP_HASHSECRET;

    // Tạo chữ ký dựa trên tham số đã sắp xếp
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        // Kiểm tra dữ liệu trong DB nếu cần thiết, sau đó trả kết quả
        return res.status(200).json({ status: 'success', code: vnp_Params['vnp_ResponseCode'] });
    } else {
        return res.status(200).json({ status: 'fail', code: '97' });
    }
};
