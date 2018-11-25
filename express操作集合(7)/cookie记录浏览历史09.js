/*
**  cookie-parser  cookie操作浏览历史
*/
var express = require('express');
var app = new express();
//配置 cookieParser
var cookieParser = require('cookie-parser');
app.use(cookieParser());//传入参数作为加密密码
// 端口号
const listenPort = 3000;
//配置路由
app.get('/',function(req,res){
  res.send('你浏览过的城市: '+ JSON.stringify(req.cookies.cityNames));
});
app.get('/visit',function(req,res){
  var city = req.query.city;
  var allCitys = req.cookies.cityNames;
  if(allCitys){
    allCitys.push(city);
  } else {
    allCitys = [];
    allCitys.push(city);
  }
  res.cookie('cityNames',allCitys,{maxAge:60*1000*10});
  res.send('ok: '+ city);
});
// 开启监听
app.listen(listenPort,function(){
  console.log('running at http://localhost:3000');
});
