/*
**  express
*/
var express = require('express');
var app = new express();

const listenPort = 3000;

/*
** Mongodb
*/
var MongoClient = require('mongodb').MongoClient;
const datbase = 'mongodb://test:test@127.0.0.1/school';
const dbName = 'school';

/*
** express-session to mongodb
*/
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var store = new MongoStore({url: datbase,touchSfter: 24 * 3600});
store.on('connected',function(){
  // 开启监听
  app.listen(listenPort,function(){
    console.log('running at http://localhost:3000');
  });
});
/*
** 监听各种事件 create touch update set destroy  如果有需要的话
*/
store.on('destroy',function(id){
  console.log('session destory:',id);
});
app.use(session({
  secret: 'happy cat',
  resave: false,
  saveUninitialized: true,
  cookie:{
    secure: false,
    maxAge: 60*60*1000
  },
  rolling:true,
  store: store
}));
//配置路由
app.get('/',function(req,res){
  if(req.session.userinfo){
    res.send('欢迎回来：'+ req.session.userinfo);
  } else {
    res.send('请先登陆');
  }
});
app.get('/login',function(req,res){
  req.session.userinfo = 'admin';
  res.send('登陆成功');
});
app.get('/logout',function(req,res){
  req.session.destroy(function(err){
    if(err){
      res.send('session destroy failed');
    }
    res.send('destroy success!!');
  });
});
app.get('/student',function(req,res){
  MongoClient.connect(datbase,function(err,client){
    if(err){
      console.log('数据库服务器链接失败',err);
      return false;
    }
    const db = client.db(dbName);
    db.collection('student').find({'age':{$gt:10,$lte:30}}).toArray(function(err,doc){
      if(err){
        console.log('查询失败',err);
        return false;
      }
      res.send(JSON.stringify(doc));
      client.close();
    });
  });
});
