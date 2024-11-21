const db = require('../../config/db');

exports.CheckVoucher = (req, res) => {
    const { code } = req.body;
    // Truy vấn cơ sở dữ liệu để kiểm tra voucher
    db.query('SELECT * FROM Vouchers WHERE Code = ? AND Expiration_Date > NOW()', [code], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Lỗi truy vấn cơ sở dữ liệu', err });
        }

        if (results.length === 0) {
            return res.status(400).json({ success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn' });
        }

        // Voucher hợp lệ, trả về thông tin voucher
        const voucher = results[0];
        return res.status(200).json({
            success: true,
            message: 'Mã giảm giá hợp lệ',
            discount: voucher.Discount,
        });
    });
};