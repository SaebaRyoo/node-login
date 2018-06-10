const express = require('express')
const app  = express()
// 使用body-parser获取请求body
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')


// 引入路由中间件
const routerAdmin = require('./app/router-admin')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

// 加载路由模块
app.use('/admin',routerAdmin);

app.listen(3000,function(){
    console.log('port 3000 start')
})