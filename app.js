 module.exports.conf = require('./conf/conf'); //详细说明见github上 
 var http = require('http'),
 	rrest = require('rrestjs'),
 	server = http.createServer(function(req, res) { //完全原生的node.js手册代码风格，没有学习门槛
 		res.send('hello world everyone!'); //rrestjs封装了一个res.send方法，用来响应客户端的请求
 	}).listen(rrest.config.listenPort); //读取配置文件的监听端口号，只需修改配置文件即可轻松部署