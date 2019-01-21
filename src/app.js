//导包
const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
//创建app
const app = express()

//设置静态资源根目录
app.use(express.static(path.join(__dirname, "public")))
// 解析 application/json
app.use(bodyParser.json()); 
// // 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}))

//导入路由对象
const accountRouter = require(path.join(__dirname, "routers/accountRouter.js"))

const studentRouter = require(path.join(__dirname, "routers/studentRouter.js"))

app.use('/account', accountRouter)
app.use('/studentmanager', studentRouter)


//启动
app.listen(3000, '127.0.0.1', err => {
    if (err) {
        console.log(err)
    }

    console.log("start ok")
})