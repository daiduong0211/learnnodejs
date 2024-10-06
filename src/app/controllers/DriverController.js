
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


   getSalary = async (req, res) => {
        try {
            const driversWithSalaries = await Driver.aggregate([
                {
                    $lookup: {
                        from: "trips",
                        let: { driverId: "$driver_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $or: [
                                            { $eq: ["$lai_xe_id", "$$driverId"] },
                                            { $eq: ["$phu_xe_id", "$$driverId"] }
                                        ]
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    from: "routes",
                                    localField: "route_id",
                                    foreignField: "route_id",
                                    as: "route_info"
                                }
                            },
                            {
                                $addFields: {
                                    trip_length: "$do_dai",
                                    trip_complexity: { $arrayElemAt: ["$route_info.do_phuc_tap", 0] },
                                    salary_lai_xe: {
                                        $cond: {
                                            if: { $eq: ["$lai_xe_id", "$$driverId"] },
                                            then: { $multiply: [100, { $arrayElemAt: ["$route_info.do_phuc_tap", 0] }] },
                                            else: 0
                                        }
                                    },
                                    salary_phu_xe: {
                                        $cond: {
                                            if: { $eq: ["$phu_xe_id", "$$driverId"] },
                                            then: { $multiply: [50, { $arrayElemAt: ["$route_info.do_phuc_tap", 0] }] },
                                            else: 0
                                        }
                                    }
                                }
                            }
                        ],
                        as: "trips"
                    }
                },
                {
                    $addFields: {
                        total_salary: {
                            $sum: {
                                $map: {
                                    input: "$trips",
                                    as: "trip",
                                    in: { $add: ["$$trip.salary_lai_xe", "$$trip.salary_phu_xe"] }
                                }
                            }
                        }
                    }
                }
            ]);
    
            // Trả về kết quả
            res.status(200).json({
                code: 200,
                description: 'Danh sách tài xế với lương.',
                result: driversWithSalaries
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                description: 'Lỗi server khi lấy danh sách tài xế.',
                result: error.message
            });
        }
    };

}

module.exports = new DriverController();
