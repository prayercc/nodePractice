/*
** 模仿express封装请求
** 完成静态服务器搭建
*/
var http = require('http');
var url = require('url');



const G = {};

var app = function(req,res){
  //获取接口名字
  var pathname = url.parse(req.url).pathname;
  if(!pathname.endsWith('/')){
    pathname += '/';
  }
  //触发对应回调函数
  if(G[pathname]){
    G[pathname](req,res);
  } else {
    res.end('no router!!!');
  }
}

app.get = function(string,callbask){
  // 统一接口 index => /index/
  if(!string.endsWith('/')){
    string += '/';
  }
  if(!string.startsWith('/')){
    string = '/' + string;
  }
  G[string] = callbask; //注册方法
}

app.post = function(){
  console.log('app.post');
}



//一但访问，就会触发相对的回调函数
http.createServer(app).listen(3000, function(){ console.log('running at http://localhost:3000'); });

//注册login方法
app.get('login',function(req,res){
  res.end('login');
});
app.get('register',function(req,res){
  res.end('register');
})
