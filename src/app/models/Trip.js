const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    ma_chuyen: { type: String, required: true, unique: true },  // Mã chuyến xe
    route_id: { type: String, required: true }, 
    bus_id: { type: String, ref: 'Bus', required: true },     
    lai_xe_id: { type: String, ref: 'Driver', required: true }, 
    phu_xe_id: { type: String, ref: 'Driver', required: true }, 
    so_khach: { type: Number, required: true, min: [0, 'Số lượng khách không được nhỏ hơn 0'] }, // Số lượng hành khách
    gia_ve: { type: Number, required: true },                     // Giá vé
    ngay_di: { type: Date, required: true },                      // Ngày khởi hành
    ngay_ve: { type: Date, required: true, validate: {        // Ngày về
        validator: function(value) {
            return value >= this.ngay_di; // Ngày về phải lớn hơn hoặc bằng ngày đi
        },
        message: 'Ngày về phải lớn hơn hoặc bằng ngày đi'
    }}
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
