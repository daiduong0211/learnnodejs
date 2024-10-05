const express = require('express');
const router = express.Router();
const busController = require('../app/controllers/BusController');

// Lấy tất cả các xe khách
router.get('/', busController.index);

// Thêm xe khách mới
router.post('/create', busController.create);

// Sửa thông tin xe khách theo ID
router.put('/:id', busController.update);

// Xóa xe khách theo ID
router.delete('/:id', busController.delete);

module.exports = router;
