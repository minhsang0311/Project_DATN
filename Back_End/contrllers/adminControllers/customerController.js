const db = require('../../config/db');

// Lấy danh sách tất cả người dùng
exports.getAllCustomers = function(req, res) {
  let sql = `SELECT * FROM users`;
  db.query(sql, (err, data) => {
    if (err) {
      res.json({ "thongbao": "Lỗi lấy danh sách người dùng", err });
    } else {
      res.json(data);
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

// Thêm người dùng mới
exports.postCustomer = (req, res) => {
  let data = req.body;
  let sql = 'INSERT INTO users SET ?';
  db.query(sql, data, (err, result) => {
    if (err) {
      res.json({ "thongbao": "Lỗi thêm người dùng", err });
    } else {
      res.json({ "thongbao": "Đã thêm người dùng mới", "id": result.insertId });
    }
  });
};

// Cập nhật thông tin khách hàng
exports.putCustomer = function(req, res) {
  let data = req.body;
  let id = req.params.id;
  let sql = `UPDATE users SET ? WHERE User_ID = ?`;
  db.query(sql, [data, id], (err, result) => {
    if (err) {
      res.json({ "message": "Lỗi cập nhật khách hàng", err });
    } else {
      res.json({ "message": "Đã cập nhật khách hàng thành công" });
    }
  });
};

// Xóa một khách hàng
exports.deleteCustomer = function(req, res) {
  let id = req.params.id;

  // Kiểm tra xem có đơn hàng nào của khách hàng này không (giả sử có bảng orders liên kết)
  let checkSql = `SELECT COUNT(*) AS count FROM orders WHERE User_ID = ?`;
  db.query(checkSql, id, (err, results) => {
    if (err) {
      return res.json({ "thongbao": "Lỗi khi kiểm tra đơn hàng", err });
    }

    // Nếu có đơn hàng của khách hàng, không cho phép xóa
    if (results[0].count > 0) {
      return res.json({ "thongbao": "Không thể xóa khách hàng vì có đơn hàng liên quan" });
    }

    // Nếu không có đơn hàng, tiến hành xóa
    let sql = `DELETE FROM users WHERE User_ID = ?`;
    db.query(sql, id, (err, data) => {
      if (err) {
        res.json({ "thongbao": "Lỗi xóa khách hàng", err });
      } else {
        res.json({ "thongbao": "Đã xóa khách hàng thành công" });
      }
    });
  });
};



