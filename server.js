module.exports.conf = require('./conf/conf');
var domain = require('domain'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    zlib = require('zlib');
var serverDm = domain.create();
var processPath = path.dirname(process.argv[1]);
global.yRead = {}; // 注册全局变量yRead
yRead.version = '0.0.1';

serverDm.on('error', function (err) {
    delete err.domain;
    yRead.errlog.error(err);
});
serverDm.run(function() {
    yRead.conf = module.exports.conf = require('./conf/conf'); // 注册rrestjs配置文件
    yRead.module = {};
    yRead.module.rrestjs = require('rrestjs');
/*    yRead.module.marked = require('marked');
    yRead.module.mongoskin = require('mongoskin');
    yRead.module.nodemailer = require('nodemailer');*/
    yRead.errlog = yRead.module.rrestjs.restlog;
    yRead.lib = {};
/*    yRead.lib.tools = require('./lib/tools.js');
    yRead.lib.CacheLRU = require('./lib/cacheLRU.js');
    yRead.lib.CacheTL = require('./lib/cacheTL.js');
    yRead.lib.msg = require('./lib/msg.js');
    yRead.lib.json = require('./lib/json.js');
    yRead.lib.converter = require('./lib/anyBaseConverter.js');
    yRead.lib.email = require('./lib/email.js');*/
    yRead.dao = {};
    yRead.cache = {};
    yRead.api = {};

    creatServer();
});

function creatServer() {
    server = http.createServer(function(req, res) {
        var dm = domain.create();
        dm.on('error', function (err) {
            console.log(err);
            delete err.domain;
            err.type = 'error';
            try {
                res.on('finish', function () {
                    //yRead.dao.db.close();
                    process.nextTick(function () {
                        dm.dispose();
                    });
                });
                if (err.hasOwnProperty('name')) {
                    res.sendjson({
                        err: err
                    });
                } else {
                    //console.log('ReqErr:******************');
                    console.log(req.session + ':' + req.method + ':' + req.path);
                    yRead.errlog.error(err);
                    res.sendjson({
                        err: {
                            name: '请求错误',
                            message: '对不起，请求出错了！',
                            type: 'error',
                            url: '/'
                        }
                    });
                }
            } catch (err) {
                delete err.domain;
                //console.log('CatchERR:******************');
                yRead.errlog.error(err);
                dm.dispose();
            }
        });
        dm.run(function () {
            if (req.path[0] === 'api' && yRead.api[req.path[1]]) {
                yRead.api[req.path[1]][req.method.toUpperCase()](req, res, dm);
                if (req.path[1] === 'index') {
                    yRead.api.index.updateOnlineCache(req);
                }
            } else {
                res.setHeader("Content-Type", "text/html");
                if (yRead.indexTpl) {
                    res.send(yRead.indexTpl);
                } else {
                    fs.readFile(processPath + '/web/index.html', 'utf8', serverDm.intercept(function (data) {
                    //    yRead.indexTpl = data;
                        res.send(data);
                    }));
                }
            }
        });
    }).listen(yRead.module.rrestjs.config.listenPort);
};