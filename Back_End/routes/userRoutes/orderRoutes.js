const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const  orderController = require('../../contrllers/userControllers/orderController');



router.get('/order', orderController.getOrderList);




module.exports = router;