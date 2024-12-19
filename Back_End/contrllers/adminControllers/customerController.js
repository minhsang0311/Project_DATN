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

// Khóa hoặc mở khóa khách hàng
exports.toggleCustomerLock = function(req, res) {
  let id = req.params.id;

  // Kiểm tra xem có đơn hàng nào của khách hàng này không (giả sử có bảng orders liên kết)
  let checkSql = `SELECT COUNT(*) AS count FROM orders WHERE User_ID = ?`;
  db.query(checkSql, id, (err, results) => {
    if (err) {
      return res.json({ "thongbao": "Lỗi khi kiểm tra đơn hàng", err });
    }

    // Nếu có đơn hàng của khách hàng, không cho phép khóa
    if (results[0].count > 0) {
      return res.json({ "thongbao": "Không thể khóa khách hàng vì có đơn hàng liên quan" });
    }

    // Kiểm tra trạng thái khóa hiện tại của người dùng
    let checkLockStatusSql = `SELECT is_locked FROM users WHERE User_ID = ?`;
    db.query(checkLockStatusSql, id, (err, user) => {
      if (err) {
        return res.json({ "thongbao": "Lỗi khi kiểm tra trạng thái khóa", err });
      }

      if (user.length === 0) {
        return res.json({ "thongbao": "Khách hàng không tồn tại" });
      }

      // Nếu người dùng chưa bị khóa, tiến hành khóa
      let newLockStatus = user[0].is_locked ? 0 : 1;
      let updateSql = `UPDATE users SET is_locked = ? WHERE User_ID = ?`;
      db.query(updateSql, [newLockStatus, id], (err, data) => {
        if (err) {
          res.json({ "thongbao": "Lỗi khi thay đổi trạng thái khóa", err });
        } else {
          let lockStatus = newLockStatus ? "khóa" : "mở khóa";
          res.json({ "thongbao": `Đã ${lockStatus} khách hàng thành công` });
        }
      });
    });
  });
};



