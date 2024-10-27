const mysql = require('mysql');
const exp = require('express');
const app = exp();
const cors = require('cors');
app.use([cors(), exp.json()]);

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
let secret = 'sangnm';
const saltRounds = 10;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3307,
    database: 'datn'
})
db.connect(err => {
    if (err) throw err;
    console.log('Đã kết nối database')
});
//USER
//Route lấy danh sách sản phẩm
app.get('/productList', (req, res) => {
    let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden FROM Products`;
    db.query(sql, (err, data) => {  
        if (err) {
            res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        } else {
            res.json(data);
        }
    });
});
//lấy sản phẩm mới (giảm theo id)
app.get('/productNew', (req, res) => {
    let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden 
               FROM Products 
               ORDER BY Product_ID DESC`;  // Sắp xếp theo ID giảm dần
    db.query(sql, (err, data) => {
        if (err) {
            res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        } else {
            res.json(data);
        }
    });
});
//lấy sản phẩm xem nhiều
app.get('/productMostView', (req, res) => {
    let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden 
               FROM Products 
               ORDER BY Views DESC`;  // Sắp xếp theo ID giảm dần
    db.query(sql, (err, data) => {
        if (err) {
            res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        } else {
            res.json(data);
        }
    });
});

//Route lấy danh mục
app.get('/categoryList', (req, res) => {
    let sql = `SELECT Category_ID, Category_Name, Show_Hidden FROM Categories`
    db.query(sql, (err, data) => {
        if (err) {
            res.json({ "message": "Lỗi lấy danh mục", err });
        } else {
            res.json(data);
        }
    })
})
//Route lấy sản phẩm của một loại
app.get('/Products/:id', (req, res) => {
    let id = parseInt(req.params.id)
    if (isNaN(id) || isNaN(id) <= 0) {
        res.json({ 'message': 'Lỗi không tìm thấy ID của loại.' });
        return;
    }
    let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden 
                FROM products WHERE Category_ID = ? AND Show_Hidden = 1`;
    db.query(sql, id, (err, data) => {
        if (err) {
            res.json({ 'message': 'Lỗi không lấy được sản phẩm của loại ', err })
        } else {
            res.json(data)
        }
    })
})
//Route lấy chi tiết của một sản phẩm
app.get('/productDetail/:id', function (req, res) {
    let id = parseInt(req.params.id ||0);
    if (isNaN(id) || id <= 0) {
        res.json({ "message": "Không tìm được sản phẩm", "id": id });
        return;
    }
    let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden 
               FROM products WHERE Product_ID = ?`;
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "message": "Lỗi lấy chi tiết một sản phẩm", err })
        else res.json(data[0]);
    });
});

// sp liên quan 
app.get('/san_pham_lien_quan/:id/:limit', function(req, res) {
    let id = Number(req.params.id); 
    let limit = Number(req.params.limit); 

    if (isNaN(id) || id <= 0) return res.json({ 'thongbao': 'Sản phẩm không tồn tại' });
    if (isNaN(limit) || limit <= 1) limit = 1;

    // Lấy Category_ID của sản phẩm hiện tại
    let sql1 = `SELECT Category_ID FROM products WHERE Product_ID = ?`; 
    db.query(sql1, id, (err, data) => {
        if (err || data.length === 0) {
            res.json({ 'thongbao': 'Sản phẩm không có' });
            return;
        }

        let Category_ID = data[0].Category_ID;

        // Lấy danh sách các sản phẩm liên quan theo Category_ID, bỏ qua sản phẩm hiện tại
        let sql2 = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views 
                    FROM products 
                    WHERE Show_Hidden = 1 AND Category_ID = ? AND Product_ID <> ? 
                    ORDER BY Price DESC 
                    LIMIT ?`;

        db.query(sql2, [Category_ID, id, limit], (err, relatedProducts) => {
            if (err) {
                res.json({ 'thongbao': 'Lỗi lấy sản phẩm liên quan', err });
            } else {
                res.json(relatedProducts);
            }
        });
    });
});

//Route lấy chi tiết một loại
app.get('/categoryDetail/:id', (err, data) => {
    let id = parseInt(req.params.id)
    if (isNaN(id) || isNaN(id) <= 0) {
        res.json({'message':'Không tìm được loại', "id":id});
        return;
    }
    let sql = `SELECT Category_ID, Category_Name, Show_Hidden FROM Categories WHERE Category_ID = ?`;
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "message": "Lỗi lấy chi tiết một loại", err })
        else res.json(data[0]);
    });
})
app.get('/category', function(req, res) {
    db.query(`SELECT Category_ID , Category_Name FROM categories`,(err, data)=>{
    if (err) res.json({"thongbao":"Lỗi lay loai", err })
    else res.json(data);
    });
  });
  app.get('/category/:Category_ID', function(req, res) {
    let Category_ID = parseInt(req.params.Category_ID);      
    if ( isNaN(Category_ID) || Category_ID <= 0) { 
      res.json({"thong bao":"Không biết Loại", "id_loai": id_loai});  return; 
    } 
    let sql = `SELECT Category_ID, Category_Name FROM categories WHERE Category_ID = ?` 
    db.query( sql , Category_ID,  (err, data) => {
      if (err) res.json({"thongbao":"Lỗi lấy loai", err })
      else res.json(data[0]);
     });   
  });

