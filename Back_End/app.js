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

const { searchProducts } = require('./contrllers/adminControllers/productController');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require('./routes/authRoutes');
//Admin
const productRoutesAdmin = require('./routes/adminRoutes/productRoutes');
const categoryRoutesAdmin = require('./routes/adminRoutes/categoryRoutes');
const commentRoutesAdmin = require('./routes/adminRoutes/commentRoutes');
<<<<<<< HEAD
const StatisticsRoutesAdmin = require('./routes/adminRoutes/Statistics')
const brandRoutesAdmin = require('./routes/adminRoutes/brandRoutes')
const orderRoutesAdmin = require('./routes/adminRoutes/orderRoutes')
//User
const productRoutesClient = require('./routes/userRoutes/productRoutes');
const categoryRoutesClient = require('./routes/userRoutes/categoryRoutes');
const forgotPassword = require('./routes/userRoutes/forgotPassword')
const changePassword = require('./routes/userRoutes/changePassword')
const componentRoutesClient = require('./routes/userRoutes/commentRoutes');
const paymentRoutesClient = require('./routes/userRoutes/paymentRoutes');
const orderRoutesClient = require('./routes/userRoutes/orderRoutes')
=======
const StatisticsRoutesAdmin = require('./routes/adminRoutes/Statistics');
const customerRoutesAdmin = require('./routes/adminRoutes/customerRoutes');
//User
const productRoutesClient = require('./routes/userRoutes/productRoutes');
const categoryRoutesClient = require('./routes/userRoutes/categoryRoutes');
const componentRoutesClient = require('./routes/userRoutes/commentRoutes');
const contactRouterClient = require('./routes/userRoutes/contactRoutes');

>>>>>>> 1ef04affa5c864bb4a84f076b87408334cf1ce9a


app.use(cors(corsOpt));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/admin', [
    categoryRoutesAdmin,
    productRoutesAdmin,
    commentRoutesAdmin,
    StatisticsRoutesAdmin,
<<<<<<< HEAD
    brandRoutesAdmin,
    orderRoutesAdmin
=======
    customerRoutesAdmin
>>>>>>> 1ef04affa5c864bb4a84f076b87408334cf1ce9a
]);

app.use('/user',[
    productRoutesClient, 
    categoryRoutesClient,
    componentRoutesClient,
<<<<<<< HEAD
    forgotPassword,
    changePassword,
    orderRoutesClient,
    paymentRoutesClient
=======
    contactRouterClient
>>>>>>> 1ef04affa5c864bb4a84f076b87408334cf1ce9a
]);

app.get('/search', searchProducts);

app.listen(3000, () => console.log('Server running on port 3000'));

