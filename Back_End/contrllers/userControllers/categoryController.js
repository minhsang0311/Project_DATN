const db = require('../../config/db');

exports.getAllcategory = function(req, res) {
    db.query(`SELECT Category_ID , Category_Name FROM categories`,(err, data)=>{
    if (err) res.json({"thongbao":"Lỗi lay loai", err })
    else res.json(data);
    });
  };
exports.getAllcategoryID =  function(req, res) {
    let Category_ID = parseInt(req.params.Category_ID);      
    if ( isNaN(Category_ID) || Category_ID <= 0) { 
      res.json({"thong bao":"Không biết Loại", "ca": id_loai});  return; 
    } 
    let sql = `SELECT Category_ID, Category_Name FROM categories WHERE Category_ID = ?` 
    db.query( sql , Category_ID,  (err, data) => {
      if (err) res.json({"thongbao":"Lỗi lấy loai", err })
      else res.json(data[0]);
     });   
  };

