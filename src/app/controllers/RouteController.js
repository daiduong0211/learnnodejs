const Route = require('../models/Route');

class RouteController {
    // Xem tất cả tuyến xe
    async index(req, res) {
        try {
            const routes = await Route.find();
            res.status(200).json({
                code: 200,
                description: 'Danh sách các tuyến xe.',
                result: routes
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                description: 'Lỗi server khi lấy danh sách tuyến xe.',
                result: error.message
            });
        }
    }

    // Thêm tuyến xe mới
    async create(req, res) {
        try {
            const newRoute = new Route(req.body);
            const savedRoute = await newRoute.save();
            res.status(201).json({
                code: 201,
                description: 'Tuyến xe mới đã được tạo.',
                result: savedRoute
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                description: 'Lỗi khi tạo tuyến xe mới.',
                result: error.message
            });
        }
    }

    // Sửa thông tin tuyến xe
    async update(req, res) {
        try {
            const routeId = req.params.id;
            const updatedRoute = await Route.findByIdAndUpdate(routeId, req.body, { new: true });
            res.status(200).json({
                code: 200,
                description: 'Thông tin tuyến xe đã được cập nhật.',
                result: updatedRoute
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                description: 'Lỗi khi cập nhật tuyến xe.',
                result: error.message
            });
        }
    }

    // Xóa tuyến xe
    async delete(req, res) {
        try {
            const routeId = req.params.id;
            await Route.findByIdAndDelete(routeId);
            res.status(200).json({
                code: 200,
                description: 'Tuyến xe đã được xóa.',
                result: null
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                description: 'Lỗi khi xóa tuyến xe.',
                result: error.message
            });
        }
    }
}

module.exports = new RouteController();
