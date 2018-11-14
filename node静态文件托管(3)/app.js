/*
** HTTP,URL,PATH,FS 创建web服务器
*/
var http = require('http');
var url = require('url');
var router = require('./mode/router.js');

const listenPort = '8080';


 var server = http.createServer(function(req,res){
	router.statics(req,res,'static');//静态文件托管
	//路由  根据不同url 运行不同程序
	var pathname = url.parse(req.url).pathname;
	if(pathname == '/login'){
		res.end('login');
	} else if(pathname == '/register'){
		res.end('register');
	} else {
		res.end('index');
	}
 });
 
 server.listen(listenPort,function(){
	 console.log('server running at http://localhost:8080');
 });

 
  