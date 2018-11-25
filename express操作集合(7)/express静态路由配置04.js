/*
**  express 是对http的扩展封装
** 里面集合了 http,ejs ,ejs安装后可以直接使用，不需要引入
** 但需要配置模板引擎
*/
var express = require('express');
var app = new express();
// 端口号
const listenPort = 3000;
//配置ejs模板引擎
app.set('view engine','ejs');
//模板默认位置(可修改)
//app.set('views',__dirname+'/views');
/*
**  路由匹配优先级  静态路由 > 配置的路由
*/
//配置静态路由,一些静态资源
app.use(express.static('static'));
//app.use('/head',express.static('public'))  配置虚拟目录, 前端访问head的转换为访问后台public的
// 开启监听
app.listen(listenPort,function(){
  console.log('running at http://localhost:3000');
});

//配置路由
app.get('/',function(req,res){
  res.render('index');
});
app.get('/list',function(req,res){
  res.render('list',{
    list: [
      {
        id: '10001',
        name: 'Alisa',
        age: 12
      },
      {
        id: '10002',
        name: 'Bob',
        age: 13
      },
      {
        id: '10003',
        name: 'Craffe',
        age: 11
      }
    ]
  },);
});
