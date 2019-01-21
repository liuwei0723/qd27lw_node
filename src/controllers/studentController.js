const path = require("path");
const template = require("art-template");
const MongoClient = require("mongodb").MongoClient;
// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "qd27lw";
const getStudentListPage = (req, res) => {
    const keyword = req.query.keyword || ''

    MongoClient.connect(
        url, {
            useNewUrlParser: true
        },
        function (err, client) {
            // 拿到db对象
            const db = client.db(dbName);

            // 要到要操作的集合 accountInfo
            const collection = db.collection("studentInfo");

            // 根据用户名或是密码查询
            collection.find({name:{$regex:keyword}}).toArray((err, doc) => {
                // console.log(doc);
                client.close();
                // 渲染页面
                const html = template(path.join(__dirname, "../public/views/list.html"), {
                    students: doc,
                    keyword
                });

                res.send(html);
                
            });
        }
    );

};


module.exports = {
    getStudentListPage
};