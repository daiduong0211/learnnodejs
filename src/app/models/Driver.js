const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DriverSchema = new Schema({
    firstName: { type: String, maxLength: 255, required: true },      // Tên
    lastName: { type: String, maxLength: 255, required: true },       // Họ
    age: { type: Number, required: true },                           // Tuổi
    address: { type: String, maxLength: 255, required: true },        // Địa chỉ
    dateOfBirth: { type: Date, required: true },                     // Ngày sinh
    driver_phone: { type: String, maxLength: 15, required: true },    // Số điện thoại
    year_experience: { type: Number, required: true }                // Số năm kinh nghiệm
});

// Export the model
module.exports = mongoose.model('driver', DriverSchema);
