const db = require('../../config/db');

exports.getAllreviews = function(req, res){
    let sql = `SELECT * FROM reviews`;
    db.query(sql, (err, data)=>{
      if(err) res.json({"thongbao": "Lỗi lấy bình luận", err})
        else res.json(data);
    });
  };
// Sửa một bình luận
exports.putreviews = (req, res) => {
    const reviewId = req.params.id;
    const { Ratting, Comment, Show_Hidden } = req.body;
    
    const sql = 'UPDATE reviews SET Ratting = ?, Comment = ?, Show_Hidden = ? WHERE Review_ID = ?';
    
    db.query(sql, [Ratting, Comment, Show_Hidden, reviewId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi sửa bình luận', error: err });
        }
        res.json({ message: 'Sửa bình luận thành công' });
    });
};

