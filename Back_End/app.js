const express = require('express');
const cors = require('cors');
const path = require('path');

const { authMiddleware, adminMiddleware } = require('../Back_End/middlewares/authMiddlware')

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require('./routes/authRoutes');
//Admin
const productRoutesAdmin = require('./routes/adminRoutes/productRoutes');
const categoryRoutesAdmin = require('./routes/adminRoutes/categoryRoutes');
const StatisticsRoutesAdmin = require('./routes/adminRoutes/Statistics')
//User
const productRoutesClient = require('./routes/userRoutes/productRoutes');
const categoryRoutesClient = require('./routes/userRoutes/categoryRoutes');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/admin', [
    categoryRoutesAdmin,
    productRoutesAdmin,
    StatisticsRoutesAdmin
]);
app.use('/user',[
    productRoutesClient, 
    categoryRoutesClient
]);

app.listen(3000, () => console.log('Server running on port 3000'));


// const express = require('express');
// const { authMiddleware, adminMiddleware } = require('./middleware/authMiddleware');
// const app = express();

// app.use(express.json());

// // Route cho admin (chỉ cho phép admin truy cập)
// app.get('/api/admin', authMiddleware, adminMiddleware, (req, res) => {
//     res.json({ message: 'Đây là trang admin.' });
// });

// // Route cho người dùng bình thường
// app.get('/api/user', authMiddleware, (req, res) => {
//     res.json({ message: 'Đây là trang người dùng.' });
// });

// // Các route khác và cấu hình server