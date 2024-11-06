const express = require('express');
const app = express();
const cors = require('cors');
const corsOpt = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
const path = require('path');

const { authMiddleware, adminMiddleware } = require('../Back_End/middlewares/authMiddlware')

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require('./routes/authRoutes');
//Admin
const productRoutesAdmin = require('./routes/adminRoutes/productRoutes');
const categoryRoutesAdmin = require('./routes/adminRoutes/categoryRoutes');
const commentRoutesAdmin = require('./routes/adminRoutes/commentRoutes');
const StatisticsRoutesAdmin = require('./routes/adminRoutes/Statistics')
const orderRoutesAdmin = require('./routes/adminRoutes/orderRoutes')
//User
const productRoutesClient = require('./routes/userRoutes/productRoutes');
const categoryRoutesClient = require('./routes/userRoutes/categoryRoutes');

const componentRoutesClient = require('./routes/userRoutes/commentRoutes');
const orderRoutesClient = require('./routes/userRoutes/orderRoutes')


app.use(cors(corsOpt));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/admin', [
    categoryRoutesAdmin,
    productRoutesAdmin,
    commentRoutesAdmin,
    StatisticsRoutesAdmin,
    orderRoutesAdmin
]);

app.use('/user',[
    productRoutesClient, 
    categoryRoutesClient,
    componentRoutesClient,
    orderRoutesClient
]);

app.listen(3000, () => console.log('Server running on port 3000'));
