/*
**                                    _oo0oo_
**                                   o8888888o
**                                   88" . "88
**                                   (| -_- |)
**                                   0\  =  /0
**                                 ___/`---'\___
**                               .' \\|     |// '.
**                              / \\|||  :  |||// \
**                             / _||||| -:- |||||- \
**                            |   | \\\  -  /// |   |
**                            | \_|  ''\---/''  |_/ |
**                            \  .-\__  '-'  ___/-. /
**                          ___'. .'  /--.--\  `. .'___
**                       ."" '<  `.___\_<|>_/___.' >' "".
**                      | | :  `- \`.;`\ _ /`;.`/ - ` : | |
**                      \  \ `_.   \_ __\ /__ _/   .-` /  /
**                  =====`-.____`.___ \_____/___.-`___.-'=====
**                                    `=---='
**
**
**                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**
**                             佛祖保佑         永无BUG
*/


/*
**  Library
*/

const express = require('express');
const app = new express();
const { URL } = require('url');
const session = require('express-session');
const router = require('./routers/index.js');

const PORT = 3000;
/* ejs */
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);
app.use(express.static('static'));
app.use('/static',express.static('static'));
/* session */
app.use(session({
  secret: 'happy fat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,maxAge: 1000*60*30 },
  rolling: true
}));

/*
**  权限判断
*/
app.use(function(req,res,next){
  var referer = "";
  if(req.headers.referer){
    referer = new URL(req.headers.referer).pathname;
  }
  if(req.url == '/login' || (req.url == '/check' && referer == '/login')){
    next();
  } else if(req.session.userinfo && req.session.userinfo.username != ''){
    app.locals['userinfo'] = req.session.userinfo;//配置ejs全局参数
    next();
  }else {
    res.redirect('/login');//重定向
  }
});

//配置路由
app.use('/',router);

app.listen(PORT,function(){
  console.log('server running at localhost:3000');
});
