/*
**  cookie-parser  cookie中间件
*/
var express = require('express');
var app = new express();
//配置 cookieParser
var cookieParser = require('cookie-parser');
app.use(cookieParser('123456'));//传入参数作为加密密码
// 端口号
const listenPort = 3000;
//配置路由
app.get('/',function(req,res){
  res.send('express');
});
app.get('/set',function(req,res){
  // 名字  值  cookie配置信息
  res.cookie('userInfo','cookieValue',{
    //domain:'.aaa.com', //aaa.com下所有子域名共享cookie
    maxAge:600000,//寿命时间
    //secure: true,//http中无效，https才有效
    httpOnly: true,//cookie的值只有在服务端才能设置，防止攻击
    //path:'/news',//在news下才有效
    signed: true //签名cookie
  });
  res.send('设置成功');
});
app.get('/news',function(req,res){
  //res.send('news: '+JSON.stringify(req.cookies));
  //提取签名了的cookie
  res.send('news: '+JSON.stringify(req.signedCookies));
});
// 开启监听
app.listen(listenPort,function(){
  console.log('running at http://localhost:3000');
});
