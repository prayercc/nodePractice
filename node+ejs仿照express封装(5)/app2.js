var http = require('http');
var ejs = require('ejs');
var app = require('./express-route.js');

const SERVERPORT = 3000;
/*创建服务器*/
http.createServer(app).listen(SERVERPORT,function(){
  console.log('running at http://localhost:3000');
});
/*注册GET方法*/
 app.get('/login',function(req,res){
   ejs.renderFile('views/index.ejs',{},function(err,data){
     res.send(data);
   });
 });
 app.get('/register',function(req,res){
   ejs.renderFile('views/register.ejs',{},function(err,data){
     res.send(data);
   });
 });
 /*注册POST方法*/
 app.post('/dologin',function(req,res){
   ejs.renderFile('views/dologin.ejs',{formData:req.body},function(err,data){
     res.send(data);
   });
 });
