const db = require('../../config/db');

exports.Statistics = (req, res) => {
    let totalProductsSql = `SELECT COUNT(*) AS totalProducts FROM Products`;
    let totalCategoriesSql = `SELECT COUNT(*) AS totalCategories FROM Categories`;
    let totalViewsSql = `SELECT SUM(Views) AS totalViews FROM Products`;

    db.query(totalProductsSql, (err, productData) => {
        if (err) return res.json({ "message": "Lỗi lấy tổng số sản phẩm", err });
        
        db.query(totalCategoriesSql, (err, categoryData) => {
            if (err) return res.json({ "message": "Lỗi lấy tổng số danh mục", err });

            db.query(totalViewsSql, (err, viewData) => {
                if (err) return res.json({ "message": "Lỗi lấy tổng lượt xem", err });

                res.json({
                    totalProducts: productData[0].totalProducts,
                    totalCategories: categoryData[0].totalCategories,
                    totalViews: viewData[0].totalViews
                });
            });
        });
    });
}