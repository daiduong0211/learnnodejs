// express
const express = require('express');
const path = require('path')
const app = express();
const port = 8080;
const handlebars = require('express-handlebars');

app.use(express.static(path.join(__dirname, 'public')))

//view Engine
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// tool debug
var morgan = require('morgan');
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => console.log(`Example app listening at http:localhost:${port}`));