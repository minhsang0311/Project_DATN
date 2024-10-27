const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const commentController = require('../../contrllers/adminControllers/commentController');



router.get('/reviews', commentController.getAllreviews);
router.put('/reviews/:id', commentController.updateReview); // Cập nhật trạng thái hiển thị




module.exports = router;