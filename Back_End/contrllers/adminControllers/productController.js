const db = require('../../config/db');
// const removeDiacritics = require('diacritics').remove;

//Routes lấy danh sách sản phẩm
exports.getAllProducts = (req, res) => {
    let sql = `SELECT * FROM Products`;
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
    let sql = `SELECT Product_ID, Category_ID,Brand_ID, Product_Name, Image, Price, Description, Views, Show_Hidden 
                FROM Products WHERE Product_ID = ?`
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "message": "Lỗi lấy chi tiết một sản phẩm", err })
        else res.json(data[0]);
    });
}
// //Route thêm sản phẩm
exports.postProduct = (req, res) => {
    if (!req.file) {
        console.error("Không tìm thấy file");
        return res.status(400).json({ message: "Không tìm thấy file" })
    }
    let data = req.body;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imagePath = `${baseUrl}/uploads/${req.file.filename}`;
    data.Image = imagePath;
    let sql = `INSERT INTO Products SET ?`;
    db.query(sql, data, (err, data) => {
        if (err) {
            res.json({ 'message': 'Lỗi thêm sản phẩm ', err })
        } else {
            res.json({ 'message': 'Đã thêm một sản phẩm mới.' });
        }
    })
}

// //Route cập nhật sản phẩm
exports.putProduct = (req, res) => {
    let data = req.body;
    if (req.file) {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const imagePath = `${baseUrl}/uploads/${req.file.filename}`;
        data.Image = imagePath;
    }
    let id = req.params.id;
    let sql = `UPDATE Products SET ? WHERE Product_ID=?`;
    db.query(sql, [data, id], (err, d) => {
        if (err) {
            res.json({ "message": "Lỗi cập nhật sản phẩm", err })
        } else {
            res.json({ "message": "Đã cập nhật sản phẩm" })
        }
    })
}

// Route xóa một sản phẩm
exports.deleteProduct = (req, res) => {
    let id = req.params.id;
    let checkOrderDetailSql = `SELECT COUNT(*) AS count FROM order_details WHERE Product_ID = ?`;
    db.query(checkOrderDetailSql, id, (err, result) => {
        if (err) {
            return res.json({ "message": "Lỗi kiểm tra đơn hàng chi tiết", err });
        }
<<<<<<< HEAD
        // Nếu sản phẩm đã tồn tại trong orderDetail, thông báo không thể xóa
        if (result[0].count > 0) {
            return res.status(400).json({ message: "Không thể xóa sản phẩm vì đã tồn tại trong đơn hàng chi tiết." });
        }
        let deleteSql = `DELETE FROM Products WHERE Product_ID=?`;
        db.query(deleteSql, id, (err, data) => {
            if (err) {
                res.json({ "message": "Lỗi xóa sản phẩm", err });
            } else {
                res.json({ message: "Đã xóa sản phẩm ", "id": id });
            }
        });
    });
};
=======
    })
}

// Route tìm kiếm theo sản phẩm
exports.searchProducts = (req, res) => {
    const keyword = req.query.q;
    if (!keyword) {
        return res.status(400).json({ message: "Vui lòng cung cấp từ khóa tìm kiếm." });
    }

    const sql = `SELECT * FROM Products WHERE Product_Name LIKE ?`;
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
>>>>>>> 1ef04affa5c864bb4a84f076b87408334cf1ce9a
