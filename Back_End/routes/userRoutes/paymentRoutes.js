const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const  paymentController = require('../../contrllers/userControllers/paymentController.js');



router.post('/payment',paymentController.paymentController);
router.get('/getBankList', paymentController.getBankList)
router.get('/vnpay_return', paymentController.vnpay_return)
// router.post('/paymentOnline',paymentController.paymentOnline);




module.exports = router;