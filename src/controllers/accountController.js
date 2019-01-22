const path = require('path')
const databasetool = require(path.join(__dirname, '../tools/databasetool'))

const captchapng = require('captchapng');



/**
 * module.exports = {
 *  getRegisterPage:箭头函数
 * }
 * 导出的一个方法，该方法获取注册页面
 */
exports.getRegisterPage = (req, res) => {
    // 内部就是对 fs.readFile 的封装
    res.sendFile(path.join(__dirname, "../public/views/register.html"))
}


exports.register = (req, res) => {
    const result = {
        status: 0,
        message: '注册成功'
    }
    // 拿到浏览器传输过来数据
    const {
        username
    } = req.body
    //先判断数据库中用户名是否存在,如果存在返回提示
    databasetool.findYige('accountInfo', {
        username
    }, (err, doc) => {
        if (doc) {
            result.status = 1
            result.message = '用户名已存在'
            res.json(result)
        } else {
            //3、如果用户名不存在，插入到数据库中
            // result2 有值，代表成功 result2 为null就是失败
            databasetool.insertSingle('accountInfo', req.body, (err, result2) => {
                // 如果result2 == null 没有查询到，就可以插入，如果查询到了，说明用户名已经存在
                if (!result2) {
                    result.status = 2
                    result.message = '注册失败'
                    // result2 有值，代表成功 result2 为null就是失败

                }
                res.json(result)
            })
        }
    })
}

exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/login.html"))
}

exports.getVcodeImage = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000);
    // 把vcode保存到session对象中去，方便将来登录
    req.session.vcode = vcode
    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, "base64");
    res.writeHead(200, {
        "Content-Type": "image/png"
    });
    res.end(imgbase64);
}

// 导出登录的方法
exports.login = (req, res) => {
    // 把浏览器传递过来的验证码 和 req.session.vcode 中的验证码对比
    const result = {
        status: 0,
        message: '登录成功'
    }
    // 拿到浏览器传输过来数据
    const {
        username,
        password,
        vcode

    } = req.body
    // 校验验证码
    // console.log(vcode,req.session.vcode);

    if (vcode != req.session.vcode) {
        result.status = 1;
        result.message = "验证码不正确";

        res.json(result);
        return;
    }

    databasetool.findYige('accountInfo', {
        username,
        password
    }, (err, doc) => {
        if (!doc) {
            result.status = 2
            result.message = '用户名或者密码错误'

        }
        res.json(result)
    })
}