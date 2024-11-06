const bcrypt = require('bcrypt');
const db = require('../../config/db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
exports.forgotPassword = (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(20).toString('hex');
    const expiry = Date.now() + 3600000; 
    const checkEmailQuery = 'SELECT * FROM user WHERE Email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu' });
        if (results.length === 0) return res.status(404).json({ message: 'Email không tồn tại' });
        const updateQuery = 'UPDATE user SET resetToken = ?, resetTokenExpiry = ? WHERE Email = ?';
        db.query(updateQuery, [token, expiry, email], (err, result) => {
            if (err) return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu' });
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'minhsangg0311@gmail.com',
                    pass: 'txpm bdcg qbuj evhi',
                },
            });
            const mailOptions = {
                from: 'minhsangg0311@gmail.com',
                to: email,
                subject: 'Yêu cầu đặt lại mật khẩu',
                text: `Click vào link để đặt lại mật khẩu của bạn: http://localhost:4200/reset-password/${token}`,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) return res.status(500).json({ message: 'Không thể gửi email' , error});
                res.json({ message: 'Email đặt lại mật khẩu đã được gửi' });
            });
        });
    });
};

exports.resetPassword = (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    const query = 'SELECT * FROM user WHERE resetToken = ? AND resetTokenExpiry > ?';
    db.query(query, [token, Date.now()], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu khi tìm user.', error: err });
        if (results.length === 0) return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updateQuery = 'UPDATE user SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE User_ID = ?';
            db.query(updateQuery, [hashedPassword, results[0].User_ID], (error, result) => {
                if (error) return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu khi cập nhật mật khẩu.', error: error });
                res.json({ message: 'Mật khẩu đã được đặt lại thành công' });
            });
        } catch (hashError) {
            res.status(500).json({ message: 'Lỗi khi mã hóa mật khẩu.', error: hashError });
        }
    });
};

