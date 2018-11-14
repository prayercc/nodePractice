var http = require('http');
http.createServer(function(req,res){
	res.writeHead(200,{"Content-type":"text/html;charset=utf-8"});
	res.write('emmmmm');
	res.end('哇哇哇哇');
}).listen(8080,function(){
	console.log('run at http://localhost:8080');
});

