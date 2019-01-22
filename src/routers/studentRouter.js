const path = require('path')
const express = require('express')


// 创建路由对象
const studentRouter = express.Router()

// 导入控制器模块
const studentController = require(path.join(__dirname, "../controllers/studentController.js"))

//处理请求
studentRouter.get("/list", studentController.getStudentListPage);

// 获取新增页面
studentRouter.get('/add',studentController.getAddStudentPage)

// 完成新增操作
studentRouter.post('/add',studentController.addStudent)

// 获取修改页面
studentRouter.get('/edit/:studentId',studentController.getEditStudentPage)

// 完成修改操作
studentRouter.post('/edit/:studentId',studentController.editStudent)

//完成删除操作
studentRouter.get('/delete/:studentId',studentController.deleteStudent)

//导出
module.exports = studentRouter;