const db = require('../../config/db')
const express = require('express');
const router = express.Router();
const StatisticsController = require('../../contrllers/adminControllers/Statistics');
const { adminMiddleware } = require('../../middlewares/adminMiddlware');

router.get('/stats-procate', adminMiddleware, StatisticsController.StatisticsProCate);
router.get('/stats-probrand', adminMiddleware, StatisticsController.StatisticsProBrand);
router.get('/stats-weekRevenue', adminMiddleware, StatisticsController.WeekRevenue);
router.get('/stats-monthRevenue', adminMiddleware, StatisticsController.MonthRevenue);
router.get('/stats-quarterRevenue', adminMiddleware, StatisticsController.QuarterRevenue);
router.get('/stats-yearRevenue', adminMiddleware, StatisticsController.YearRevenue);
router.get('/stats-weekSalePro', adminMiddleware, StatisticsController.WeekSalePro);
router.get('/stats-monthSalePro', adminMiddleware, StatisticsController.MonthSalePro);
router.get('/stats-quarterSalePro', adminMiddleware, StatisticsController.QuarterSalePro);
router.get('/stats-yearSalePro', adminMiddleware, StatisticsController.YearSalePro);
router.get('/stats-orderStatus', adminMiddleware, StatisticsController.OrderStatusStats);
module.exports = router;