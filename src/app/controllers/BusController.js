const Bus = require('../models/Bus'); // Import Bus model
const Trip = require('../models/Trip'); // Import Trip model

class BusController {
    // Xem tất cả xe khách
    async index(req, res) {
        const { startDate, endDate } = req.query; // Lấy ngày bắt đầu và ngày kết thúc từ query params
    
        // Kiểm tra xem ngày bắt đầu và ngày kết thúc có hợp lệ hay không
        if (!startDate || !endDate) {
            return res.status(400).json({
                code: 400,
                description: 'Ngày bắt đầu và ngày kết thúc là bắt buộc.',
            });
        }
    
        try {
            const buses = await Bus.find(); // Lấy danh sách tất cả xe
            const revenueData = await Promise.all(buses.map(async (bus) => {
                // Lọc các chuyến xe trong khoảng thời gian
                const trips = await Trip.find({
                    bus: bus._id,
                    dateFrom: {
                        $gte: new Date(startDate), // Ngày bắt đầu
                        $lte: new Date(endDate) // Ngày kết thúc
                    }
                });
    
                // Tính doanh thu cho từng xe
                const totalRevenue = trips.reduce((acc, trip) => {
                    return acc + (trip.ticketPrice * trip.passengerCount); // Doanh thu = giá vé * số lượng khách
                }, 0);
    
                return {
                    ...bus.toObject(), // Lấy tất cả thông tin của xe
                    totalRevenue // Doanh thu tổng
                };
            }));
    
            res.status(200).json({
                code: 200,
                description: 'Danh sách xe khách và thông tin doanh thu của mỗi xe.',
                result: revenueData // Trả về danh sách xe cùng doanh thu
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                description: 'Lỗi server khi lấy danh sách xe khách.',
                result: error.message
            });
        }
    }
    // Thêm xe khách mới
    async create(req, res) {
        try {
            const newBus = new Bus(req.body);
            const savedBus = await newBus.save();
            res.status(201).json({
                code: 201,
                description: 'Xe khách mới đã được tạo.',
                result: savedBus
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                description: 'Lỗi khi tạo xe khách mới.',
                result: error.message
            });
        }
    }

    // Sửa thông tin xe khách
    async update(req, res) {
        try {
            const busId = req.params.id;
            const updatedBus = await Bus.findByIdAndUpdate(busId, req.body, { new: true });
            res.status(200).json({
                code: 200,
                description: 'Thông tin xe khách đã được cập nhật.',
                result: updatedBus
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                description: 'Lỗi khi cập nhật xe khách.',
                result: error.message
            });
        }
    }

    // Xóa xe khách
    async delete(req, res) {
        try {
            const busId = req.params.id;
            await Bus.findByIdAndDelete(busId);
            res.status(200).json({
                code: 200,
                description: 'Xe khách đã được xóa.',
                result: null
            });
        } catch (error) {
            res.status(400).json({
                code: 400,
                description: 'Lỗi khi xóa xe khách.',
                result: error.message
            });
        }
    }
}

module.exports = new BusController();
