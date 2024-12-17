const bcrypt = require('bcrypt');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const saltRounds = 10;
const fs = require('fs');
const PRIVATE_KEY = fs.readFileSync('private-key.txt');
const maxAge = 3 * 60 * 60;
const secret = `MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzuFXnz5wsds5U
v50NXxkHIyCE+oWmoYA9bMMoEBu+bN4NBe+9MtV1CM2TJhY6RposEpfB6NE9YA0o
vJgdlGd3zZaiM8tzjPUDYojQGbg3s6lraUUHTPi3ND7OTaOFj2jlLWR1gmVy4s1V
CUMq/nbQ4OKFDT2WFFTH2Jotbl2cACstf6ZSlHWm5jHcGG88HE5YQw7uzPYv33gg
CX1QM4U0Ht5ot4RzCSwYwocfOEiZ6skfcv/em4xbIXsFI6/+9KLAPS717SlycJJR
vdy4l9vGd/8EFk7IjB/bgb8l/OJ0yEotjsEl5EatK8b/toOIFMuMClxDd0bKdDzo
aQquBJm5AgMBAAECggEASreb63SaUrgP/xbspecAAkId3ntC/mxNYvwpRKoxxqD/
Tj3GFowgR3hh80fV3OOGbEVMl38CIrigr+t8eGu++oVcF1JeRst2/7HC/HV865eD
m5bX7nmXO596bw3DKp9dNk6BYgNUxwc4454msSS65Ati0XsYPCF2v+Ey9ClavKR3
NszbufJ/B4gnje+TYd1dJPcY5XFCSAxLeI9Muw4EAI/HhNQlxfG0ggopEB/teveV
HXyFwRpXYV4WG+/WQnPmiMCmx6w2nR210Q6ICGIGmcAii4WGRMqcapgNMq54BIUt
+nnnXlUBxEPFamTdSc/UOe+IwpmMwMYC2uMKxZli6wKBgQD2pOCW8oPAOYRL09vJ
7N9cP5BDqWGDgoDVSYhqcqpoV+385eqxas5pQSQNURGMg8pKoFuP6XOLG83cnCXO
jZaXfKSsVrD6YFJW7+42qcyD36a+CXietGtQPmLgNNmED1HlHFdMEoWEARWboYYM
hGiweSn68OJ33DsZ/cG6Kr7OSwKBgQC6iZHSPnM2pWcOVY2LYMEI+zeVtLXZtSYK
eBuUHmRN9hoFORWlEBRw8Twe4WE0A6BOyzgMLJI7m1gAieL2/Tm/n1ygXaJlo06M
zEtGxtsGYvmFYgY/9iD6aMSeIgW+AdG3YaxSkVbqAmxgwxxRnPPiRQAHGpISI8Hm
Jp9jQrVliwKBgQDD9UkvBK0iu0/eAwvbyaPIogPXjiqYlsYPL2X/1OyJDFtcE7u8
i/RE8elX3zIHJupBEljM5RjUzBlqDnGHQz0DTJd1CUeBFag1xFjJ+2wu1jGfSN0Z
kpS0Y2yhX7v1zUousq61FP4ZW9c0GEftiAG5O/rbkikMO+CFDPSvGakRMwKBgCw8
r75CXSRaeWQm2dhx65VrrjTslCu7D/hvn2qzAmqSsH0Imp94fsCCFRXlsR2atou5
GeOZNly4bFhEWvTj/Kv66QaG7hpYbipp0HhKdGrBUhdVtdG5VvzLl8VAoEf9OnTY
zvsNyKTaSkVwP+kC5buFTYphvL5ciIFCK45opYgdAoGAdCi0DlLUuoVQXW32Q50E
bz3UR6ztD6EweJb4u7Cyx6G3uSQyN43stuBxdzrFLL3+efQggsq34jQHBLfZEg8v
WilJio5ddYii3EMBNv7eszmEaBrICeaZJtK9cGMbUsra6yAa3bjBCz8FjcFm+ZsS
y/xS/zHy35xFnliUvUP2Hb0=`;

// Hàm gửi email voucher
async function sendVoucherEmail(email, voucherCode, discount, expirationDate) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'minhsangg0311@gmail.com',
            pass: 'txpm bdcg qbuj evhi',
        },
    });

    const mailOptions = {
        from: '"HomeNest" <minhsangg0311@gmail.com>',
        to: email,
        subject: "Mã Khuyến Mãi Dành Cho Bạn!",
        text: `Chào mừng bạn đăng ký thành công tài khoản!
        \nMã: ${voucherCode}
        \nGiảm giá: ${discount}%
        \nHạn sử dụng: ${expirationDate}`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        // Nếu gặp lỗi liên quan đến email không hợp lệ
        if (error.responseCode === 550) {  // Check if it's a known error for invalid email
            throw new Error("Email không hợp lệ hoặc không tồn tại.");
        } else {
            throw new Error("Lỗi khi gửi email. Vui lòng kiểm tra lại thông tin.");
        }
    }
}


