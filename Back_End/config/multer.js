const multer = require('multer');
const path = require('path');

// Cấu hình lưu trữ
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Thư mục lưu file
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage: storage
}).fields([
    { name: 'Image', maxCount: 1 }, // Ảnh chính
    { name: 'additionalImages', maxCount: 10 } // Tối đa 4 ảnh bổ sung
]);

module.exports = upload;
