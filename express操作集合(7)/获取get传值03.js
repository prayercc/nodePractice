var express = require('express');
var app = new express();

const listenPort = 3000;

app.listen(listenPort,function(){
  console.log('running at http://localhost:3000');
});


/*
** 获取get传值   /product?aid=123
*/
app.get("/product",function(req,res){
  //获取get传值
  console.log(req.query);
  res.send('product' + JSON.stringify(req.query));
});
