const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const handlebars = require('express-handlebars');
const route = require('./routes');
const morgan = require('morgan');
const db = require('./config/db')

db.connect()
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Debugging tool
app.use(morgan('combined'));

// Initialize routes
route(app);

// Start the server
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
