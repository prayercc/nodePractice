/*
**   仿照express封装请求
**   create by prayer   2018/11/14
*/
var url = require('url');

var Server = function(){

  /*
  **管理所有方法,_get,_post分别处理get与post请求
  */
  var G = this;
  this._GET = {};
  this._POST = {};

  /*
  **触发方法
  */
  var app = function(req,res){

    /*
    **封装res.send方法
    */
    res.send = function(data){
      res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
      res.end(data);
    }

    /*
    **获取路由，并规范化路由格式  /index -> /index/
    */
    var pathname = url.parse(req.url).pathname;
    if(!pathname.endsWith('/')){
      pathname += '/';
    }
    /*
    **获取请求方式,统一大小写
    */
    var method = req.method.toUpperCase();
    /*
    **如果该方法注册过,触发对应回调函数
    */
    if(G['_'+ method][pathname]){
      var postStr = '';
      if(method == 'POST'){
        /*
        ** 获取post的数据
        */
        req.on('data',function(chunk){
          postStr += chunk;
        });
        req.on('end',function(err){
          /*
          **拿到数据后,传给一个指定值(body),等待被使用
          */
          req.body =  postStr.toString();
          G['_'+ method][pathname](req,res);
        });
      } else {
        G['_'+ method][pathname](req,res);
      }
    } else {
      //处理没有注册过的路由
      res.end('no router!!!');
    }
  };
  /*
  **get 方法
  */
  app.get = function(string,callback){
    //调整string规格 ''/index' => '/index/'
    if(!string.endsWith('/')){
      string += '/';
    }
    if(!string.startsWith('/')){
      string = '/' + string;
    }
    //注册方法
    G._GET[string] = callback;
  }
  /*
  **post 方法
  */
  app.post = function(string,callback){
    //调整string规格 /index => /index/
    if(!string.endsWith('/')){
      string += '/';
    }
    if(!string.startsWith('/')){
      string = '/' + string;
    }
    //注册方法
    G._POST[string] = callback;
  } 
  /*返回方法*/
  return app;
}
module.exports = Server();
