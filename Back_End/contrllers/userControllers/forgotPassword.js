const bcrypt = require('bcrypt');
const db = require('../../config/db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
exports.forgotPassword = (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(20).toString('hex');
    const expiry = Date.now() + 3600000;
    const checkEmailQuery = 'SELECT * FROM users WHERE Email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        console.log("results", results)
        if (err) return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu' });
        if (results.length === 0) return res.status(404).json({ message: 'Email không tồn tại' });
        const updateQuery = 'UPDATE users SET resetToken = ?, resetTokenExpiry = ? WHERE Email = ?';
        db.query(updateQuery, [token, expiry, email], (err, result) => {
            if (err) return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu' });
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.PASS_EMAIL,
                },
            });
            const mailOptions = {
                from: process.env.USER_EMAIL,
                to: email,
                subject: 'Yêu cầu đặt lại mật khẩu',
                text: `Click vào link để đặt lại mật khẩu của bạn: http://localhost:4200/reset-password/${token}`,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) return res.status(500).json({ message: 'Không thể gửi email', error });
                res.json({ message_success: 'Email đặt lại mật khẩu đã được gửi' });
            });
        });
    });
};

exports.resetPassword = (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    const query = 'SELECT * FROM users WHERE resetToken = ? AND resetTokenExpiry > ?';
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    db.query(query, [token, Date.now()], async (err, results) => {
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                message: "Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
            });
        }
        console.log(results)
        if (err) return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu khi tìm user.', error: err });
        if (results.length === 0) return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updateQuery = 'UPDATE users SET Password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE User_ID = ?';
            db.query(updateQuery, [hashedPassword, results[0].User_ID], (error, result) => {
                console.log(error)
                console.log(results[0].User_ID)
                console.log("result", result)
                if (error) return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu khi cập nhật mật khẩu.', error: error });
                res.json({ message: 'Mật khẩu đã được đặt lại thành công' });
            });
        } catch (hashError) {
            res.status(500).json({ message: 'Lỗi khi mã hóa mật khẩu.', error: hashError });
        }
    });
};

