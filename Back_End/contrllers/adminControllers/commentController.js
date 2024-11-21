const db = require('../../config/db');

exports.getAllreviews = function(req, res){
    let sql = `SELECT * FROM reviews`;
    db.query(sql, (err, data)=>{
      if(err) res.json({"thongbao": "Lỗi lấy bình luận", err})
        else res.json(data);
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
  