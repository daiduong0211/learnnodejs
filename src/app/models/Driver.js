const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    driver_id: { type: String, required: [true, 'Mã tài xế không được để trống'], unique: true },  // Mã tài xế
    ten: { type: String, required: [true, 'Tên tài xế không được để trống'] },                      // Tên tài xế
    CMT: { type: String, required: [true, 'Chứng minh thư không được để trống'] },                  // Chứng minh thư
    so_bang_lai: { type: String, required: [true, 'Số bằng lái không được để trống'] },              // Số bằng lái
    loai_bang_lai: { type: String, required: [true, 'Loại bằng lái không được để trống'] },        // Loại bằng lái (B2, C, D, v.v.)
    dia_chi: { type: String, required: [true, 'Địa chỉ không được để trống'] },                    // Địa chỉ
    ngay_sinh: { type: Date, required: [true, 'Ngày sinh không được để trống'] },                  // Ngày sinh
    tham_nien: { type: Number, required: [true, 'Số năm kinh nghiệm không được để trống'], min: 0 }, // Số năm kinh nghiệm
    sdt: { type: String, required: [true, 'Số điện thoại không được để trống'] }                  // Số điện thoại
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
