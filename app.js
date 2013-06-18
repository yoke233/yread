module.exports.conf = require('./conf/conf'); //详细说明见github上 
var domain = require('domain'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    zlib = require('zlib');
var serverDm = domain.create();
var processPath = path.dirname(process.argv[1]);
var rrest = require('rrestjs');
serverDm.run(function () {
 	server = http.createServer(function(req, res) {
        fs.readFile(processPath + '/web/index.html', 'utf8', serverDm.intercept(function (data) {
            res.send(data);
        }));
 	}).listen(rrest.config.listenPort);
});