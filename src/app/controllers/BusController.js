const Bus = require('../models/Bus');

class BusController {
    // Xem tất cả các xe khách
    index(req, res) {
        Bus.find({})
            .then(buses => {
                res.json(buses); // Trả về dữ liệu dạng JSON
            })
            .catch(err => res.status(500).json({ error: err.message }));
    }

    // Thêm xe khách
    create(req, res) {
        const newBus = new Bus(req.body);
        newBus.save()
            .then(bus => res.json(bus)) // Trả về xe vừa thêm dưới dạng JSON
            .catch(err => res.status(500).json({ error: err.message }));
    }

    // Sửa thông tin xe khách
    update(req, res) {
        Bus.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(bus => res.json(bus)) // Trả về xe đã được sửa dưới dạng JSON
            .catch(err => res.status(500).json({ error: err.message }));
    }

    // Xóa xe khách
    delete(req, res) {
        Bus.findByIdAndDelete(req.params.id)
            .then(() => res.json({ message: 'Bus deleted' })) // Trả về thông báo sau khi xóa
            .catch(err => res.status(500).json({ error: err.message }));
    }


    getBusRevenue = async (req, res) => {
        try {
            const busRevenue = await Bus.aggregate([
                {
                    $lookup: {
                        from: "trips",
                        localField: "car_id",
                        foreignField: "bus_id",
                        as: "trips"
                    }
                },
                {
                    $unwind: {
                        path: "$trips",
                        preserveNullAndEmptyArrays: true // Giữ lại các xe không có chuyến đi
                    }
                },
                {
                    $group: {
                        _id: "$car_id", // Nhóm theo bus_id
                        total_revenue: {
                            $sum: {
                                $cond: [
                                    { $and: [
                                        { $ne: ["$trips", null] }, // Kiểm tra nếu trips không phải là null
                                        { $gte: ["$trips.ngay_di", new Date(new Date().getFullYear(), new Date().getMonth(), 1)] }, // Chỉ tính doanh thu cho các chuyến đi trong tháng
                                        { $lte: ["$trips.ngay_di", new Date()] } // Đảm bảo ngày không vượt quá ngày hiện tại
                                    ] },
                                    {
                                        $multiply: [
                                            "$trips.so_khach", // Số hành khách
                                            "$trips.gia_ve"     // Giá vé
                                        ]
                                    },
                                    0 // Nếu không có chuyến đi trong tháng thì doanh thu = 0
                                ]
                            }
                        },
                        bus_info: {
                            $first: {
                                _id: "$_id",
                                bien_so: "$bien_so",
                                mau_xe: "$mau_xe",
                                hang_san_xuat: "$hang_san_xuat",
                                doi_xe: "$doi_xe",
                                model: "$model",
                                so_ghe: "$so_ghe"
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        bus_id: "$_id", // Đổi tên car_id thành bus_id để dễ hiểu
                        total_revenue: { $ifNull: ["$total_revenue", 0] }, // Đảm bảo total_revenue không null
                        bus_info: 1
                    }
                }
            ]);
    
            // Trả về kết quả
            res.status(200).json({
                code: 200,
                description: 'Danh sách xe buýt với doanh thu trong tháng.',
                result: busRevenue
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                description: 'Lỗi server khi lấy doanh thu xe buýt.',
                result: error.message
            });
        }
    };



   getBusMaintenanceStatus = async (req, res) => {
        try {
            const busMaintenanceStatus = await Bus.aggregate([
                {
                    $lookup: {
                        from: "trips",
                        localField: "car_id",
                        foreignField: "bus_id",
                        as: "trips" // Tạo một mảng chứa tất cả các chuyến đi của từng xe
                    }
                },
                {
                    $unwind: {
                        path: "$trips", // Chuyển đổi mảng trips thành tài liệu riêng biệt
                        preserveNullAndEmptyArrays: true // Giữ lại các xe không có chuyến đi
                    }
                },
                {
                    $lookup: {
                        from: "routes",
                        localField: "trips.route_id", // Trường cần tìm trong bảng trips
                        foreignField: "route_id", // Trường cần tìm trong bảng routes
                        as: "route_info" // Tạo mảng chứa thông tin từ bảng routes
                    }
                },
                {
                    $unwind: {
                        path: "$route_info", // Chuyển đổi mảng route_info thành tài liệu riêng biệt
                        preserveNullAndEmptyArrays: true // Giữ lại các chuyến không có thông tin từ routes
                    }
                },
                {
                    $project: {
                        _id: 0, // Ẩn trường _id của bảng buses
                        bus_id: "$car_id", // Đổi tên car_id thành bus_id
                        bien_so: 1, // Lấy biển số xe
                        mau_xe: 1, // Lấy màu xe
                        hang_san_xuat: 1, // Lấy hãng sản xuất
                        doi_xe: 1, // Lấy đời xe
                        model: 1, // Lấy model
                        so_ghe: 1, // Lấy số ghế
                        trip_info: {
                            chuyend_di: "$trips",
                            km_thuc_te: {
                                $multiply: [
                                    "$route_info.do_dai",          // Độ dài chuyến đi từ routes
                                    "$route_info.do_phuc_tap" // Độ khó từ bảng routes
                                ]
                            }
                        },
                        ngay_bao_duong_tiep: "$ngay_bao_duong_cuoi" // Thêm ngày bảo dưỡng tiếp theo
                    }
                },
                {
                    $set: {
                        "trip_info.next_maintenance_date": {
                            $dateAdd: {
                                startDate: "$ngay_bao_duong_tiep", // Ngày bảo dưỡng gần nhất
                                unit: "day", // Đơn vị là ngày
                                amount: {
                                    $floor: {
                                        $subtract: [
                                            360,
                                            { $divide: ["$trip_info.km_thuc_te", 100] }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    $set: {
                        can_bao_duong: {
                            $cond: [
                                { $gt: ["$ngay_bao_duong_tiep", "$trip_info.next_maintenance_date"] }, // So sánh ngày
                                true,
                                false
                            ]
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        con_han: {
                            $push: {
                                $cond: [
                                    { $eq: ["$can_bao_duong", false] }, // Xe chưa đến hạn
                                    "$$ROOT", // Lưu trữ toàn bộ tài liệu
                                    "$$REMOVE" // Không thêm vào mảng
                                ]
                            }
                        },
                        qua_han: {
                            $push: {
                                $cond: [
                                    { $eq: ["$can_bao_duong", true] }, // Xe đã đến hạn
                                    "$$ROOT", // Lưu trữ toàn bộ tài liệu
                                    "$$REMOVE" // Không thêm vào mảng
                                ]
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0, // Ẩn trường _id
                        con_han: { $filter: { input: "$con_han", as: "item", cond: { $ne: ["$$item", null] } } }, // Lọc ra mảng còn hạn
                        qua_han: { $filter: { input: "$qua_han", as: "item", cond: { $ne: ["$$item", null] } } } // Lọc ra mảng quá hạn
                    }
                }
            ]);
    
            // Trả về kết quả
            res.status(200).json({
                code: 200,
                description: 'Danh sách xe buýt với tình trạng bảo dưỡng.',
                result: busMaintenanceStatus
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                description: 'Lỗi server khi lấy tình trạng bảo dưỡng xe buýt.',
                result: error.message
            });
        }
    };


}

module.exports = new BusController();
