const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Đảm bảo đây là `mysql2/promise`
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

// Hàm đăng ký người dùng
exports.register = async (req, res) => {
    const { User_Name, Email, Password, Phone } = req.body;
    if (!User_Name || !Password || !Email || !Phone) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
    }
    try {
        // Gọi db.query và kiểm tra giá trị trả về
        const results = await db.query("SELECT * FROM user WHERE User_Name = ?", [User_Name]);
        console.log("results, ", results)
        // Nếu results là một đối tượng, có thể bạn cần truy cập một thuộc tính nào đó để lấy dữ liệu
        // Ví dụ, nếu kết quả có dạng { results: [...] }, bạn có thể sử dụng results.results
        if (results.length > 0) {
            return res.status(400).json({ message: 'Username đã tồn tại.' });
        }

        const hashedPassword = await bcrypt.hash(Password, saltRounds);
        const insertResult = await db.query("INSERT INTO user (User_Name, Email, Password, Phone) VALUES (?, ?, ?, ?)", 
                                             [User_Name, Email, hashedPassword, Phone]);
        return res.status(201).json({ message: 'Tạo tài khoản thành công.' });
    } catch (error) {
        console.error('Lỗi khi tạo tài khoản:', error);
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

        if (user.Role === 1 ) {
            const token = jwt.sign(
                { 
                    userId: user.User_ID, 
                    username: user.User_Name, 
                    role: user.Role 
                },
                // PRIVATE_KEY,
                secret,
                { 
                    expiresIn: '3h' 
                }
            );

            return res.status(200).json({
                message: 'Đăng nhập thành công với quyền admin.',
                token: token, // Trả về token nếu là admin
                expiresIn: "3 giờ",
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