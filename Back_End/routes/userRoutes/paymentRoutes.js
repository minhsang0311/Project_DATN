const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const  paymentController = require('../../contrllers/userControllers/paymentController.js');
const { userMiddleware } = require('../../middlewares/userMiddlware');


router.post('/payment', paymentController.paymentController);
router.get('/getBankList', paymentController.getBankList)
router.get('/vnpay_return', paymentController.vnpay_return)
router.get('/userDetail/:id',paymentController.getUserDetail);




module.exports = router;