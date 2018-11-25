var express = require('express');
var app = new express();

const listenPort = 3000;

app.listen(listenPort,function(){
  console.log('running at http://localhost:3000');
});

/*
** 配置路由
*/
app.get("/",function(req,res){
  res.send('express');
});
