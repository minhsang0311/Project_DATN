const express = require('express');
const cors = require('cors');

const { authMiddleware, adminMiddleware } = require('../Back_End/middlewares/authMiddlware')

const app = express();

const authRoutes = require('./routes/authRoutes');
const productRoutesAdmin = require('./routes/adminRoutes/productRoutes');
const productRoutesClient = require('./routes/userRoutes/productRoutes');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/admin', productRoutesAdmin);
app.use('/client',productRoutesClient);

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