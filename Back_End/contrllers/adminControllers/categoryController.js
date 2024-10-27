const db = require('../../config/db');
// Hiện danh mục
exports.getAllcategory = function(req, res){
    let sql = `SELECT * FROM categories`;
    db.query(sql, (err, data)=>{
      if(err) res.json({"thongbao": "Lỗi lấy loai", err})
        else res.json(data);
    });
  };
  // xóa danh mục
  exports.deletecategory = function (req, res) {
    let id = req.params.id;
    let sql = `DELETE FROM categories WHERE Category_ID=?`;
    db.query(sql, id, (err, data) => {
        if (err) {
            res.json({ "thongbao": "Lỗi xóa loại", err })
        } else {
            res.json({ "thongbao": "Đã xóa loại" })
        }
    })
  };
 //Route thêm danh mục
exports.postCategory = (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO categories SET ?';
        db.query(sql, data, (err, result) => {
          if(err) {
            res.json({ "thongbao": "Lỗi thêm loại", err });
          } else {
            res.json({ "thongbao": "Đã chèn 1 loại", "id": result.insertId });
          }
        });
      };
      
// sửa danh mục
exports.putcategory= function (req, res) {
    let data = req.body;
    let id = req.params.id;
    let sql = `UPDATE categories SET ? WHERE Category_ID=?`;
    db.query(sql, [data, id], (err, d) => {
        if (err) {
            res.json({ "thongbao": "Lỗi cập nhật loai", err })
        } else {
            res.json({ "thongbao": "Đã cập nhật loai" })
        }
    })
  };