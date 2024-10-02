const newsRouter = require('./home');

function route(app) {
    app.use('/home', newsRouter);
}

module.exports = route;
