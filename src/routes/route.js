const express = require('express');
const router = express.Router();
const routeController = require('../app/controllers/RouteController');

// Lấy tất cả các tuyến xe
router.get('/', routeController.index);

// Thêm tuyến xe mới
router.post('/create', routeController.create);

// Sửa thông tin tuyến xe theo ID
router.put('/:id', routeController.update);

// Xóa tuyến xe theo ID
router.delete('/:id', routeController.delete);

module.exports = router;
