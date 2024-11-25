const db = require('../../config/db');

// Lấy danh sách tất cả người dùng
exports.getAllCustomers = (req, res) => {
    let sql = `SELECT * FROM users`;
    db.query(sql, (err, data) => {
        if (err) {
            res.status(500).json({ "thongbao": "Lỗi lấy danh sách người dùng", err });
        } else {
            res.json(data);
        }
    });
};

// Thêm người dùng mới
exports.postCustomer = (req, res) => {
    let data = req.body;  
    
    let sql = 'INSERT INTO users SET ?';  

    db.query(sql, data, (err, result) => {
        if (err) {           
            res.status(500).json({ "thongbao": "Lỗi thêm người dùng", err });
        } else {
            res.status(200).json({ "thongbao": "Đã thêm người dùng mới", "id": result.insertId });
        }
    });
};

// Lấy chi tiết một khách hàng cụ thể
exports.getCustomerDetail = (req, res) => {
    let id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        res.json({ "message": "Không tìm thấy khách hàng", "id": id });
        return;
    }
    let sql = `SELECT User_ID, User_Name, Email, Phone, Role FROM users WHERE User_ID = ?`;
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "message": "Lỗi lấy chi tiết khách hàng", err });
        else res.json(data[0]);
    });
};

// Cập nhật thông tin khách hàng
exports.putCustomer = (req, res) => {
    let data = req.body;
    let id = req.params.id;
    let sql = `UPDATE users SET ? WHERE User_ID=?`;
    db.query(sql, [data, id], (err, result) => {
        if (err) {
            res.json({ "message": "Lỗi cập nhật khách hàng", err });
        } else {
            res.json({ "message": "Đã cập nhật khách hàng thành công" });
        }
    });
};

// Xóa một khách hàng
exports.deleteCustomer = (req, res) => {
    let id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        res.json({ "message": "Không tìm thấy khách hàng", "id": id });
        return;
    }
    let sql = `DELETE FROM users WHERE User_ID = ?`;
    db.query(sql, id, (err, result) => {
        if (err) {
            res.status(500).json({ "message": "Lỗi xóa khách hàng", err });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ "message": "Khách hàng không tồn tại" });
        } else {
            res.json({ "message": "Đã xóa khách hàng thành công" });
        }
    });
};


