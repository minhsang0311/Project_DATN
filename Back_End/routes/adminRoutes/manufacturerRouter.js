const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const manufacturerController = require('../../contrllers/adminControllers/manufacturerController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/brand_images/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

router.get('/brands', manufacturerController.getAllBrands);
router.post('/brandAdd', upload.single('Brand_Image'), manufacturerController.addBrand);
router.get('/brandDetail/:id', manufacturerController.getManufacturerById);
router.put('/brandUpdate/:id', upload.single('Brand_Image'), manufacturerController.updateBrand);
// xóa nhà sản xuất 
router.delete('/brandDelete/:id', manufacturerController.deleteBrand); 

module.exports = router;
