const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const saltRounds = 10;
const secret = 'sangnm';

exports.register = async (req, res) => {
    const { User_Name, Email, Password, Phone } = req.body;
    if (!User_Name || !Password || !Email || !Phone) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
    }
    try {
        let checkUserSql = `SELECT * FROM Users WHERE User_Name = ?`;
        db.query(checkUserSql, User_Name, async (err, results) => {
            if (results.length > 0) {
                return res.status(400).json({ message: 'Username đã tồn tại.' });
            }
            const hashedPassword = await bcrypt.hash(Password, saltRounds);
            let insertUserSql = `INSERT INTO Users (User_Name, Email, Password, Phone) VALUES (?, ?, ?, ?)`;
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
    let findUserSql = `SELECT * FROM Users WHERE User_Name = ?`;
    db.query(findUserSql, User_Name, async (err, results) => {
        if (results.length === 0) return res.status(400).json({ message: 'Username hoặc password không đúng.' });
        const user = results[0];
        const match = await bcrypt.compare(Password, user.Password);
        if (!match) return res.status(400).json({ message: 'Username hoặc password không đúng.' });
        const token = jwt.sign({ userId: user.User_ID, username: user.User_Name }, secret, { expiresIn: '3h' });
        return res.status(200).json({ message: 'Đăng nhập thành công.', token });
    });
};
