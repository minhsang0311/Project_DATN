const db = require('../../config/db');



exports.getOrderList = (req, res) => {
  const sql = `
      SELECT o.Order_ID, o.User_ID, o.Email, o.Phone, o.User_Name, o.Address, 
             o.payment_method, o.total_amount, o.created_at,  
             o.total_quantity, os.Status_Name AS Status 
      FROM orders o
      JOIN order_status os ON o.Status = os.Status_ID
  `;
  db.query(sql, (err, data) => {
      if (err) {
          return res.status(500).json({ message: "Lỗi lấy trạng thái đơn hàng", err });
      }
      res.json(data);
  });
};
    
exports.putOrder = (req, res) => {
  const orderId = req.params.id;
  const { Status } = req.body; // Nhận trạng thái từ body

  // Cập nhật trạng thái đơn hàng trong cơ sở dữ liệu
  const sql = 'UPDATE orders SET Status = ? WHERE Order_ID = ?';
  db.query(sql, [Status, orderId], (err, result) => {
      if (err) {
          return res.status(500).json({ message: 'Lỗi cập nhật trạng thái đơn hàng', err });
      }
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
      }
      res.json({ message: 'Cập nhật trạng thái thành công' });
  });
};