// Route đăng ký
app.post('/register', async (req, res) => {
    const { User_Name, Email, Password, Phone } = req.body;
    if (!User_Name || !Password || !Email || !Phone) {
        return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
    }

    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        let checkUserSql = `SELECT * FROM Users WHERE User_Name = ?`;
        db.query(checkUserSql, User_Name, async (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Lỗi kiểm tra người dùng', err });
            }
            if (results.length > 0) {
                return res.status(400).json({ message: 'Username đã tồn tại.' });
            }
            const hashedPassword = await bcrypt.hash(Password, saltRounds);
            let insertUserSql = `INSERT INTO Users (User_Name, Email, Password, Phone) VALUES (?, ?, ?, ?)`;
            db.query(insertUserSql, [User_Name, Email, hashedPassword, Phone], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Lỗi tạo tài khoản', err });
                }
                return res.status(201).json({ message: 'Tạo tài khoản thành công.' });
            });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi máy chủ.', error });
    }
});

// Route đăng nhập
app.post('/login', (req, res) => {
    const { User_Name, Password } = req.body;

    // Kiểm tra xem username và password đã được cung cấp
    if (!User_Name || !Password) {
        return res.status(400).json({ message: 'Vui lòng cung cấp username và password.' });
    }

    // Tìm người dùng trong cơ sở dữ liệu
    let findUserSql = `SELECT * FROM Users WHERE User_Name = ?`;
    db.query(findUserSql, User_Name, async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi tìm người dùng', err });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: 'Username hoặc password không đúng.' });
        }

        const user = results[0];

        // So sánh mật khẩu
        const match = await bcrypt.compare(Password, user.Password);
        if (!match) {
            return res.status(400).json({ message: 'Username hoặc password không đúng.' });
        }

        // Tạo JWT token
        const token = jwt.sign(
            { userId: user.User_ID, username: user.Username },
            secret,
            { expiresIn: '3h' } // Thời gian sống của token
        );

        return res.status(200).json({ message: 'Đăng nhập thành công.', token });
        return res.status(200).json({ message: 'Đăng nhập thành công.' });
    });
});

//ADMIN
//Route lấy danh sách sản phẩm
app.get('/admin/productList', (req, res) => {
    let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden FROM Products`;
    db.query(sql, (err, data) => {
        if (err) {
            res.json({ "message": "Lỗi lấy danh sách sản phẩm", err });
        } else {
            res.json(data);
        }
    });
})
//Route lấy chi tiết một sản phẩm 
app.get('/admin/productDetail/:id', function (req, res) {
    let id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        res.json({ "message": "Không tìm được sản phẩm", "id": id });
        return;
    }
    let sql = `SELECT Product_ID, Category_ID, Product_Name, Image, Price, Description, Views, Show_Hidden 
                FROM Products WHERE Product_ID = ?`
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "message": "Lỗi lấy chi tiết một sản phẩm", err })
        else res.json(data[0]);
    });
});
//Route thêm sản phẩm
app.post('/admin/productAdd', (req, res) => {
    let data = req.body;
    let sql = `INSERT INTO Prducts SET ?`;
    db.query(sql, data, (err, data) => {
        if(err){
            res.json({'message':'Lỗi thêm sản phẩm ',err})
        } else {
            res.json({'message':'Đã thêm một sản phẩm mới.'});
        }
    })
})
//Route cập nhật sản phẩm
app.put('/admin/productUpdate/:id', function (req, res) {
    let data = req.body;
    let id = req.params.id;
    let sql = `UPDATE Products SET ? WHERE Product_ID=?`;
    db.query(sql, [data, id], (err, d) => {
        if (err) {
            res.json({ "message": "Lỗi cập nhật sản phẩm", err })
        } else {
            res.json({ "message": "Đã cập nhật sản phẩm" })
        }
    })
})
//Route xóa một sản phẩm
app.delete('/admin/productDelete/:id', function (req, res) {
    let id = req.params.id;
    let sql = `DELETE FROM Products WHERE Product_ID=?`;
    db.query(sql, id, (err, data) => {
        if (err) {
            res.json({ "message": "Lỗi xóa sản phẩm", err })
        } else {
            res.json({ "message": "Đã xóa sản phẩm", "id":id })
        }
    })
})
app.listen(3000, () => console.log(`Ứng dụng đang chạy với port 3000`));
module.exports = db;
