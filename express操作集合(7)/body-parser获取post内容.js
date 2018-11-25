/*
**   第三方中间件  like:  body-parser
*/
var express = require('express');
var app = new express();
// ejs配置
app.set('view engine','ejs');

/*
** body-parser
*/
var bodyParser = require('body-parser');
//parse application/x-www-form-urlencode  常见表单数据
app.use(bodyParser.urlencoded({extended: false}));
//parse application/json   json数据
app.use(bodyParser.json());

// 端口号
const listenPort = 3000;
//配置路由
app.get('/',function(req,res){
  res.send('express');
});
app.get('/login',function(req,res){
  res.render('login');
});
app.post('/check',function(req,res){
  res.send(JSON.stringify(req.body));
});
// 开启监听
app.listen(listenPort,function(){
  console.log('running at http://localhost:3000');
});
