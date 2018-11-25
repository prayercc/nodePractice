/*
**   错误处理中间件
*/
var express = require('express');
var app = new express();
// 端口号
const listenPort = 3000;
//配置路由
app.get('/',function(req,res){
  res.send('匹配路由后，返回给前端');
});
//写到最后
app.use(function(req,res){
  res.status(404).send('这是404页面');
});
// 开启监听
app.listen(listenPort,function(){
  console.log('running at http://localhost:3000');
});
