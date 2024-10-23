const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const saltRounds = 10;
const fs = require('fs');
const PRIVATE_KEY = fs.readFileSync('private-key.txt');
const secret = 'sangnm';

exports.register = async (req, res) => {
    const { User_Name, Email, Password, Phone } = req.body;
    if (!User_Name || !Password || !Email || !Phone) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
    }
    try {
        let checkUserSql = `SELECT * FROM user WHERE User_Name = ?`;
        db.query(checkUserSql, User_Name, async (err, results) => {
            if (results.length > 0) {
                return res.status(400).json({ message: 'Username đã tồn tại.' });
            }
            const hashedPassword = await bcrypt.hash(Password, saltRounds);
            let insertUserSql = `INSERT INTO User (User_Name, Email, Password, Phone) VALUES (?, ?, ?, ?)`;
            db.query(insertUserSql, [User_Name, Email, hashedPassword, Phone], (err, result) => {
                if (err) return res.status(500).json({ message: 'Lỗi tạo tài khoản', err });
                return res.status(201).json({ message: 'Tạo tài khoản thành công.' });
            });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi máy chủ.', error });
    }
};

exports.login = (req, res) => {
    const { User_Name, Password } = req.body;
    if (!User_Name || !Password) {
        return res.status(400).json({ message: 'Vui lòng cung cấp username và password.' });
    }

    // Truy vấn để lấy thông tin người dùng theo User_Name
    let findUserSql = `SELECT * FROM User WHERE User_Name = ?`;
    db.query(findUserSql, [User_Name], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Có lỗi xảy ra khi truy vấn cơ sở dữ liệu.' });
        }

        if (!results || results.length === 0) {
            return res.status(400).json({ message: 'Username hoặc password không đúng.' });
        }

        const user = results[0];
        const match = await bcrypt.compare(Password, user.Password); // So sánh mật khẩu
        if (!match) {
            return res.status(400).json({ message: 'Username hoặc password không đúng.' });
        }

        // Kiểm tra vai trò của người dùng
        if (user.Role === 1 ) {
            // Nếu là admin, tạo token
            const token = jwt.sign(
                { 
                    userId: user.User_ID, 
                    username: user.User_Name, 
                    role: user.Role 
                },
                secret,
                { 
                    expiresIn: '2h' 
                }
            );

            return res.status(200).json({
                message: 'Đăng nhập thành công với quyền admin.',
                token: token, // Trả về token nếu là admin
                expiresIn: 7200,
                userInfo: { 
                    id: user.User_ID, 
                    username: user.User_Name,
                    role: user.Role 
                }
            });
        } else {
            // Nếu là người dùng bình thường, không tạo token
            return res.status(200).json({
                message: 'Đăng nhập thành công.',
                userInfo: { 
                    id: user.User_ID, 
                    username: user.User_Name, 
                    role: user.Role 
                }
            });
        }
    });
};

