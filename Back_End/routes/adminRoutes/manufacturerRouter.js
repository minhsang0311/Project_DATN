const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const manufacturerController = require('../../contrllers/adminControllers/manufacturerController');
const { adminMiddleware } = require('../../middlewares/adminMiddlware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/brand_images/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

router.get('/brands',adminMiddleware, manufacturerController.getAllBrands);
router.post('/brandAdd', adminMiddleware, upload.single('Brand_Image'), manufacturerController.addBrand);
router.get('/brandDetail/:id', adminMiddleware, manufacturerController.getManufacturerById);
router.put('/brandUpdate/:id', adminMiddleware, upload.single('Brand_Image'), manufacturerController.updateBrand);
// xóa nhà sản xuất 
router.delete('/brandDelete/:id', adminMiddleware, manufacturerController.deleteBrand); 

module.exports = router;
