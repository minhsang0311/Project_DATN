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
//Thống kê doanh thu theo tuần
exports.WeekRevenue = (req, res) => {
  const weeklyRevenue = `
  SELECT CONCAT('Tuần ', WEEK(MIN(created_at), 1), ' của ', YEAR(MIN(created_at))) AS week_label, 
         YEAR(created_at) AS year, 
         WEEK(created_at, 1) AS week_number, 
         SUM(total_amount) AS weekly_revenue
  FROM orders
  WHERE Status = 5
  GROUP BY year, week_number
  ORDER BY year DESC, week_number DESC;
`;
  db.query(weeklyRevenue, (err, results) => {
    if (err) {
      return res.json({ "message": "Lỗi lấy doanh thu sản phẩm theo tuần", err });
    }
    res.json(results);
  })
}
//Thống kê doanh thu theo tháng
exports.MonthRevenue = (req, res) => {
  const monthRevenue = `
      SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, SUM(total_amount) AS monthly_revenue
    FROM orders
    WHERE Status = 5
    GROUP BY month
    ORDER BY month DESC;
    `;
  db.query(monthRevenue, (err, results) => {
    if (err) {
      return res.json({ "message": "Lỗi lấy doanh thu sản phẩm theo tháng", err });
    }
    res.json(results);
  })
}
// API doanh thu theo quý
exports.QuarterRevenue = (req, res) => {
  const quarterlyRevenue = `
      SELECT CONCAT('Quý ', QUARTER(MIN(created_at)), ' của ', YEAR(MIN(created_at))) AS quarter_label,
             YEAR(created_at) AS year,
             QUARTER(created_at) AS quarter_number,
             SUM(total_amount) AS quarterly_revenue
      FROM orders
      WHERE Status = 5
      GROUP BY year, quarter_number
      ORDER BY year DESC, quarter_number DESC;
    `;
  db.query(quarterlyRevenue, (err, results) => {
    if (err) {
      return res.json({ "message": "Lỗi lấy doanh thu sản phẩm theo quý", err });
    }
    res.json(results);
  });
};


// API doanh thu theo năm
exports.YearRevenue = (req, res) => {
  const yearlyRevenue = `
      SELECT YEAR(created_at) AS year,
             SUM(total_amount) AS yearly_revenue
      FROM orders
      WHERE Status = 5
      GROUP BY year
      ORDER BY year DESC;
    `;
  db.query(yearlyRevenue, (err, results) => {
    if (err) {
      return res.json({ "message": "Lỗi lấy doanh thu sản phẩm theo năm", err });
    }
    res.json(results);
  });
};
//Thống kê tổng sản phẩm bán được theo tuần
exports.WeekSalePro = (req, res) => {
  const weeklySalePro = `
SELECT CONCAT('Tuần ', WEEK(MIN(created_at), 1), ' của ', YEAR(MIN(created_at))) AS week_label, 
       YEAR(created_at) AS year, 
       WEEK(created_at, 1) AS week_number, 
       SUM(total_quantity) AS weekly_salepro
FROM orders
WHERE Status = 5
GROUP BY year, week_number
ORDER BY year DESC, week_number DESC;
`;
  db.query(weeklySalePro, (err, results) => {
    if (err) {
      return res.json({ "message": "Lỗi tính tổng số sản phẩm bán được theo tuần", err });
    }
    res.json(results);
  })
}
//Thống kê doanh thu theo tháng
exports.MonthSalePro = (req, res) => {
  const monthSalePro = `
    SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, SUM(total_quantity) AS monthly_salepro
  FROM orders
  WHERE Status = 5
  GROUP BY month
  ORDER BY month DESC;
  `;
  db.query(monthSalePro, (err, results) => {
    if (err) {
      return res.json({ "message": "Lỗi tính tổng số sản phẩm bán được theo tháng", err });
    }
    res.json(results);
  })
}
// API doanh thu theo quý
exports.QuarterSalePro = (req, res) => {
  const quarterlySalePro = `
    SELECT CONCAT('Quý ', QUARTER(MIN(created_at)), ' của ', YEAR(MIN(created_at))) AS quarter_label,
           YEAR(created_at) AS year,
           QUARTER(created_at) AS quarter_number,
           SUM(total_quantity) AS quarterly_salepro
    FROM orders
    WHERE Status = 5
    GROUP BY year, quarter_number
    ORDER BY year DESC, quarter_number DESC;
  `;
  db.query(quarterlySalePro, (err, results) => {
    if (err) {
      return res.json({ "message": "Lỗi tính tổng số sản phẩm bán được theo quý", err });
    }
    res.json(results);
  });
};

//API tính tổng số sản phẩm bán được trong năm
exports.YearSalePro = (req, res) => {
  const yearlyRevenue = `
      SELECT YEAR(created_at) AS year,
             SUM(total_quantity) AS yearly_salepro
      FROM orders
      WHERE Status = 5
      GROUP BY year
      ORDER BY year DESC;
    `;
  db.query(yearlyRevenue, (err, results) => {
    if (err) {
      return res.json({ "message": "Lỗi tính tổng số sản phẩm bán trong năm", err });
    }
    res.json(results);
  });
};
//API thống kê trạng thái đơn hàng
exports.OrderStatusStats = (req, res) => {
  const orderStatusQuery = `
    SELECT 
      Status,
      COUNT(Order_ID) AS order_count
    FROM orders
    GROUP BY Status
    ORDER BY Status;
  `;
  
  db.query(orderStatusQuery, (err, results) => {
    if (err) {
      return res.json({ "message": "Lỗi thống kê trạng thái đơn hàng", err });
    }
    res.json(results);
  });
};

