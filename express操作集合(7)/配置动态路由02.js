var express = require('express');
var app = new express();

const listenPort = 3000;

app.listen(listenPort,function(){
  console.log('running at http://localhost:3000');
});


/*
** 配置动态路由
*/
app.get("/news/:aid",function(req,res){
  //获取传值
  var aid = req.params.aid;
  res.send('express'+aid);
});
