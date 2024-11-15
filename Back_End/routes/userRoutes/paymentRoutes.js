const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const  paymentController = require('../../contrllers/userControllers/paymentController.js');



router.post('/payment',paymentController.paymentController);
// router.post('/paymentOnline',paymentController.paymentOnline);




module.exports = router;