const db = require('../../config/db');
// API tìm kiếm chung cho admin
exports.generalSearch = (req, res) => {
    const { searchTerm, entityType } = req.query;
  
    let sql = '';
    let params = [];
  
    switch (entityType) {
      case 'products':
        sql = `SELECT * FROM Products WHERE Product_Name LIKE ? OR Price LIKE ?`;
        params = [`%${searchTerm}%`, `%${searchTerm}%`];
        break;
      case 'categories':
        sql = `SELECT * FROM categories WHERE Categoyr_Name LIKE ? OR Show_Hidden LIKE ?`;
        params = [`%${searchTerm}%`, `%${searchTerm}%`];
        break;
      case 'users':
        sql = `SELECT * FROM users WHERE User_Name LIKE ? OR Email LIKE ?`;
        params = [`%${searchTerm}%`, `%${searchTerm}%`];
        break;
      default:
        return res.json({ "message": "Loại đối tượng không hợp lệ" });
    }
  
    db.query(sql, params, (err, data) => {
      if (err) return res.json({ "message": "Lỗi tìm kiếm", err });
      res.json(data);
    });
  };
  