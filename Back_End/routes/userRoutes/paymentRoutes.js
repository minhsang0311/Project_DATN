const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const  paymentController = require('../../contrllers/userControllers/paymentController');



router.post('/payment',paymentController.paymentController);




module.exports = router;