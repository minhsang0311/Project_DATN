const db = require('../../config/db');
const nodemailer = require('nodemailer');

exports.sendContactEmail = (req, res) => {
    const { name, email, message } = req.body;

    // Kiểm tra xem email có tồn tại trong bảng user không
    const checkEmailQuery = 'SELECT * FROM users WHERE Email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu' });
        if (results.length === 0) return res.status(404).json({ message: 'Email không tồn tại' });

        // Nếu email tồn tại, cấu hình để gửi email đến địa chỉ cố định
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'minhsangg0311@gmail.com',
                pass: 'txpm bdcg qbuj evhi',
            },
        });

        const mailOptions = {
            from: email,
            to: 'minhsangg0311@gmail.com', // Email cố định nhận thông báo
            subject: `Yêu cầu liên hệ của ${name}`,
            text: `Bạn nhận được yêu cầu liên hệ từ:\n\nTên người gửi: ${name}\nEmail: ${email}\nTin nhắn: ${message}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Không thể gửi email', error });
            }
            // res.json({ message: 'Yêu cầu liên hệ của bạn đã được gửi thành công' });
        });
    });
};
