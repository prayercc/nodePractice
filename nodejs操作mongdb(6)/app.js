var http = require('http');
var ejs = require('ejs');
var app = require('./express-route.js');
var MongoClient = require('mongodb').MongoClient;

//运行端口号
const SERVERPORT = 3000;
/*
**创建服务器,运行在指定接口
*/
http.createServer(app).listen(SERVERPORT,function(){
  console.log('running at http://localhost:3000');
});
/*
**注册GET方法
*/
app.get('/',function(req,res){
   ejs.renderFile('views/index.ejs',{},function(err,data){
     res.send(data);
   });
});
app.get('/test',function(req,res){
  res.send('test');
});
/*
** Mongodb 操作
*/

//mongodb服务器地址
const DBADDRESS = 'mongodb://127.0.0.1:27017/';
const DBNAME = 'test';
//////////////////////////增加
app.get('/add',function(req,res){
  //连接数据库
  MongoClient.connect(DBADDRESS,function(err,client){
    if(err){
      console.log('数据库连接失败',err);
      return false;
    }
    const db = client.db(DBNAME);  //选择数据库db对象
    //使用db对象,对特定student 集合进行操作
    db.collection('class').insertOne({'student_no':'10001','name':'终极一班','peopleNum':'30','teacher':'王五'},function(err){
      if(err){
        console.log('增减失败',err);
        return false;
      }
      res.send('增加成功');
      client.close();
    })
  })
});
//////////////////////////修改
app.get('/update',function(req,res){
  //连接数据库
  MongoClient.connect(DBADDRESS,function(err,client){
    if(err){
      console.log('数据库连接失败',err);
      return false;
    }
    const db = client.db(DBNAME);  //选择数据库db对象
    //使用db对象,对特定student 集合进行操作
    db.collection('student').updateOne({'name':'Nodejs'},{$set:{'age':120}},function(err,data){
      if(err){
        console.log('修改失败',err);
        return false;
      }
      res.send('修改成功');
      client.close();
    })
  })
});
//////////////////////////删除
app.get('/delete',function(req,res){
  //连接数据库
  MongoClient.connect(DBADDRESS,function(err,client){
    if(err){
      console.log('数据库连接失败',err);
      return false;
    }
    const db = client.db(DBNAME);  //选择数据库db对象
    //使用db对象,对特定student 集合进行操作
    db.collection('student').deleteOne({'name':'Nodejs'},function(err,data){
      if(err){
        console.log('删除失败',err);
        return false;
      }
      res.send('删除成功');
      client.close();
    });
  });
});
  //////////////////////////查询
  app.get('/find',function(req,res){
    //连接数据库
    MongoClient.connect(DBADDRESS,function(err,client){
      if(err){
        console.log('数据库连接失败',err);
        return false;
      }
      const db = client.db(DBNAME);  //选择数据库db对象
      //使用db对象,对特定student 集合进行操作
      var data = [];
      var whereStr = {"age":{$gte:20,$lt:80}};
      //var result = db.collection('student').find(whereStr);
      //遍历出数据
      // result.each(function(err,doc){
      //   if(err){
      //     console.log('查询失败',err);
      //     return false;
      //   }
      //   if(doc != null){
      //     data.push(doc);
      //   } else {
      //     //数据循环完成
      //   res.send(JSON.stringify(data));
      //   }
      // });
      db.collection('student').find(whereStr).toArray(function(err,doc){
        if (err) throw err;
        console.log(doc);
        res.send('suc');
        client.close();
      })
      client.close();
    });
});
//////////////////////////联合查询
app.get('/union',function(req,res){
  //连接数据库
  MongoClient.connect(DBADDRESS,function(err,client){
    if(err){
      console.log('数据库连接失败',err);
      return false;
    }
    const db = client.db(DBNAME);  //选择数据库db对象
    db.collection('student').aggregate([
      {
        $lookup: {
          from:"class",
          localField:"class_no",
          foreignField:"class_no",
          as:"detail"
        }
      },{
        $match: {$or:[{"student_no":11111},{"student_no":11112}]}
      },{
        $project: {"class_no":1,"student_no":1}
      }]).toArray(function(err,doc){
      if (err) throw err;
      console.log(doc);
      res.send(JSON.stringify(doc));
      client.close();
    });
    client.close();
  });
});
