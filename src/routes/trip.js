const express = require('express');
const router = express.Router();
const tripController = require('../app/controllers/TripController');

// Lấy tất cả các chuyến xe
router.get('/', tripController.index);

// Thêm chuyến xe mới
router.post('/create', tripController.create);

// Sửa thông tin chuyến xe theo ID
router.put('/:id', tripController.update);

// Xóa chuyến xe theo ID
router.delete('/:id', tripController.delete);

module.exports = router;
