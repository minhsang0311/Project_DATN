const express = require('express');
const router = express.Router();

const contactController = require('../../contrllers/userControllers/contactCotroller');

// Route to handle contact form submissions
router.post('/contact', contactController.sendContactEmail);

module.exports = router;
