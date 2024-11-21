const db = require('../../config/db');

//Hiện danh sách vouchers
exports.getAllVoucher = function(req, res) {
    let sql = `SELECT * FROM Vouchers`;
    db.query(sql, (err, data) => {
        if(err) res.json({"message": "Lỗi lấy voucher", err})
            else res.json(data);
    })
}
//Thêm voucher
exports.postVoucher = function(req,res) {
    let data = req.body;
        let sql = 'INSERT INTO Vouchers SET ?';
        db.query(sql, data, (err, result) => {
          if(err) {
            res.json({ "message": "Lỗi thêm voucher", err });
          } else {
            res.json({ "message": "Đã chèn thêm một voucher"});
          }
        });
} 
//Sửa voucher
exports.putVoucher= function (req, res) {
    let data = req.body;
    let id = req.params.id;
    let sql = `UPDATE Vouchers SET ? WHERE Voucher_ID=?`;
    db.query(sql, [data, id], (err, d) => {
        if (err) {
            res.json({ "message": "Lỗi cập nhật voucher", err })
        } else {
            res.json({ "message": "Đã cập nhật voucher" })
        }
    })
  };
  exports.getVoucherDetail = function(req, res) {
    let id =req.params.id;
    if (isNaN(id) || id <= 0) {
        res.json({ "message": "Không tìm thấy voucher", "id": id });
        return;
    }
    let sql = `SELECT Voucher_ID, Code, Discount, Expiration_Date 
                FROM Vouchers WHERE Voucher_ID = ?`
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "message": "Lỗi lấy chi tiết một voucher", err })
        else res.json(data[0]);
    });
  }
  //Xóa voucher
exports.deleteVoucher = (req, res) => {
    const id  = req.params.id;

    if (!id) {
        return res.status(400).json({ "message": "Vui lòng cung cấp id" });
    }

    // Kiểm tra điều kiện trước khi xóa
    const checkQuery = `
        SELECT 
            v.Voucher_ID, v.Code, v.Discount, v.Expiration_Date, COUNT(o.Order_ID) AS Order_Count
        FROM 
            Vouchers v
        LEFT JOIN 
            Orders o 
        ON 
            v.Voucher_ID = o.Voucher_ID
        WHERE 
            v.Voucher_ID = ?
        GROUP BY 
            v.Voucher_ID
    `;

    db.query(checkQuery, [id], (err, results) => {
        if (err) return res.status(500).json({ "message": "Lỗi kiểm tra voucher", err });

        if (results.length === 0) {
            return res.status(404).json({ "message": "Voucher không tồn tại" });
        }

        const { Expiration_Date, Order_Count } = results[0];
        const currentDate = new Date();

        // Kiểm tra nếu voucher còn hạn sử dụng hoặc đang được dùng trong đơn hàng
        if (Order_Count > 0) {
            return res.status(400).json({ "message": "Không thể xóa voucher đã được sử dụng trong đơn hàng" });
        }
        if (new Date(Expiration_Date) > currentDate) {
            return res.status(400).json({ "message": "Không thể xóa voucher chưa hết hạn" });
        }

        // Xóa voucher
        const deleteQuery = `DELETE FROM Vouchers WHERE Voucher_ID = ?`;

        db.query(deleteQuery, [id], (err, result) => {
            if (err) return res.status(500).json({ "message": "Lỗi khi xóa voucher", err });

            if (result.affectedRows === 0) {
                return res.status(404).json({ "message": "Voucher không tồn tại hoặc đã bị xóa" });
            }

            res.json({ "message": "Xóa voucher thành công" });
        });
    });
};
