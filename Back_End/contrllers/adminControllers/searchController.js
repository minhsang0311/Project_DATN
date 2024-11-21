const db = require('../../config/db');

// API tìm kiếm chung cho admin
exports.generalSearch = (req, res) => {
    const { searchTerm, entityType } = req.query;

    if (!searchTerm) {
        return res.json({ "message": "Vui lòng nhập từ khóa tìm kiếm" });
    }

    // Chuyển đổi searchTerm thành phần tìm kiếm
    const searchPattern = `%${searchTerm}%`;

    let sql = '';
    let params = []; // Tham số truyền vào truy vấn

    // Xây dựng truy vấn tìm kiếm dựa trên `entityType`
    switch (entityType) {
        case 'products':
            sql = `SELECT * FROM Products WHERE Product_Name LIKE ?`;
            params = [searchPattern];
            break;

        case 'categories':
            sql = `SELECT * FROM categories WHERE Category_Name LIKE ?`;
            params = [searchPattern];
            break;

        case 'users':
            sql = `SELECT * FROM users 
                   WHERE User_Name LIKE ? OR Email LIKE ? OR Phone LIKE ? OR Role LIKE ?`;
            params = [searchPattern, searchPattern, searchPattern, searchPattern];
            break;

        case 'orders':
            sql = `SELECT o.*, v.Code FROM orders o
                   LEFT JOIN Vouchers v 
                   ON o.Voucher_ID = v.Voucher_ID
                   WHERE 
                   o.Order_ID LIKE ? 
                   OR v.Code LIKE ?
                   OR o.Status LIKE ?
                   OR Email LIKE ?
                   OR Phone LIKE ?
                   OR User_Name LIKE ?
                   OR Address LIKE ?
                   OR payment_method LIKE ?
                   OR created_at LIKE ?
                   `;
            params = [searchPattern, searchPattern, searchPattern, searchPattern, 
                    searchPattern, searchPattern, searchPattern, searchPattern, searchPattern];
            break;

        case 'comments':
            sql = ``
        default:
            return res.json({ "message": "Loại đối tượng không hợp lệ" });
    }

    // Thực thi truy vấn tìm kiếm
    db.query(sql, params, (err, data) => {
        if (err) return res.json({ "message": "Lỗi tìm kiếm", err });
        res.json(data); // Trả về kết quả tìm kiếm
    });
};
