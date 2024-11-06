const db = require('../../config/db');




exports.getOrderList = (req, res) => {
        let sql = `
                SELECT * 
                FROM \`order\` o 
                JOIN \`order_status\` os ON o.Status = os.Status_ID
        `;
        db.query(sql, (err, data) => {
            if (err) {
                res.json({ "thongbao": "Lỗi lấy trạng thái đơn hàng", err });
            } else {
                res.json(data);
            }
        });
    };
    
exports.putOrder =(req, res) => {
    const orderId = req.params.id;
    const { Status } = req.body; // Nhận trạng thái từ body
  
    // Cập nhật trong cơ sở dữ liệu
    const sql = 'UPDATE `order` SET Status = ? WHERE Order_ID = ?';
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
  