const db = require('../../config/db');

exports.getAllbrand = function(req, res) {
    db.query(`SELECT * FROM brands`,(err, data)=>{
    if (err) res.json({"thongbao":"Lỗi lay loai", err })
    else res.json(data);
    });
  };

exports.getAllbrandID =  function(req, res) {
    let Brand_ID = parseInt(req.params.Brand_ID);      
    if ( isNaN(Brand_ID) || Brand_ID <= 0) { 
      res.json({"thong bao":"Không biết hãng", "ca": id_Brand});  return; 
    } 
    let sql = `SELECT Brand_ID, Brand_Name FROM brands WHERE Brand_ID = ?` 
    db.query( sql , Brand_ID,  (err, data) => {
      if (err) res.json({"thongbao":"Lỗi lấy loai", err })
      else res.json(data[0]);
     });   
  };

