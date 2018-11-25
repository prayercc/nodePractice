/*
** 中间件：就是匹配路由之前和匹配路由之后做的一系列的操作
*/
var express = require('express');
var app = new express();
// 端口号
const listenPort = 3000;

/* 中间件：表示匹配任何路由（应用级中间件）*/
/*  常用于：权限判断 （没有登陆，跳转到登陆页面）*/
app.use(function(req,res,next){
  console.log("匹配时间：",new Date());
  next();//路由继续向下匹配
})

// 开启监听
app.listen(listenPort,function(){
  console.log('running at http://localhost:3000');
});

//配置路由
app.get('/',function(req,res){
  res.send('hello express233!');
});
