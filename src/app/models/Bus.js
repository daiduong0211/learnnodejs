const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const busSchema = new Schema({
    car_id: { type: String, required: [true, 'Mã xe không được để trống'], unique: true },     // Mã xe
    bien_so: { type: String, required: [true, 'Biển số xe không được để trống'] },                  // Biển số xe
    mau_xe: { type: String, required: [true, 'Màu xe không được để trống'] },                       // Màu xe
    hang_san_xuat: { type: String, required: [true, 'Hãng sản xuất không được để trống'] },        // Hãng sản xuất
    doi_xe: { type: String, required: [true, 'Đời xe không được để trống'] },                      // Đời xe
    model: { type: String, required: [true, 'Model xe không được để trống'] },                    // Model xe
    so_ghe: { type: Number, required: [true, 'Số ghế không được để trống'], min: 3 },              // Số ghế
    so_nam_su_dung: { type: Number, required: [true, 'Số năm sử dụng không được để trống'], min: 0 }, // Số năm sử dụng
    ngay_bao_duong_cuoi: { type: Date, required: [true, 'Ngày bảo dưỡng cuối không được để trống'] } // Ngày bảo dưỡng cuối
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
