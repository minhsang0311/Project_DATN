const db = require('../../config/db')
const express = require('express');
const router = express.Router();
const StatisticsController = require('../../contrllers/adminControllers/Statistics');
const { adminMiddleware } = require('../../middlewares/adminMiddlware');

router.get('/stats-procate', adminMiddleware, StatisticsController.StatisticsProCate);
router.get('/stats-probrand', adminMiddleware, StatisticsController.StatisticsProBrand);
router.get('/stats-statisticsRevenue', adminMiddleware, StatisticsController.getRevenueStatistics);
router.get('/stats-statisticsSalePro', StatisticsController.DailySaleProByDateRange);
router.get('/stats-orderStatus', adminMiddleware, StatisticsController.OrderStatusStats);
module.exports = router;