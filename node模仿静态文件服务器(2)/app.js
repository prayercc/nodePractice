/*
** HTTP,URL,PATH,FS 创建web服务器
*/
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var events = require('events');
var mimeModel = require('./mode/getmime.js');

const listenPort = '8080';
var getMimeEmitter = new events.EventEmitter();//获取mime的事件对象

 var server = http.createServer(function(req,res){
	//获取请求url
	var pathname = url.parse(req.url).pathname;
	//默认显示主页 
	if(pathname == '/'){ pathname = '/index.html';}
	//获取后缀
	var extname = path.extname(pathname);
	//获取文件类型
	fs.readFile('./static'+pathname,function(err,data){
		if(err){
			fs.readFile('./static/404.html',function(err,data404){
				res.writeHead(404,{"Content-Type":"text/html;charset=utf-8"});
				res.write(data404);
				res.end();
			});
		}else {
			var EventName = 'getMime';
			mimeModel.getMime(fs,getMimeEmitter,EventName,extname);
			getMimeEmitter.on(EventName,function(mime){
				res.writeHead(200,{"Content-Type":""+mime+";charset=utf-8"});
				res.end(data);
			});
			
		}
	});
	
 });
 
 server.listen(listenPort,function(){
	 console.log('server running at http://localhost:8080');
 });

 
  