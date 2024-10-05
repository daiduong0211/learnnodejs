const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    tripCode: { type: String, maxLength: 255, required: true },       // Mã chuyến xe
    routes: { type: mongoose.Schema.Types.ObjectId, ref: 'route', required: true }, // Tham chiếu đến Route
    bus: { type: mongoose.Schema.Types.ObjectId, ref: 'bus', required: true },     // Tham chiếu đến Bus
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'driver', required: true }, // Tham chiếu đến lái xe chính
    assistantDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'driver', required: true }, // Tham chiếu đến phụ xe
    passengerCount: { type: Number, required: true },                // Số lượng hành khách
    ticketPrice: { type: Number, required: true },                   // Giá vé
    dateFrom: { type: Date, required: true },                         // Ngày khởi hành
});

// Pre-save hook to enforce passenger count limit
TripSchema.pre('save', async function(next) {
    const trip = this;

    // Find the bus associated with this trip to get the seat count
    const bus = await mongoose.model('bus').findById(trip.bus);
    if (bus) {
        const maxPassengerCount = bus.seats - 2; // Assuming bus has a 'seatCount' field

        if (trip.passengerCount > maxPassengerCount) {
            return next(new Error(`Số lượng hành khách không được vượt quá ${maxPassengerCount}`));
        }
    }

    next();
});


// Export the model
module.exports = mongoose.model('trip', TripSchema);
