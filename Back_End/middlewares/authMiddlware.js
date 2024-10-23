const jwt = require('jsonwebtoken');
const secret = 'sangnm'; // Khóa bí mật của bạn

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header

    if (!token) {
        return res.status(403).json({ message: 'Token không được cung cấp.' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token không hợp lệ.' });
        }
        
        req.user = decoded; // Lưu thông tin người dùng vào req.user
        next(); // Cho phép tiếp tục tới route tiếp theo
    });
};

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 1) { // Kiểm tra vai trò admin
        return res.status(403).json({ message: 'Không có quyền truy cập.' });
    }
    next(); // Cho phép tiếp tục tới route tiếp theo
};

module.exports = {
    authMiddleware,
    adminMiddleware,
};
