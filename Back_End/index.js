// const mysql = require('mysql');
// const exp = require('express');
// const app = exp();
// const cors = require('cors');
// app.use([cors(), exp.json()]);

// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// let secret = 'sangnm';
// const saltRounds = 10;
// const maxAge = 3*60*60;

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     port: 3306,
//     database: 'datn'
// });

// db.connect(err => {
//     if (err) throw err;
//     console.log('Đã kết nối database')
// });
// //USER
// //Route lấy danh sách sản phẩm
// app.get('/productList', (req, res) => {
//     let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden FROM Products`;
//     db.query(sql, (err, data) => {
//         if (err) {
//             res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
//         } else {
//             res.json(data);
//         }
//     });
// });
// //Route lấy danh mục
// app.get('/categoryList', (req, res) => {
//     let sql = `SELECT Category_ID, Category_Name, Show_Hidden FROM Categories`
//     db.query(sql, (err, data) => {
//         if (err) {
//             res.json({ "message": "Lỗi lấy danh mục", err });
//         } else {
//             res.json(data);
//         }
//     })
// })
// //Rpute lấy sản phẩm của một loại
// app.get('/Products/:id', (req, res) => {
//     let id = req.params.id;
//     if (isNaN(id) || isNaN(id) <= 0) {
//         res.json({ 'message': 'Lỗi không tìm thấy ID của loại.' });
//         return;
//     }
//     let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden 
//                 FROM Products WHERE Category_ID = ? AND Show_Hidden = 1`;
//     db.query(sql, id, (err, data) => {
//         if (err) {
//             res.json({ 'message': 'Lỗi không lấy được sản phẩm của loại ', err })
//         } else {
//             res.json(data)
//         }
//     })
// })
// //Route lấy chi tiết của một sản phẩm
// app.get('/productDetail/:id', function (req, res) {
//     let id = parseInt(req.params.id);
//     if (isNaN(id) || id <= 0) {
//         res.json({ "message": "Không tìm được sản phẩm", "id": id });
//         return;
//     }
//     let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden 
//                 FROM Products WHERE Product_ID = ?`
//     db.query(sql, id, (err, data) => {
//         if (err) res.json({ "message": "Lỗi lấy chi tiết một sản phẩm", err })
//         else res.json(data[0]);
//     });
// });
// //Route lấy chi tiết một loại
// app.get('/categoryDetail/:id', (err, data) => {
//     let id = parseInt(req.params.id)
//     if (isNaN(id) || isNaN(id) <= 0) {
//         res.json({'message':'Không tìm được loại', "id":id});
//         return;
//     }
//     let sql = `SELECT Category_ID, Category_Name, Show_Hidden FROM Categories WHERE Category_ID = ?`;
//     db.query(sql, id, (err, data) => {
//         if (err) res.json({ "message": "Lỗi lấy chi tiết một loại", err })
//         else res.json(data[0]);
//     });
// })

// // Route đăng ký
// app.post('/register', async (req, res) => {
//     const { User_Name, Email, Password, Phone } = req.body;
//     if (!User_Name || !Password || !Email || !Phone) {
//         return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
//     }

//     try {
//         // Kiểm tra xem người dùng đã tồn tại chưa
//         let checkUserSql = `SELECT * FROM Users WHERE User_Name = ?`;
//         db.query(checkUserSql, User_Name, async (err, results) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Lỗi kiểm tra người dùng', err });
//             }
//             if (results.length > 0) {
//                 return res.status(400).json({ message: 'Username đã tồn tại.' });
//             }
//             const hashedPassword = await bcrypt.hash(Password, saltRounds);
//             let insertUserSql = `INSERT INTO Users (User_Name, Email, Password, Phone) VALUES (?, ?, ?, ?)`;
//             db.query(insertUserSql, [User_Name, Email, hashedPassword, Phone], (err, result) => {
//                 if (err) {
//                     return res.status(500).json({ message: 'Lỗi tạo tài khoản', err });
//                 }
//                 return res.status(201).json({ message: 'Tạo tài khoản thành công.' });
//             });
//         });
//     } catch (error) {
//         return res.status(500).json({ message: 'Lỗi máy chủ.', error });
//     }
// });

