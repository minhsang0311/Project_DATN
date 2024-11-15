const db = require('../../config/db');


exports.productNew = (req, res) => {
    let sql = `SELECT * FROM Products ORDER BY Product_ID DESC`;  
    db.query(sql, (err, data) => {
        if (err) {
            res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        } else {
            res.json(data);
        }
    });
}
exports.productMostView =  (req, res) => {
    let sql = `SELECT * FROM Products ORDER BY Views DESC`;  // Sắp xếp theo ID giảm dần
    db.query(sql, (err, data) => {
        if (err) {
            res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        } else {
            res.json(data);
        }
    });
}
exports.productKhuyenMai =  (req, res) => {
    let sql = `SELECT * FROM Products ORDER BY Promotion DESC`;  
    db.query(sql, (err, data) => {
        if (err) {
            res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        } else {
            res.json(data);
        }
    });
}

exports.getAllProducts = (req, res) => {
    let sql = `SELECT * FROM Products`;
    db.query(sql, (err, data) => {
        if (err) return res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        res.json(data);
    });
};




//Route lấy danh sách sản phẩm
exports.getAllProducts_Cuahang = (req, res) => {
    let sql = `SELECT * FROM Products`;
    db.query(sql, (err, data) => {
        if (err) {
            res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        } else {
            res.json(data);
        }
    });
};
// productController.js
exports.getFilteredProducts = (req, res) => {
    const { minPrice, maxPrice, sortOrder, brand } = req.query;

    let sql = `SELECT Product_ID, Category_ID, Brand_ID ,Product_Name, Image, Price, Description, Views, Show_Hidden FROM Products WHERE Show_Hidden = 1`;

    // Thêm điều kiện lọc giá nếu có minPrice và maxPrice
    if (minPrice) {
        sql += ` AND Price >= ${minPrice}`;
    }
    if (maxPrice) {
        sql += ` AND Price <= ${maxPrice}`;
    }

    // Thêm điều kiện lọc theo hãng (brand) nếu có
    if (brand) {
        sql += ` AND Brand_ID = '${brand}'`;
    }

    // Sắp xếp theo giá cao nhất hoặc thấp nhất
    if (sortOrder === 'highToLow') {
        sql += ` ORDER BY Price DESC`;
    } else if (sortOrder === 'lowToHigh') {
        sql += ` ORDER BY Price ASC`;
    }

    db.query(sql, (err, data) => {
        if (err) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm", err });
        } else {
            res.json(data);
        }
    });
};
// productController.js
exports.getAllBrands = (req, res) => {
    const sql = `SELECT Brand_ID, Brand_Name, Brand_Image FROM brand`;
    db.query(sql, (err, data) => {
        if (err) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách thương hiệu", err });
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
exports.getAllproductDetail = function (req, res) {
    let id = parseInt(req.params.id || 0);
    if (isNaN(id) || id <= 0) {
        res.json({ "message": "Không tìm được sản phẩm", "id": id });
        return;
    }

    // Query to get the main product details with the brand name
    let productSql = `
        SELECT p.Product_ID, p.Category_ID, p.Product_Name, p.Image, p.Price, p.Description, p.Promotion,  p.Views, b.Brand_Name
        FROM products p
        JOIN brands b ON p.Brand_ID = b.Brand_ID
        WHERE p.Product_ID = ?
    `;

    // Query to get the product images
    let imagesSql = `SELECT Image_URL FROM product_images WHERE Product_ID = ?`;

    db.query(productSql, id, (err, productData) => {
        if (err) {
            res.json({ "message": "Lỗi lấy chi tiết một sản phẩm", err });
        } else if (productData.length === 0) {
            res.json({ "message": "Sản phẩm không tồn tại", "id": id });
        } else {
            // Fetch product images
            db.query(imagesSql, id, (err, imagesData) => {
                if (err) {
                    res.json({ "message": "Lỗi lấy ảnh sản phẩm", err });
                } else {
                    // Format the response
                    const productDetail = {
                        ...productData[0],
                        images: imagesData.map(image => image.Image_URL)  // Array of image paths
                    };
                    res.json(productDetail);
                }
            });
        }
    });
};



exports.getAllsan_pham_lien_quan = function (req, res) {
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
exports.getAllproductNew = (req, res) => {
    let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden 
               FROM Products 
               ORDER BY Product_ID DESC`;  // Sắp xếp theo ID giảm dần
    db.query(sql, (err, data) => {
        if (err) {
            res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        } else {
            res.json(data);
        }
    });
};
//lấy sản phẩm xem nhiều
exports.getAllproductMostView =  (req, res) => {
    let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden 
               FROM Products 
               ORDER BY Views DESC`;  // Sắp xếp theo ID giảm dần
    db.query(sql, (err, data) => {
        if (err) {
            res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        } else {
            res.json(data);
        }
    });
};
//Route lấy sản phẩm của một loại
exports.getAllProducts =  (req, res) => {
    const { Category_ID } = req.params;
    const sql = 'SELECT * FROM Products WHERE Category_ID = ?';
    db.query(sql, [Category_ID], (err, result) => {
        if (err) return res.json({ message: 'Lỗi lấy sản phẩm', err });
        res.json(result);
    });
};
exports.getAllProducts_Search = (req, res) => {
    const searchQuery = req.query.query; 
    if (!searchQuery) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    const sql = `
      SELECT *
      FROM products 
      WHERE Product_Name LIKE ? `;
    const values = [`%${searchQuery}%`, `%${searchQuery}%`];
    
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
};
