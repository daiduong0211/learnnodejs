const newsRouter = require('./home');

function route(app) {
    app.use('/home', newsRouter); // Use app.use() for routers, not app.get()
}

module.exports = route;
