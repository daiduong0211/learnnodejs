const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
    route_id: { type: String, required: true, unique: true },   // Mã tuyến
    diem_dau: { 
        type: String, 
        required: [true, 'Điểm đầu không được để trống'],       // Bắt buộc phải có
        validate: {                                             // Kiểm tra không được là chuỗi rỗng
            validator: function(v) {
                return v && v.trim().length > 0;
            },
            message: 'Điểm đầu không được là chuỗi rỗng'
        }
    },              
    diem_cuoi: { 
        type: String, 
        required: [true, 'Điểm cuối không được để trống'],      // Bắt buộc phải có
        validate: {                                             // Kiểm tra không được là chuỗi rỗng
            validator: function(v) {
                return v && v.trim().length > 0;
            },
            message: 'Điểm cuối không được là chuỗi rỗng'
        }
    },
    do_dai: { type: Number, required: true, min: 1 },           // Độ dài tuyến (km) phải lớn hơn 0
    do_phuc_tap: { type: Number, required: true, min: 1, max: 3 },  // Độ phức tạp (1, 2, 3) phải từ 1 đến 3
}, {
    validate: {
        validator: function(doc) {
            return doc.diem_dau !== doc.diem_cuoi;               // Kiểm tra nếu điểm đầu không trùng với điểm cuối
        },
        message: 'Điểm đầu và điểm cuối không được trùng nhau'
    }
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
