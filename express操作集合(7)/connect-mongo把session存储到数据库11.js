/*
**  session  负载均衡 多个服务器共享session  connect-mongo
*/
var express = require('express');
var app = new express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
//配置session
app.use(session({
  secret: 'happy cat',
  name: 'pinkCat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,maxAge:1000*60 },
  rolling: true,
  //配置 connect-mongo
  store : new MongoStore({
    url: 'mongodb://127.0.0.1:27017/test',
    touchSfter: 24 * 3600
  })
}));
// 端口号
const listenPort = 3000;
//配置路由
app.get('/',function(req,res){
  if(req.session.userinfo){
    res.send('欢迎回来: '+ req.session.userinfo);
  }else {
    res.send('未登录');
  }

});
app.get('/login',function(req,res){
  req.session.userinfo = 'admin';
  res.send('session');
});
app.get('/logout',function(req,res){
  req.session.destroy(function(err){
    console.log('销毁成功');
  })
  res.send('log out success');
});
// 开启监听
app.listen(listenPort,function(){
  console.log('running at http://localhost:3000');
});
