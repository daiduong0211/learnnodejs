const mongoose = require('mongoose');

async function connect() {
    try {
        // Kết nối tới MongoDB mà không cần các tùy chọn đã lỗi thời
        await mongoose.connect('mongodb://localhost:27017/BusManagerment');
        console.log('Kết nối thành công tới MongoDB');
    } catch (error) {
        console.log('Lỗi kết nối:', error);
    }
}

module.exports = { connect };
