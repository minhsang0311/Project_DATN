const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const  orderController = require('../../contrllers/adminControllers/orderController');



router.get('/order', orderController.getOrderList);
router.put('/order/:id', orderController.putOrder);




module.exports = router;