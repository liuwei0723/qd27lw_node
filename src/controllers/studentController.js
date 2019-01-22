const path = require("path");
const template = require("art-template");
const databasetool = require(path.join(__dirname, "../tools/databasetool.js"));

const getStudentListPage = (req, res) => {
    const keyword = req.query.keyword || ''

    databasetool.findMany('studentInfo', {
        name: {
            $regex: keyword
        }
    }, (err, doc) => {
        const html = template(path.join(__dirname, "../public/views/list.html"), {
            students: doc,
            keyword
        });
        res.send(html);
    })
};
//获取新增页面
const getAddStudentPage = (req, res) => {
    const html = template(path.join(__dirname, "../public/views/add.html"), {});
    res.send(html);
}
//操作新增页面
const addStudent = (req, res) => {
    console.log(req.body);

    databasetool.insertSingle("studentInfo", req.body, (err, result) => {
        if (result == null) {
            // 新增失败
            res.send(`<script>alert("新增失败!");</script>`);
        } else {
            //新增成功
            res.send(`<script>window.location.href="/studentmanager/list"</script>`);
        }
    });
};
//获取编辑页面
const getEditStudentPage = (req, res) => {
    const html = template(path.join(__dirname, "../public/views/edit.html"), {});
    res.send(html);
}
//操作编辑页面
const editStudent = (req, res) => {
    
};

/**
 * 根据id删除学生信息
 */
const deleteStudent = (req, res) => {
    databasetool.deleteOne(
        "studentInfo", {
            _id: databasetool.ObjectId(req.params.studentId)
        },
        (err, result) => {
            if (result == null) {
                // 删除失败
                res.send(`<script>alert("删除失败!");</script>`);
            } else {
                //删除成功
                res.send(
                    `<script>window.location.href="/studentmanager/list"</script>`
                );
            }
        }
    );
}
module.exports = {
    getStudentListPage,
    getAddStudentPage,
    addStudent,
    deleteStudent,
    getEditStudentPage,
    editStudent
};