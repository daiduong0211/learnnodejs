const Trip = require('../models/Trip');

class TripController {
    // Xem tất cả các chuyến xe
    async index(req, res) {
        try {
            const trips = await Trip.find()
                .populate('routes')
                .populate('bus')
                .populate('driver')
                .populate('assistantDriver');
            
            // Trả về JSON với các trường code, description, result
            res.status(200).json({
                code: 200,
                description: 'Danh sách các chuyến xe.',
                result: trips
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                description: 'Lỗi server khi lấy danh sách chuyến xe.',
                result: error.message
            });
        }
    }

    // Thêm chuyến xe mới
    async create(req, res) {
        try {
            const newTrip = new Trip(req.body);
            const savedTrip = await newTrip.save();

            res.status(201).json({
                code: 201,
                description: 'Chuyến xe mới đã được tạo.',
                result: savedTrip
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                description: 'Lỗi khi tạo chuyến xe mới.',
                result: error.message
            });
        }
    }

    // Sửa thông tin chuyến xe
    async update(req, res) {
        try {
            const tripId = req.params.id;
            const updatedTrip = await Trip.findByIdAndUpdate(tripId, req.body, { new: true });

            res.status(200).json({
                code: 200,
                description: 'Thông tin chuyến xe đã được cập nhật.',
                result: updatedTrip
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                description: 'Lỗi khi cập nhật chuyến xe.',
                result: error.message
            });
        }
    }

    // Xóa chuyến xe
    async delete(req, res) {
        try {
            const tripId = req.params.id;
            await Trip.findByIdAndDelete(tripId);

            res.status(200).json({
                code: 200,
                description: 'Chuyến xe đã được xóa.',
                result: null
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                description: 'Lỗi khi xóa chuyến xe.',
                result: error.message
            });
        }
    }
}

module.exports = new TripController();
