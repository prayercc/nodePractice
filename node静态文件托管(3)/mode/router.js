var fs = require('fs');
var path = require('path');
var url = require('url');
var events = require('events');


var getMimeEmitter = new events.EventEmitter();//获取mime的事件对象
//获取文件类型
function getMime(getMimeEmitter,EventName,extname){  
    fs.readFile('mode/mime.json',function(err,data){
		if(err) {
			console.log(err);
			return false;
		}
		var Mines = JSON.parse(data.toString());
		getMimeEmitter.emit(EventName, Mines[extname] || 'text/html');
	}); 
}

exports.statics = function(req,res,staticPath){
	//获取请求url
	var pathname = url.parse(req.url).pathname;
	//默认显示主页 
	if(pathname == '/'){ pathname = '/index.html';}
	//获取后缀
	var extname = path.extname(pathname);
	//获取文件类型
	fs.readFile(staticPath + pathname,function(err,data){
		if(err){
			fs.readFile(staticPath +'/404.html',function(err,data404){
				res.writeHead(404,{"Content-Type":"text/html;charset=utf-8"});
				res.write(data404);
				res.end();
			});
		}else {
			var EventName = 'getMime';//指定事件名
			getMime(getMimeEmitter,EventName,extname);
			getMimeEmitter.on(EventName,function(mime){
				res.writeHead(200,{"Content-Type":""+mime+";charset=utf-8"});
				res.end(data);
			});
			
		}
	});
}