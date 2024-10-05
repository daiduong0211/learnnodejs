
// Import các mô hình cần thiết
const Driver = require('../models/Driver'); // Import Driver model
const Trip = require('../models/Trip'); // Import Trip model
const Route = require('../models/Route'); // Import Route model

class DriverController {
    // Xem tất cả tài xế
    async index(req, res) {
        try {
            const driverData = await Driver.find(); // Lấy tất cả tài xế
            res.status(200).json({
                code: 200,
                description: 'Danh sách tài xế và lương tháng.',
                result: driverData // Trả về danh sách tài xế và lương
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                description: 'Lỗi server khi lấy danh sách tài xế.',
                result: error.message
            });
        }
    }

    // Thêm tài xế mới
    async create(req, res) {
        try {
            const newDriver = new Driver(req.body);
            const savedDriver = await newDriver.save();
            res.status(201).json({
                code: 201,
                description: 'Tài xế mới đã được tạo.',
                result: savedDriver
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                description: 'Lỗi khi tạo tài xế mới.',
                result: error.message
            });
        }
    }

    // Sửa thông tin tài xế
    async update(req, res) {
        try {
            const driverId = req.params.id;
            const updatedDriver = await Driver.findByIdAndUpdate(driverId, req.body, { new: true });
            res.status(200).json({
                code: 200,
                description: 'Thông tin tài xế đã được cập nhật.',
                result: updatedDriver
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                description: 'Lỗi khi cập nhật tài xế.',
                result: error.message
            });
        }
    }

    // Xóa tài xế
    async delete(req, res) {
        try {
            const driverId = req.params.id;
            await Driver.findByIdAndDelete(driverId);
            res.status(200).json({
                code: 200,
                description: 'Tài xế đã được xóa.',
                result: null
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                description: 'Lỗi khi xóa tài xế.',
                result: error.message
            });
        }
    }

}

module.exports = new DriverController();
