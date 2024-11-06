const db = require('../../config/db');
// Hiện danh mục
exports.getAllcategory = function(req, res){
    let sql = `SELECT * FROM categories`;
    db.query(sql, (err, data)=>{
      if(err) res.json({"thongbao": "Lỗi lấy loai", err})
        else res.json(data);
    });
  };
  //Route lấy chi tiết một danh mục
exports.getCategoryDetail = (req, res) => {
  let id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
      res.json({ "message": "Không tìm được danh mục", "id": id });
      return;
  }
  let sql = `SELECT  Category_ID, Category_Name,  Show_Hidden 
              FROM categories WHERE Category_ID = ?`
  db.query(sql, id, (err, data) => {
      if (err) res.json({ "message": "Lỗi lấy chi tiết một danh mục", err })
      else res.json(data[0]);
  });
}
exports.deletecategory = function (req, res) {
  let id = req.params.id;

  // Kiểm tra xem có sản phẩm nào thuộc danh mục này không
  let checkSql = `SELECT COUNT(*) AS count FROM products WHERE Category_ID=?`;
  db.query(checkSql, id, (err, results) => {
      if (err) {
          return res.json({ "thongbao": "Lỗi khi kiểm tra", err });
      }

      // Nếu có sản phẩm trong danh mục, không cho phép xóa
      if (results[0].count > 0) {
          return res.json({ "thongbao": "Không thể xóa danh mục vì có sản phẩm trong danh mục này!" });
      }

      // Nếu không có sản phẩm, tiến hành xóa
      let sql = `DELETE FROM categories WHERE Category_ID=?`;
      db.query(sql, id, (err, data) => {
          if (err) {
              res.json({ "thongbao": "Lỗi xóa loại", err });
          } else {
              res.json({ "thongbao": "Đã xóa loại" });
          }
      });
  });
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