// // Route đăng nhập
// app.post('/login', (req, res) => {
//     const { User_Name, Password } = req.body;

//     // Kiểm tra xem username và password đã được cung cấp
//     if (!User_Name || !Password) {
//         return res.status(400).json({ message: 'Vui lòng cung cấp username và password.' });
//     }

//     // Tìm người dùng trong cơ sở dữ liệu
//     let findUserSql = `SELECT * FROM Users WHERE User_Name = ?`;
//     db.query(findUserSql, User_Name, async (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Lỗi tìm người dùng', err });
//         }
//         if (results.length === 0) {
//             return res.status(400).json({ message: 'Username hoặc password không đúng.' });
//         }

//         const user = results[0];

//         // So sánh mật khẩu
//         const match = await bcrypt.compare(Password, user.Password);
//         if (!match) {
//             return res.status(400).json({ message: 'Username hoặc password không đúng.' });
//         }

//         // Tạo JWT token
//         const token = jwt.sign(
//             { userId: user.User_ID, username: user.Username },
//             secret,
//             { expiresIn: '3h' } // Thời gian sống của token
//         );

//         return res.status(200).json({ message: 'Đăng nhập thành công.', token });
//         return res.status(200).json({ message: 'Đăng nhập thành công.' });
//     });
// });

// //ADMIN
// //Route lấy danh sách sản phẩm
// app.get('/admin/productList', (req, res) => {
//     let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden FROM Products`;
//     db.query(sql, (err, data) => {
//         if (err) {
//             res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
//         } else {
//             res.json(data);
//         }
//     });
// })
// //Route lấy chi tiết một sản phẩm 
// app.get('/admin/productDetail/:id', function (req, res) {
//     let id = parseInt(req.params.id);
//     if (isNaN(id) || id <= 0) {
//         res.json({ "message": "Không tìm được sản phẩm", "id": id });
//         return;
//     }
//     let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden 
//                 FROM Products WHERE Product_ID = ?`
//     db.query(sql, id, (err, data) => {
//         if (err) res.json({ "message": "Lỗi lấy chi tiết một sản phẩm", err })
//         else res.json(data[0]);
//     });
// });
// //Route thêm sản phẩm
// app.post('/admin/productAdd', (req, res) => {
//     let data = req.body;
//     let sql = `INSERT INTO Prducts SET ?`;
//     db.query(sql, data, (err, data) => {
//         if(err){
//             res.json({'message':'Lỗi thêm sản phẩm ',err})
//         } else {
//             res.json({'message':'Đã thêm một sản phẩm mới.'});
//         }
//     })
// })
// //Route cập nhật sản phẩm
// app.put('/admin/productUpdate/:id', function (req, res) {
//     let data = req.body;
//     let id = req.params.id;
//     let sql = `UPDATE Products SET ? WHERE Product_ID=?`;
//     db.query(sql, [data, id], (err, d) => {
//         if (err) {
//             res.json({ "message": "Lỗi cập nhật sản phẩm", err })
//         } else {
//             res.json({ "message": "Đã cập nhật sản phẩm" })
//         }
//     })
// })
// //Route xóa một sản phẩm
// app.delete('/admin/productDelete/:id', function (req, res) {
//     let id = req.params.id;
//     let sql = `DELETE FROM Products WHERE Product_ID=?`;
//     db.query(sql, id, (err, data) => {
//         if (err) {
//             res.json({ "message": "Lỗi xóa sản phẩm", err })
//         } else {
//             res.json({ "message": "Đã xóa sản phẩm", "id":id })
//         }
//     })
// })
// app.listen(3000, () => console.log(`Ứng dụng đang chạy với port 3000`));
// module.exports = db;
