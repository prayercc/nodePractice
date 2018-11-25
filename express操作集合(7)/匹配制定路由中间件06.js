var express = require('express');
var app = new express();
// 端口号
const listenPort = 3000;

/*
**  匹配制定路由, 应用级中间件
*/
app.use('/',function(req,res,next){
  console.log('app use应用级路由匹配制定路由');
  next();//继续向下匹配
});
// 开启监听
app.listen(listenPort,function(){
  console.log('running at http://localhost:3000');
});

//配置路由

/*
** 路由中间件
*/
app.get('/',function(req,res,next){
  console.log('匹配路由后，后台操作');
  next();
});
app.get('/',function(req,res){
  res.send('匹配路由后，返回给前端');
});
