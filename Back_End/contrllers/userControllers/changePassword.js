const bcrypt = require('bcrypt');
const db = require('../../config/db'); // Đường dẫn đến cấu hình db
const saltRounds = 10; // Số vòng để băm mật khẩu

exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.decodedData.userId; // Lấy User_ID từ middleware

    // Kiểm tra xem mật khẩu cũ và mới đã được cung cấp chưa
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin." });
    }

    try {
        // Tìm user theo ID từ token
        const results = await db.query("SELECT * FROM users WHERE User_ID = ?", [userId]);
        if (!results || results.length === 0) {
            return res.status(400).json({ message: "Tài khoản không tồn tại." });
        }

        const user = results[0];
        // So sánh mật khẩu cũ
        const match = await bcrypt.compare(oldPassword, user.Password);
        if (!match) {
            return res.status(400).json({ message: "Mật khẩu cũ không đúng." });
        }

        // Hash mật khẩu mới và cập nhật
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        await db.query("UPDATE users SET Password = ? WHERE User_ID = ?", [hashedNewPassword, userId]);

        return res.status(200).json({ message: "Đổi mật khẩu thành công." });
    } catch (error) {
        console.error("Bạn chưa đăng nhập tài khoản", error);
        return res.status(500).json({ message: "Lỗi máy chủ.", error });
    }
};
