// models/Bus.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusSchema = new Schema({
    licensePlate: { type: String, required: true, unique: true, maxlength: 20 }, // Biển số xe
    color: { type: String, required: true, maxlength: 50 },                   // Màu xe
    manufacturer: { type: String, required: true, maxlength: 100 },           // Hãng sản xuất
    year: { type: Number, required: true },                                    // Đời xe
    model: { type: String, required: true, maxlength: 100 },                  // Model xe
    seats: { type: Number, required: true, min: 20 },                          // Số ghế
    yearsUsed: { type: Number, required: true, min: 0 },                      // Số năm sử dụng
    lastMaintenanceDate: { type: Date, required: true },                      // Ngày bảo dưỡng cuối cùng
});

module.exports = mongoose.model('bus', BusSchema);