// Hàm đăng ký người dùng và gửi voucher
exports.register = async (req, res) => {
    const { User_Name, Email, Password} = req.body;

    if (!User_Name || !Password || !Email) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
    }

    // Kiểm tra tên người dùng hoặc email đã tồn tại
    const results = await db.query(
        "SELECT User_Name, Email FROM users WHERE User_Name = ? OR Email = ?",
        [User_Name, Email]
    );
    if (results && results.length > 0) {
        if (results.some(user => user.User_Name === User_Name)) {
            return res.status(400).json({ message: 'Tên người dùng đã được đăng ký.' });
        }
        if (results.some(user => user.Email === Email)) {
            return res.status(400).json({ message: 'Email đã được đăng ký.' });
        }
    }

    // Kiểm tra mật khẩu và số điện thoại hợp lệ
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(Password)) {
        return res.status(400).json({
            message: 'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.'
        });
    }

    // const phoneRegex = /^0\d{9,10}$/;
    // if (!phoneRegex.test(Phone)) {
    //     return res.status(400).json({
    //         message: 'Số điện thoại phải bắt đầu bằng số 0 và có từ 10 đến 11 chữ số.'
    //     });
    // }

    try {
        // Hash mật khẩu và thêm người dùng mới
        const hashedPassword = await bcrypt.hash(Password, saltRounds);
        const userResult = await db.query(
            "INSERT INTO users (User_Name, Email, Password) VALUES (?, ?, ?)",
            [User_Name, Email, hashedPassword, Phone]
        );

        const newUserId = userResult.insertId; // Lấy ID của người dùng mới tạo

        // Tạo mã khuyến mãi liên kết với người dùng mới
        const voucherCode = crypto.randomBytes(4).toString("hex").toUpperCase();
        const discount = 15;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);

        await db.query(
            "INSERT INTO vouchers (Code, Discount, Expiration_Date, User_ID) VALUES (?, ?, ?, ?)",
            [voucherCode, discount, expirationDate, newUserId]
        );

        // Gửi email mã khuyến mãi
        await sendVoucherEmail(Email, voucherCode, discount, expirationDate.toISOString().split('T')[0]);

        return res.status(201).json({ message: 'Đăng ký thành công! Mã khuyến mãi đã được gửi qua email.' });
    } catch (error) {
        console.error('Lỗi khi tạo tài khoản:', error);
        return res.status(500).json({ message: 'Lỗi máy chủ.', error });
    }
};


exports.login = (req, res) => {
    const { Email, Password } = req.body;
    console.log("Incoming request:", { Email, Password });
    if (!Email || !Password) {
        return res.status(400).json({ message: 'Vui lòng cung cấp email và mật khẩu.' });
    }
    let findUserSql = `SELECT * FROM Users WHERE Email = ?`;
    db.query(findUserSql, [Email], async (err, results) => {
        console.error("Database error:", err);
        if (err) {
            return res.status(500).json({ message: 'Có lỗi xảy ra khi truy vấn cơ sở dữ liệu.' });
        }
        console.log("Database query results:", results);
        if (!results || results.length === 0) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng.' });
        }
        const user = results[0];
        console.log('user', user.Role)
        const match = await bcrypt.compare(Password, user.Password);
        console.log("Password match result:", match);
        if (!match) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng.' });
        }
        if (user.Role === 1) {
            var token = jwt.sign(
                {
                    userId: user.User_ID,
                    username: user.User_Name,
                    role: user.Role
                },
                secret,
                {
                    expiresIn: '3h'
                }
            );
            return res.status(200).json({
                message: 'Đăng nhập thành công với quyền admin.',
                token: token,
                expiresIn: '3h',
                userInfo: {
                    id: user.User_ID,
                    username: user.User_Name,
                    role: user.Role
                }
            });
        }
        if (user.Role === 0) {
            var tokenUser = jwt.sign(
                {
                    userId: user.User_ID,
                    username: user.User_Name,
                    roleUser: user.Role
                },
                secret,
                {
                    expiresIn: '3h'
                }
            );
            console.log('tokenUser', tokenUser)
            return res.status(200).json({
                message: 'Đăng nhập thành công với quyền user.',
                tokenUser: tokenUser,
                expiresIn: '3h',
                userInfo: {
                    id: user.User_ID,
                    username: user.User_Name,
                    role: user.Role
                }
            });
        }
    });
};