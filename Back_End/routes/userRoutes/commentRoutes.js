const express = require('express');
const router = express.Router();
const ComponentController = require('../../contrllers/userControllers/commentController');


router.get('/reviews/:id', ComponentController.getreviews);
router.post('/reviews', ComponentController.postreviews);


module.exports = router;