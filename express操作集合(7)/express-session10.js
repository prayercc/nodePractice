/*
**  session  负载均衡 多个服务器共享session
*/
var express = require('express');
var app = new express();
//使用session
var session = require('express-session');
//配置session
app.use(session({
  secret: 'happy cat',//加密字符串，和加密cookie作用一样
  name: 'pinkCat',//session id在前端的名字，默认connect.sid
  resave: false,//强制保存session
  saveUninitialized: true,//强制将未初始化的session存储,默认ture
  cookie: { secure: false,maxAge:1000*60 },// 和cookie配置一样
  rolling: true //每次请求后更新过期时间
}));
// 端口号
const listenPort = 3000;
//配置路由
app.get('/',function(req,res){
  //获取session,直接访问
  if(req.session.userinfo){
    res.send('欢迎回来: '+req.session.userinfo);
  }else {
    res.send('未登录');
  }

});
app.get('/login',function(req,res){
  //给这个链接设置session 在req对象中
  req.session.userinfo = 'admin';
  res.send('session');
});
app.get('/logout',function(req,res){
  //销毁session
  //req.session.cookie.maxAge = 0;
  req.session.destroy(function(err){
    console.log('销毁成功');
  })
  res.send('log out success');
});
// 开启监听
app.listen(listenPort,function(){
  console.log('running at http://localhost:3000');
});
