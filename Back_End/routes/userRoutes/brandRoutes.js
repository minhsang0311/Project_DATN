const express = require('express');
const router = express.Router();
const brandController = require('../../contrllers/userControllers/brandController');

router.get('/brand', brandController.getAllbrand);
router.get('/brand/:Brand_ID', brandController.getAllbrandID);
module.exports = router;