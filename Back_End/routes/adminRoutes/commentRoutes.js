const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const commentController = require('../../contrllers/adminControllers/commentController');
const { adminMiddleware } = require('../../middlewares/adminMiddlware');



router.get('/reviews', adminMiddleware, commentController.getAllreviews);
router.put('/reviews/:id', adminMiddleware, commentController.updateReview);




module.exports = router;