const db = require('../../config/db');



exports.getOrderList = (req, res) => {
    const sql = `
        SELECT o.Order_ID, o.User_ID, u.User_Name, o.Email, o.Phone, o.Address, 
               o.payment_method, o.total_amount, o.created_at,  
               o.total_quantity, os.Status_Name AS Status 
        FROM orders o
        JOIN users u ON o.User_ID = u.User_ID
        JOIN order_status os ON o.Status = os.Status_ID
    `;
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi lấy trạng thái đơn hàng", err });
        }
        res.json(data);
    });
};
exports.patchOrderStatus = (req, res) => {
    const orderId = req.params.id;
  
    const getNextStatusQuery = `
      SELECT Status + 1 AS NextStatus
      FROM orders
      WHERE Order_ID = ? AND Status < 5;
    `;
  
    db.query(getNextStatusQuery, [orderId], (err, result) => {
      if (err) {
        console.error('Database error:', err);  
        return res.status(500).json({ message: 'Lỗi khi lấy trạng thái tiếp theo', err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'Không thể cập nhật trạng thái đơn hàng' });
      }
  
      const nextStatus = result[0].NextStatus;
  
      const updateOrderQuery = 'UPDATE orders SET Status = ? WHERE Order_ID = ?';
      db.query(updateOrderQuery, [nextStatus, orderId], (updateErr) => {
        if (updateErr) {
          console.error('Database error:', updateErr);  
          return res.status(500).json({ message: 'Lỗi cập nhật trạng thái đơn hàng', updateErr });
        }
        res.json({ message: 'Cập nhật trạng thái thành công', nextStatus });
      });
    });
  };

exports.getOrderDetail = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        // Query để lấy thông tin chi tiết đơn hàng và thông tin đơn hàng
        const result = await db.query(
            `SELECT 
                o.Order_ID,
                o.User_Name,
                o.Email,
                o.Phone,
                o.Address,
                o.Payment_Method,
                o.Status,
                o.Created_At,
                o.Total_Amount,
                o.Total_Quantity,
                od.Order_Detail_ID,
                od.Product_ID,
                od.Product_Name,
                od.Price,
                od.Quantity
             FROM orders AS o
             INNER JOIN order_details AS od ON o.Order_ID = od.Order_ID
             WHERE o.Order_ID = ?`,
            [orderId]
        );

        if (result.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy chi tiết cho Order_ID này.' });
        }

        // Xử lý dữ liệu để trả về kết quả có cấu trúc rõ ràng
        const orderInfo = {
            Order_ID: result[0].Order_ID,
            User_Name: result[0].User_Name,
Email: result[0].Email,
            Phone: result[0].Phone,
            Address: result[0].Address,
            Payment_Method: result[0].Payment_Method,
            Status: result[0].Status,
            Created_At: result[0].Created_At,
            Total_Amount: result[0].Total_Amount,
            Total_Quantity: result[0].Total_Quantity,
        };

        const orderDetails = result.map((item) => ({
            Order_Detail_ID: item.Order_Detail_ID,
            Product_ID: item.Product_ID,
            Product_Name: item.Product_Name,
            Price: item.Price,
            Quantity: item.Quantity,
        }));

        res.status(200).json({ order: orderInfo, order_details: orderDetails });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi khi lấy chi tiết đơn hàng.' });
    }
};
exports.patchPaymentMethod = async (req, res) => {
    const { orderId } = req.params;
  
    try {
      // Kiểm tra đơn hàng có tồn tại không
      const [order] = await db.query('SELECT * FROM orders WHERE Order_ID = ?', [orderId]);
      
      if (!order) {
        return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
      }
  
      // Kiểm tra phương thức thanh toán trước khi hủy
      if (order.Payment_Method === 'Online') {
        return res.status(400).json({ message: 'Không thể hủy đơn hàng đã thanh toán online.' });
      }
  
      // Cập nhật trạng thái đơn hàng thành "Đã hủy"
      await db.query('UPDATE orders SET Status = ? WHERE Order_ID = ?', ['6', orderId]);
  
      return res.status(200).json({ message: 'Đơn hàng đã được hủy thành công.' });
    } catch (err) {
      console.error('Lỗi khi hủy đơn hàng:', err);
      return res.status(500).json({ message: 'Lỗi khi xử lý yêu cầu hủy đơn hàng.' });
    }
  };