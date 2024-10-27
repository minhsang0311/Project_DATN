const db = require('../../config/db')
const express = require('express');
const router = express.Router();
const { authMiddlware } = require('../../middlewares/authMiddlware');
const StatisticsController = require('../../contrllers/adminControllers/Statistics');

router.get('/stats-procate',  StatisticsController.StatisticsProCate);
router.get('/stats-probrand', StatisticsController.StatisticsProBrand);

module.exports = router;