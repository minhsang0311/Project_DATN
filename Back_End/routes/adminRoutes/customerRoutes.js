const db = require('../../config/db')

const express = require('express');
const router = express.Router();
const customerController = require('../../contrllers/adminControllers/customerController');
const { adminMiddleware } = require('../../middlewares/adminMiddlware');

// Route lấy danh sách tất cả người dùng
router.get('/customers', adminMiddleware, customerController.getAllCustomers);
router.post('/customerAdd', adminMiddleware, customerController.postCustomer);
router.get('/customerDetail/:id', adminMiddleware, customerController.getCustomerDetail);
router.put('/customerUpdate/:id', customerController.putCustomer);
router.delete('/customerDelete/:id', adminMiddleware, customerController.deleteCustomer);

module.exports = router;


