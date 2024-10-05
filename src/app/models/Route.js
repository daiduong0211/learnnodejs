const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
    routeStart: { type: String, maxLength: 255, required: true },     // Điểm đầu
    routeEnd: { type: String, maxLength: 255, required: true },       // Điểm cuối
    length: { type: Number, required: true },                        // Độ dài tuyến đường (km)
    complexityLevel: { type: Number, required: true, enum: [1, 2, 3] } // Độ phức tạp của tuyến (1, 2, 3)
});

// Export the model
module.exports = mongoose.model('route', RouteSchema);
