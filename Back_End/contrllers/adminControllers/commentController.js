const db = require('../../config/db');

exports.getAllreviews = function (req, res) {
  let sql = `
      SELECT 
          r.Review_ID, 
          r.User_ID, 
          r.Product_ID, 
          r.Ratting, 
          r.Comment, 
          r.User_Name, 
          r.Show_Hidden, 
          p.Product_Name
      FROM 
          reviews r
      INNER JOIN 
          products p 
      ON 
          r.Product_ID = p.Product_ID
  `;

  db.query(sql, (err, data) => {
      if (err) {
          res.json({ "thongbao": "Lỗi lấy bình luận", err });
      } else {
          res.json(data);
      }
  });
};

// Cập nhật trạng thái hiển thị của bình luận
exports.updateReview = (req, res) => {
    const { id } = req.params;
    const { Show_Hidden } = req.body;
    const sql = 'UPDATE reviews SET Show_Hidden = ? WHERE Review_ID = ?';
    db.query(sql, [Show_Hidden, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái hiển thị', error: err });
        }
        res.json({ message: 'Cập nhật trạng thái hiển thị thành công' });
    });
};
  