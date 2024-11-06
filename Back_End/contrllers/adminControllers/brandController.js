const db = require('../../config/db');

exports.getAllBrands = (req, res) => {
    let sql = 'SELECT * FROM Brand';
    
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi lấy hãng", error: err });
        }
        res.json(data);
    });
};
