const express = require('express');
const router = express.Router();
const ComponentController = require('../../contrllers/userControllers/commentController');


router.get('/reviews', ComponentController.getreviews);
router.post('/reviews/:id', ComponentController.postreviews);


module.exports = router;