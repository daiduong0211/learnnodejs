//tạo file nodejs
npm init

// cài đặt express
npm install express

// khởi tạo file index.js 
const express = require('express')
const app = express()
const port = 3000
app.get('/', (req,res) => res.send('hello world'))
app.listen(port, () => console.log(`Example app listening at http:localhost:${port}`))

// cài đặt nodemon để host reload cho dev
npm i nodemon --save-dev

// vào package.json thêm câu lệnh start
"start": "nodemon ./index.js localhost 8080"

// thêm --inspect vào start để debug
"start": "nodemon --inspect ./index.js localhost 8080"

// cài đặt thư viện morgan để xem logger https request
npm install morgan --save

// thêm vào index.js để sử dụng morgan
var morgan = require('morgan')
app.use(morgan('combined'))

// cài đặt Template Engine
npm install express-handlebars

