const db = require('../../config/db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
exports.forgotPassword = (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(20).toString('hex');
    const expiry = Date.now() + 3600000; // Token có hiệu lực trong 1 giờ

    // Kiểm tra xem email có tồn tại không
    const checkEmailQuery = 'SELECT * FROM user WHERE Email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        console.log("results", results)
        if (err) return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu' });
        if (results.length === 0) return res.status(404).json({ message: 'Email không tồn tại' });

        // Nếu email tồn tại, cập nhật token và token expiry
        const updateQuery = 'UPDATE user SET resetToken = ?, resetTokenExpiry = ? WHERE Email = ?';
        db.query(updateQuery, [token, expiry, email], (err, result) => {
            console.log("result", result)
            if (err) return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu' });

            // Gửi email đặt lại mật khẩu
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
                console.log("info", info)
                if (error) return res.status(500).json({ message: 'Không thể gửi email' , error});
                res.json({ message: 'Email đặt lại mật khẩu đã được gửi' });
            });
        });
    });
};

const bcrypt = require('bcrypt'); // Thêm bcrypt để mã hóa mật khẩu

exports.resetPassword = (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Tìm user có token hợp lệ
    const query = 'SELECT * FROM user WHERE resetToken = ? AND resetTokenExpiry > ?';
    db.query(query, [token, Date.now()], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu khi tìm user.', error: err });
        if (results.length === 0) return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });

        try {
            // Mã hóa mật khẩu mới
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Cập nhật mật khẩu
            const updateQuery = 'UPDATE user SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE User_ID = ?';
            console.log("resultreset", results)
            db.query(updateQuery, [hashedPassword, results[0].User_ID], (error, result) => {
                if (error) return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu khi cập nhật mật khẩu.', error: error });
                
                res.json({ message: 'Mật khẩu đã được đặt lại thành công' });
            });
        } catch (hashError) {
            res.status(500).json({ message: 'Lỗi khi mã hóa mật khẩu.', error: hashError });
        }
    });
};

