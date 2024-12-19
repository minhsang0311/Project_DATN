const db = require('../../config/db');

//Thống kê sản phẩm theo danh mục
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
//Thống kê sản phẩm theo hãng
exports.StatisticsProBrand = (req, res) => {
  const sqlProBrand = `
        SELECT Brands.Brand_Name, COUNT(Products.Product_ID) as totalProBrand
        FROM Products
        JOIN Brands ON Products.Brand_ID = Brands.Brand_ID
        GROUP BY Brands.Brand_Name
    `;
  db.query(sqlProBrand, (err, results) => {
    if (err) {
      return res.json({ "message": "Lỗi lấy số lượng sản phẩm theo hãng", err });
    }
    res.json(results);
  })
}
//API thống kê trạng thái đơn hàng
exports.OrderStatusStats = (req, res) => {
  const orderStatusQuery = `
    SELECT 
      o.Status,
      os.Status_Name,
      COUNT(o.Order_ID) AS order_count
    FROM orders o
    JOIN order_status os ON o.Status = os.Status_ID
    GROUP BY o.Status, os.Status_Name
    ORDER BY o.Status;
  `;

  db.query(orderStatusQuery, (err, results) => {
    if (err) {
      return res.json({ "message": "Lỗi thống kê trạng thái đơn hàng", err });
    }
    res.json(results);
  });
};
//Thống kê doanh thu
exports.getRevenueStatistics = (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Thiếu ngày bắt đầu hoặc ngày kết thúc." });
  }

  const sql = `
    SELECT 
      DATE(created_at) AS Date,
      SUM(total_amount) AS TotalRevenue
    FROM 
      orders
    WHERE 
      created_at >= ? 
      AND created_at <= ?
      AND Status = 5
    GROUP BY 
      DATE(created_at)
    ORDER BY 
      Date ASC
  `;

  const startDateTime = `${startDate} 00:00:00`;
  const endDateTime = `${endDate} 23:59:59`;

  db.query(sql, [startDateTime, endDateTime], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi truy vấn cơ sở dữ liệu", error: err });
    }

    if (!results.length) {
      return res.status(404).json({ message: "Không có dữ liệu doanh thu trong khoảng thời gian này." });
    }

    res.status(200).json({ data: results });
  });
};

//Lấy tổng số doanh thu
exports.getTotalRevenue = (req, res) => {
  const sql = `
    SELECT 
      SUM(total_amount) AS TotalRevenue
    FROM 
      orders
    WHERE 
      Status = 5
  `;

  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi lấy dữ liệu tổng doanh thu", error: err });
    }
    res.json(data[0]); // Trả về đối tượng chứa tổng doanh thu
  });
};

// Thống kê số lượng sản phẩm đã bán
exports.DailySaleProByDateRange = (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Vui lòng cung cấp ngày bắt đầu và ngày kết thúc" });
  }

  const sql = `
    SELECT 
      Products.Product_Name AS productName, 
      Products.Price AS productPrice, 
      Products.Promotion AS productPromotion, 
      SUM(order_details.Quantity) AS totalQuantity,
      MAX(Products.Image) AS productImage
    FROM 
      orders
    JOIN 
      order_details ON orders.Order_ID = order_details.Order_ID
    JOIN 
      Products ON order_details.Product_ID = Products.Product_ID
    WHERE 
      orders.created_at >= ? AND orders.created_at <= ? AND orders.Status = 5
    GROUP BY 
      Products.Product_Name, Products.Price, Products.Promotion
  `;

  const startDateTime = `${startDate} 00:00:00`;
  const endDateTime = `${endDate} 23:59:59`;

  db.query(sql, [startDateTime, endDateTime], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi lấy dữ liệu tổng doanh thu", error: err });
    }

    res.json(data); // Trả về mảng sản phẩm với số lượng bán được và hình ảnh
  });
};





