const express = require('express');
const router = express.Router();
const driverController = require('../app/controllers/DriverController');

// Lấy tất cả tài xế
router.get('/', driverController.index);

// Thêm tài xế mới
router.post('/create', driverController.create);

// Sửa thông tin tài xế theo ID
router.put('/:id', driverController.update);

// Xóa tài xế theo ID
router.delete('/:id', driverController.delete);

module.exports = router;
