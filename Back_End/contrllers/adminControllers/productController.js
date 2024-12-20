const db = require('../../config/db');
// const removeDiacritics = require('diacritics').remove;

exports.getAllProducts = (req, res) => {
    let sql = `SELECT 
    products.*,
    brands.Brand_Name AS brand_name,
    categories.Category_Name AS category_name
FROM 
    products
JOIN 
    brands ON products.Brand_ID = brands.Brand_ID
JOIN 
    categories ON products.Category_ID = categories.Category_ID;`;
    db.query(sql, (err, data) => {
        if (err) return res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        res.json(data);
    });
};
//Route lấy chi tiết một sản phẩm 
exports.getProductDetail = (req, res) => {
    let id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        res.json({ "message": "Không tìm được sản phẩm", "id": id });
        return;
    }
    let sql = `SELECT Product_ID, Category_ID,Brand_ID, Product_Name, Image, Price, Promotion, Description, Views, Show_Hidden 
                FROM products WHERE Product_ID = ?`
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "message": "Lỗi lấy chi tiết một sản phẩm", err })
        else res.json(data[0]);
    });
}
//Lấy chi tiết hình ảnh từ bảng product_images
exports.getProductImageDetail = (req, res) => {
    let id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.json({ "message": "Không tìm được chi tiết hình ảnh sản phẩm", "id": id });
    }
    let sql = `SELECT * FROM product_images WHERE Product_ID = ?`;
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ "message": "Lỗi lấy hình ảnh chi tiết một sản phẩm", err });
        } else {
            res.json(data);
        }

    });
};

//Route thêm sản phẩm
exports.postProduct = (req, res) => {
    if (!req.files || !req.files.Image || req.files.Image.length === 0) {
        console.error("Không tìm thấy file chính");
        return res.status(400).json({ message: "Không tìm thấy file chính" });
    }

    let data = req.body;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const mainImagePath = `${baseUrl}/uploads/${req.files.Image[0].filename}`;
    data.Image = mainImagePath;

    // Chuyển đổi Show_Hidden thành số
    data.Show_Hidden = data.Show_Hidden === 'true' || data.Show_Hidden == 1 ? 1 : 0;

    // SQL thêm sản phẩm chính
    const sql = `INSERT INTO products SET ?`;
    db.query(sql, data, (err, result) => {
        if (err) {
            console.error("Lỗi thêm sản phẩm:", err);
            return res.status(500).json({ message: 'Lỗi thêm sản phẩm', err });
        }

        const productId = result.insertId;

        // Xử lý ảnh bổ sung
        const additionalImages = req.files.additionalImages || [];
        if (additionalImages.length > 10) {
            return res.status(400).json({ message: 'Bạn không thể thêm quá 10 ảnh bổ sung' });
        }

        if (additionalImages.length > 0) {
            const imageRecords = additionalImages.map(file => ({
                Product_ID: productId,
                Image_URL: `${baseUrl}/uploads/${file.filename}`
            }));

            const imageSql = `INSERT INTO product_images (Product_ID, Image_URL) VALUES ?`;
            const values = imageRecords.map(record => [record.Product_ID, record.Image_URL]);

            db.query(imageSql, [values], (err) => {
                if (err) {
                    console.error("Lỗi thêm ảnh bổ sung:", err);
                    return res.status(500).json({ message: 'Lỗi thêm ảnh bổ sung', err });
                }
                res.json({ message: 'Đã thêm sản phẩm và ảnh bổ sung thành công' });
            });
        } else {
            res.json({ message: 'Đã thêm sản phẩm thành công' });
        }
    });
};

