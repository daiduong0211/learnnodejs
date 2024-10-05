
// Import các mô hình cần thiết
const Driver = require('../models/Driver'); // Import Driver model
const Trip = require('../models/Trip'); // Import Trip model
const Route = require('../models/Route'); // Import Route model

class DriverController {
    // Xem tất cả tài xế
    async index(req, res) {
        try {
            const drivers = await Driver.find(); // Lấy tất cả tài xế
    
            const currentMonth = new Date().getMonth(); // Lấy tháng hiện tại
            const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
    
            const driverData = await Promise.all(drivers.map(async (driver) => {
                // Lọc các chuyến xe trong tháng hiện tại
                const tripsThisMonth = await Trip.find({
                    driver: driver._id,
                    dateFrom: {
                        $gte: new Date(currentYear, currentMonth, 1),
                        $lt: new Date(currentYear, currentMonth + 1, 1)
                    }
                }).populate('route'); // Tham chiếu đến mô hình Route
    
                let totalSalary = 0;
    
                // Tính lương dựa trên các chuyến xe
                for (const trip of tripsThisMonth) {
                    const routeComplexity = trip.route.complexityLevel; // Lấy độ phức tạp của tuyến đường
    
                    // Tính lương mỗi chuyến xe dựa vào độ phức tạp
                    const salaryPerTrip = routeComplexity * 100000; // Giả định hệ số lương dựa trên độ phức tạp
    
                    // Tính lương dựa trên vai trò
                    if (trip.driver.equals(driver._id)) {
                        totalSalary += salaryPerTrip * 2; // Lái xe có lương gấp đôi
                    } else {
                        totalSalary += salaryPerTrip; // Phụ xe
                    }
                }
    
                // Trả về tất cả thông tin của tài xế cùng với lương
                return {
                    _id: driver._id,
                    firstName: driver.firstName,
                    lastName: driver.lastName,
                    age: driver.age,
                    address: driver.address,
                    dateOfBirth: driver.dateOfBirth,
                    driver_phone: driver.driver_phone,
                    year_experience: driver.year_experience,
                    salary: totalSalary // Tổng lương của tài xế
                };
            }));
    
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
