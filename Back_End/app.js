const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');
const productRoutesAdmin = require('./routes/adminRoutes/productRoutes');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/admin', productRoutesAdmin);

app.listen(3000, () => console.log('Server running on port 3000'));