// //Route cập nhật sản phẩm
exports.putProduct = (req, res) => {
    const data = req.body;
    const productId = req.params.id;
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // Xử lý ảnh chính (nếu có)
    if (req.files && req.files.Image) {
        const imagePath = `${baseUrl}/uploads/${req.files.Image[0].filename}`;
        data.Image = imagePath;
    }

    // Cập nhật thông tin sản phẩm
    const updateProductSql = "UPDATE products SET ? WHERE Product_ID=?";
    db.query(updateProductSql, [data, productId], (err) => {
        if (err) {
            console.error("Lỗi cập nhật sản phẩm:", err);
            return res.status(500).json({ message: "Lỗi cập nhật sản phẩm", error: err });
        }

        // Cập nhật ảnh bổ sung mới (nếu có)
        // Cập nhật ảnh bổ sung mới (nếu có)
        if (req.files && req.files.additionalImages) {
            const insertImageSql = "INSERT INTO product_images (Product_ID, Image_URL) VALUES ?";
            const additionalImages = req.files.additionalImages.map((file) => [
                productId,
                `${baseUrl}/uploads/${file.filename}`,
            ]);

            db.query(insertImageSql, [additionalImages], (imgErr) => {
                if (imgErr) {
                    console.error("Lỗi thêm ảnh bổ sung:", imgErr);
                    return res.status(500).json({
                        message: "Cập nhật sản phẩm thành công nhưng lỗi thêm ảnh bổ sung",
                        error: imgErr,
                    });
                }
                res.json({ message: "Đã cập nhật sản phẩm và ảnh bổ sung thành công" });
            });
        } else {
            res.json({ message: "Đã cập nhật sản phẩm thành công nhưng không có ảnh bổ sung mới" });
        }

    });
};


// Route xóa một sản phẩm
exports.deleteProduct = (req, res) => {
    let id = req.params.id;
    let checkOrderDetailSql = `SELECT COUNT(*) AS count FROM order_details WHERE Product_ID = ?`;
    db.query(checkOrderDetailSql, id, (err, result) => {
        if (err) {
            return res.json({ "message": "Lỗi kiểm tra đơn hàng chi tiết", err });
        }
        // Nếu sản phẩm đã tồn tại trong orderDetail, thông báo không thể xóa
        if (result[0].count > 0) {
            return res.status(400).json({ message: "Không thể xóa sản phẩm vì đã tồn tại trong đơn hàng chi tiết." });
        }
        let checkWishlist = `SELECT COUNT(*) AS wishlist FROM wishlist WHERE Product_ID = ?`
        db.query(checkWishlist, id, (err, result) => {
            console.log(result)
            if (err) {
                return res.json({ message: "Lỗi kiểm tra danh sách yêu thích", err });
            }
            // Nếu sản phẩm đã tồn tại trong danh sách yêu thích, thông báo không thể xóa
            if (result[0].wishlist > 0) {
                return res.status(400).json({ message: "Không thể xóa sản phẩm vì đã tồn tại trong danh sách yêu thích." });
            }
        })
        let deleteSql = `DELETE FROM products WHERE Product_ID=?`;
        db.query(deleteSql, id, (err, data) => {
            if (err) {
                res.json({ "message": "Lỗi xóa sản phẩm", err });
            } else {
                res.json({ message: "Đã xóa sản phẩm ", "id": id });
            }
        });
    });
};
//Route xóa hình ảnh chi tiết của sản phẩm
exports.deleteProductImageDetail = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.json({ message: "ID ảnh không hợp lệ", id });
    }

    const sql = `DELETE FROM product_images WHERE Image_ID = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.json({ message: "Lỗi xóa ảnh bổ sung", err });
        } else {
            res.json({ message: "Xóa thành công" });
        }
    });
};

// Route tìm kiếm theo sản phẩm
exports.searchProducts = (req, res) => {
    const keyword = req.query.q;
    if (!keyword) {
        return res.status(400).json({ message: "Vui lòng cung cấp từ khóa tìm kiếm." });
    }

    const sql = `SELECT * FROM products WHERE Product_Name LIKE ?`;
    db.query(sql, [`%${keyword}%`], (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Lỗi khi tìm kiếm sản phẩm", err });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm nào." });
        }

        res.json({ results: data });
    });
};
