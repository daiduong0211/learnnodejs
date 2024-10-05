// Import các route API
const driverRouter = require('./driver'); // Driver routes
const routeRouter = require('./route');   // Route routes
const busRouter = require('./bus');       // Bus routes
const tripRouter = require('./trip');     // Trip routes

// Hàm cấu hình các route cho ứng dụng
function route(app) {
    // Lắng nghe các API tương ứng cho Driver
    app.use('/api/drivers', driverRouter);

    // Lắng nghe các API tương ứng cho Route
    app.use('/api/routes', routeRouter);

    // Lắng nghe các API tương ứng cho Bus
    app.use('/api/buses', busRouter);

    // Lắng nghe các API tương ứng cho Trip
    app.use('/api/trips', tripRouter);
}

module.exports = route;
