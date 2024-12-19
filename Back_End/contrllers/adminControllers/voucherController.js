const db = require('../../config/db');

//Hiện danh sách vouchers
exports.getAllVoucher = function (req, res) {
    let sql = `SELECT * FROM Vouchers`;
    db.query(sql, (err, data) => {
        if (err) res.json({ "message": "Lỗi lấy voucher", err })
        else res.json(data);
    })
}
//Thêm voucher
exports.postVoucher = function (req, res) {
    const { Code, Discount, Expiration_Date } = req.body;

    if (!Code || !Discount || !Expiration_Date) {
        return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    // Kiểm tra mã Code đã tồn tại hay chưa
    const checkCodeSQL = 'SELECT * FROM Vouchers WHERE Code = ?';
    db.query(checkCodeSQL, [Code], (err, results) => {
        if (err) {
            console.error("Lỗi kiểm tra mã voucher:", err);
            return res.status(500).json({ message: "Lỗi khi kiểm tra mã voucher", error: err });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "Mã voucher đã tồn tại!" });
        }

        // Nếu mã Code chưa tồn tại, tiến hành thêm vào database
        const insertSQL = 'INSERT INTO Vouchers (Code, Discount, Expiration_Date) VALUES (?, ?, ?)';
        db.query(insertSQL, [Code, Discount, Expiration_Date], (err, result) => {
            if (err) {
                console.error("Lỗi khi thêm voucher:", err);
                return res.status(500).json({ message: "Lỗi thêm voucher", error: err });
            }
            res.json({ message: "Thêm voucher thành công", result });
        });
    });
};
exports.putVoucher = function (req, res) {
    const data = req.body;
    const id = req.params.id;

    // Kiểm tra ID hợp lệ
    if (!id || isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const { Code, Discount, Expiration_Date, Locked } = data;

    // Kiểm tra dữ liệu đầu vào
    if (
        !Code ||
        isNaN(Discount) ||
        !Expiration_Date ||
        !/^\d{4}-\d{2}-\d{2}$/.test(Expiration_Date) || // Định dạng ngày phải là YYYY-MM-DD
        (Locked !== 0 && Locked !== 1)
    ) {
        return res.status(400).json({ message: "Dữ liệu đầu vào không hợp lệ" });
    }

    const checkSQL = `
        SELECT 
            (SELECT COUNT(*) FROM Orders WHERE Voucher_ID = ?) AS used,
            (SELECT COUNT(*) FROM Vouchers WHERE Voucher_ID = ? AND User_ID IS NOT NULL) AS assigned`;

    db.query(checkSQL, [id, id], (err, results) => {
        if (err) {
            console.error("Lỗi kiểm tra voucher:", err);
            return res.status(500).json({ message: "Lỗi kiểm tra voucher", error: err.message });
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy voucher." });
        }

        const { used, assigned } = results[0];
        if (used > 0 || assigned > 0) {
            return res.status(400).json({
                message: "Voucher đã được sử dụng hoặc cấp cho người dùng, không thể sửa.",
            });
        }

        const updateSQL = `
        UPDATE Vouchers 
        SET Code = ?, Discount = ?, Expiration_Date = ?, Locked = ?
        WHERE Voucher_ID = ?`;

        db.query(updateSQL, [Code, Discount, Expiration_Date, Locked, id], (err) => {
            if (err) {
                console.error("Lỗi cập nhật voucher:", err);
                return res.status(500).json({ message: "Lỗi cập nhật voucher", error: err.message });
            }
            res.json({ message: "Cập nhật voucher thành công." });
        });
    });
};

exports.getVoucherDetail = function (req, res) {
    let id = req.params.id;

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID không hợp lệ" });
    }

    let sql = `
        SELECT Voucher_ID, Code, Discount, Expiration_Date, Locked
        FROM Vouchers 
        WHERE Voucher_ID = ?`;

    db.query(sql, id, (err, data) => {
        if (err) {
            console.error("Lỗi lấy chi tiết voucher:", err);
            return res.status(500).json({ message: "Lỗi lấy chi tiết voucher", err });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy voucher" });
        }

        res.json(data[0]);
    });
};

//lock voucher
exports.lockVoucher = (req, res) => {
    const id = req.params.id;

    // Validate voucher ID
    if (!id || isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID không hợp lệ" });
    }

    // Check if voucher exists in the database
    const sql = `SELECT * FROM Vouchers WHERE Voucher_ID = ?`;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error checking voucher:", err);
            return res.status(500).json({ message: "Lỗi server khi kiểm tra voucher", error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Voucher không tồn tại" });
        }

        const voucher = results[0];

        // Check if the voucher has been assigned to a user (exists in the users table)
        const userSql = `SELECT * FROM users WHERE Voucher_ID = ?`;
        db.query(userSql, [id], (err, userResults) => {
            if (err) {
                console.error("Error checking user:", err);
                return res.status(500).json({ message: "Lỗi server khi kiểm tra người dùng", error: err.message });
            }

            if (userResults.length > 0) {
                return res.status(400).json({ message: "Voucher đã được cung cấp cho người dùng và không thể khóa" });
            }

            // Check if voucher is used in any orders that are not canceled
            const orderSql = `SELECT * FROM orders WHERE Voucher_ID = ? AND Status <> 3`; // Assuming Status 3 is canceled
            db.query(orderSql, [id], (err, orderResults) => {
                if (err) {
                    console.error("Error checking orders:", err);
                    return res.status(500).json({ message: "Lỗi server khi kiểm tra đơn hàng", error: err.message });
                }

                if (orderResults.length > 0) {
                    return res.status(400).json({ message: "Voucher đã được sử dụng trong đơn hàng và không thể khóa" });
                }

                // Check if the voucher has expired
                const currentDate = new Date();
                const expiryDate = new Date(voucher.Expiration_Date);
                if (expiryDate < currentDate) {
                    return res.status(400).json({ message: "Voucher đã hết hạn và không thể khóa" });
                }

                // Lock the voucher
                const lockSql = `UPDATE Vouchers SET Locked = 1 WHERE Voucher_ID = ?`;
                db.query(lockSql, [id], (err, updateResults) => {
                    if (err) {
                        console.error("Error locking voucher:", err);
                        return res.status(500).json({ message: "Lỗi server khi khóa voucher", error: err.message });
                    }

                    if (updateResults.affectedRows === 0) {
                        return res.status(404).json({ message: "Voucher không tồn tại" });
                    }

                    return res.json({ message: "Voucher đã được khóa thành công" });
                });
            });
        });
    });
};

