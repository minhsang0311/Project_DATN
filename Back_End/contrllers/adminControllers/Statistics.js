const db = require('../../config/db');

exports.StatisticsProCate = (req, res) => {
    const sqlProCate = `
        SELECT Categories.Category_Name, COUNT(Products.Product_ID) AS totalProCate
        FROM Products
        JOIN Categories ON Products.Category_ID = Categories.Category_ID
        GROUP BY Categories.Category_Name
    `;
    db.query(sqlProCate, (err, results) => {
        if (err) {
            return res.json({ "message": "Lỗi lấy số lượng sản phẩm theo danh mục", err });
        }
        res.json(results);
    });
};

exports.StatisticsProBrand = (req, res) => {
    const sqlProBrand =`
        SELECT Brand.Brand_Name, COUNT(Products.Product_ID) as totalProBrand
        FROM Products
        JOIN Brand ON Products.Brand_ID = Brand.Brand_ID
        GROUP BY Brand.Brand_Name
    `;
    db.query(sqlProBrand, (err, results) => {
        if (err) {
            return res.json({ "message": "Lỗi lấy số lượng sản phẩm theo hãng", err });
        }
        res.json(results);
    })
}