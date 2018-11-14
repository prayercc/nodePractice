/*
 ** 使用ejs后台模板
 */
//library
var http = require('http');
var url = require('url');
var model = require('./model/model.js');


//running port
const listenPort = '3000';



//server
var server = http.createServer(function(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf-8"
  });

  var pathname = url.parse(req.url).pathname.replace('/', '');
  if (pathname != 'favicon.ico') {
    try {
      model[pathname](req, res);
    } catch (err) {
      model['home'](req, res);
    }
  }
});



//run
server.listen(listenPort, function() {
  console.log('server running at http://localhost:8080');
});
