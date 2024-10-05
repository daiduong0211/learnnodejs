const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');
const route = require('./routes');
const morgan = require('morgan');
const db = require('./config/db')

// app.use(express.static(path.join(__dirname, 'public')));
// // Set static folder
db.connect()

// View engine setup
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'app', 'views'));

// Debugging tool
app.use(morgan('combined'));

// Middleware để phân tích cú pháp JSON
app.use(express.json());

// Initialize routes
route(app);

// Start the server
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
