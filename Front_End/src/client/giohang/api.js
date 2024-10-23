const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors()); // Cho phép tất cả nguồn gọi API

// Kết nối MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Thay bằng user của bạn
  password: '', // Thay bằng password của bạn
  database: 'datn', // Tên database của bạn
});

// Kiểm tra kết nối
db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

// Route API để lấy chi tiết sản phẩm theo id
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const sql = 'SELECT * FROM products WHERE Product_ID = ?';

  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result[0]); // Trả về sản phẩm duy nhất
  });
});

// Chạy server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
