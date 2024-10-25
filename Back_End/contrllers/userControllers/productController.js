const db = require('../../config/db');

exports.getAllProducts = (req, res) => {
    let sql = `SELECT * FROM Products`;
    db.query(sql, (err, data) => {
        if (err) return res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        res.json(data);
    });
};
//Route lấy danh sách sản phẩm
exports.getAllProducts = (req, res) => {
    let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden FROM Products`;
    db.query(sql, (err, data) => {  
        if (err) {
            res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        } else {
            res.json(data);
        }
    });
};
exports.getProductsNew = (req, res) => {
    let sql = `SELECT * FROM products ORDER BY Product_ID DESC`;  
    db.query(sql, (err, data) => {
        if (err) {
            res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        } else {
            res.json(data);
        }
    });
};
exports.getAllproductDetail =  function (req, res) {
    let id = parseInt(req.params.id || 0);
    if (isNaN(id) || id <= 0) {
        res.json({ "message": "Không tìm được sản phẩm", "id": id });
        return;
    }
    let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden 
               FROM products WHERE Product_ID = ?`;

    db.query(sql, id, (err, data) => {
        if (err) {
            res.json({ "message": "Lỗi lấy chi tiết một sản phẩm", err });
        } else if (data.length === 0) {
            res.json({ "message": "Sản phẩm không tồn tại", "id": id });
        } else {
            res.json(data[0]);  // Trả về thông tin sản phẩm
        }
    });
};
exports.getAllsan_pham_lien_quan = function(req, res) {
    let id = Number(req.params.id); 
    let limit = Number(req.params.limit); 

    if (isNaN(id) || id <= 0) return res.json({ 'thongbao': 'Sản phẩm không tồn tại' });
    if (isNaN(limit) || limit <= 1) limit = 1;

    // Lấy Category_ID của sản phẩm hiện tại
    let sql1 = `SELECT Category_ID FROM products WHERE Product_ID = ?`; 
    db.query(sql1, id, (err, data) => {
        if (err || data.length === 0) {
            res.json({ 'thongbao': 'Sản phẩm không có' });
            return;
        }

        let Category_ID = data[0].Category_ID;

        // Lấy danh sách các sản phẩm liên quan theo Category_ID, bỏ qua sản phẩm hiện tại
        let sql2 = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views 
                    FROM products 
                    WHERE Show_Hidden = 1 AND Category_ID = ? AND Product_ID <> ? 
                    ORDER BY Price DESC 
                    LIMIT ?`;

        db.query(sql2, [Category_ID, id, limit], (err, relatedProducts) => {
            if (err) {
                res.json({ 'thongbao': 'Lỗi lấy sản phẩm liên quan', err });
            } else {
                res.json(relatedProducts);
            }
        });
    });
};
