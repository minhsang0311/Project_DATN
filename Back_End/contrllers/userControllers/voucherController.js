const db = require('../../config/db');

exports.CheckVoucher = (req, res) => {
    const { code } = req.body; 
    const userId = req.decodedData.userId; // Nhận userId từ token đã giải mã

    const query = `
        SELECT v.*, o.User_ID AS Used_By
        FROM vouchers v
        LEFT JOIN orders o ON v.Voucher_ID = o.Voucher_ID
        WHERE v.Code = ? AND v.Expiration_Date > NOW()
    `;

    db.query(query, [code], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Lỗi truy vấn cơ sở dữ liệu', err });
        }

        if (results.length === 0) {
            return res.status(400).json({ success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn' });
        }

        const voucher = results[0];

        // Kiểm tra nếu voucher đã được sử dụng
        if (voucher.Used_By) {
            if (voucher.Used_By === userId) {
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

        // Nếu voucher hợp lệ và chưa được sử dụng, trả về discount
        return res.status(200).json({
            success: true,
            message: 'Mã giảm giá hợp lệ',
            discount: voucher.Discount,
        });
    });
};
