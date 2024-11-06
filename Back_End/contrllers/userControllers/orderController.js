const db = require('../../config/db');




exports.getOrderList = (req, res) => {
        let sql = `
                SELECT * 
                FROM \`order\` o 
                JOIN \`order_status\` os ON o.Status = os.Status_ID
        `;
        db.query(sql, (err, data) => {
            if (err) {
                res.json({ "thongbao": "Lỗi lấy trạng thái đơn hàng", err });
            } else {
                res.json(data);
            }
        });
    };
    
