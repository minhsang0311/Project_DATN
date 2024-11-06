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

const { adminMiddleware } = require('../Back_End/middlewares/adminMiddlware')

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require('./routes/authRoutes');
//Admin
const productRoutesAdmin = require('./routes/adminRoutes/productRoutes');
const categoryRoutesAdmin = require('./routes/adminRoutes/categoryRoutes');
const commentRoutesAdmin = require('./routes/adminRoutes/commentRoutes');
const StatisticsRoutesAdmin = require('./routes/adminRoutes/Statistics')
const brandRoutesAdmin = require('./routes/adminRoutes/brandRoutes')
//User
const productRoutesClient = require('./routes/userRoutes/productRoutes');
const categoryRoutesClient = require('./routes/userRoutes/categoryRoutes');
const forgotPassword = require('./routes/userRoutes/forgotPassword')
const changePassword = require('./routes/userRoutes/changePassword')
const componentRoutesClient = require('./routes/userRoutes/commentRoutes');
const orderRoutesAdmin = require('./routes/adminRoutes/orderRoutes')
//User
const orderRoutesClient = require('./routes/userRoutes/orderRoutes')


app.use(cors(corsOpt));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/admin', [
    categoryRoutesAdmin,
    productRoutesAdmin,
    commentRoutesAdmin,
    StatisticsRoutesAdmin,
    brandRoutesAdmin,
    orderRoutesAdmin
]);

app.use('/user',[
    productRoutesClient, 
    categoryRoutesClient,
    componentRoutesClient,
    forgotPassword,
    changePassword,
    orderRoutesClient
]);

app.listen(3000, () => console.log('Server running on port 3000'));
