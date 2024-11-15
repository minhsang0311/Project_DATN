const db = require('../../config/db');

// API tìm kiếm chung cho admin
exports.generalSearch = (req, res) => {
    const { searchTerm, entityType } = req.query;

    if (!searchTerm) {
        return res.json({ "message": "Vui lòng nhập từ khóa tìm kiếm" });
    }

    // Chuyển đổi searchTerm thành phần tìm kiếm
    const searchPattern = `%${searchTerm}%`;  // Tìm kiếm theo cả chuỗi nhập vào

    let sql = '';
    let params = [searchPattern, searchPattern];  // Dùng cho tất cả các trường có thể tìm kiếm

    // Xây dựng truy vấn tìm kiếm dựa trên `entityType`
    switch (entityType) {
        case 'products':
            sql = `SELECT * FROM Products WHERE Product_Name LIKE ?`;
            break;
        case 'categories':
            sql = `SELECT * FROM categories WHERE Category_Name LIKE ? OR Show_Hidden LIKE ?`;
            break;
        case 'users':
            sql = `SELECT * FROM users WHERE User_Name LIKE ? OR Email LIKE ?`;
            break;
        default:
            return res.json({ "message": "Loại đối tượng không hợp lệ" });
    }

    // Thực thi truy vấn tìm kiếm
    db.query(sql, params, (err, data) => {
        if (err) return res.json({ "message": "Lỗi tìm kiếm", err });
        res.json(data); // Trả về kết quả tìm kiếm
    });
};
