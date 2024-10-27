const express = require('express');
const cors = require('cors');
const path = require('path');

const { authMiddleware, adminMiddleware } = require('../Back_End/middlewares/authMiddlware');
const { searchProducts } = require('./contrllers/adminControllers/productController');

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require('./routes/authRoutes');
//Admin
const productRoutesAdmin = require('./routes/adminRoutes/productRoutes');
const StatisticsRoutesAdmin = require('./routes/adminRoutes/Statistics')
//User
const productRoutesClient = require('./routes/userRoutes/productRoutes');
const categoryRoutesClient = require('./routes/userRoutes/categoryRoutes');


app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/admin', [
    productRoutesAdmin,
    StatisticsRoutesAdmin
]);
app.use('/user',[
    productRoutesClient, 
    categoryRoutesClient
]);

app.get('/search', searchProducts);

// giỏ hàng


app.listen(3000, () => console.log('Server running on port 3000'));