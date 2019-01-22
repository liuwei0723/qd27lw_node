const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;


// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'qd27lw';

//抽取连接数据库的方法
const connectDb = (collectionName, callback) => {
    MongoClient.connect(
        url, {
            useNewUrlParser: true
        },
        function (err, client) {
            // 拿到db对象
            const db = client.db(dbName);

            // 拿到要操作的集合 
            const collection = db.collection(collectionName);
            callback(err, client, collection)
        });
}

/**
 * 
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callback 回调
 */
const insertSingle = (collectionName, data, callback) => {
    connectDb(collectionName, (err, client, collection) => {
        collection.insertOne(data, (err, doc) => {
            //关闭数据库
            client.close();
            callback(err, doc)
        })
    })
}

const findYige = (collectionName, data, callback) => {
    connectDb(collectionName, (err, client, collection) => {
        // 根据用户名或是密码查询
        collection.findOne(data, (err, doc) => {
            //关闭数据库
            client.close();
            callback(err, doc)

        });
    })

}

const findMany = (collectionName, data, callback) => {
    connectDb(collectionName, (err, client, collection) => {
        // 根据用户名或是密码查询
        collection.find(data).toArray((err, docs) => {
            //关闭数据库
            client.close();
            callback(err, docs)

        });
    })
}

const updateYige = (collectionName, condition, data, callback) => {
    connectDb(collectionName, (err, client, collection) => {
        // 根据条件修改一个
        collection.updateOne(condition, {
            $set: data
        }, (err, result) => {
            client.close();
            // 执行 callback 把结果返回给控制器
            callback(err, result);
        });
    });
}

const deleteYige = (collectionName,data, callback)=>{
    connectDb(collectionName, (err, client, collection) => {
        // 根据用户名或是密码查询
        collection.deleteOne(data,(err, docs) => {
            //关闭数据库
            client.close();
            callback(err, docs)

        });
    })
}

module.exports = {
    insertSingle,
    findYige,
    findMany,
    ObjectId,
    updateYige,
    deleteYige
}