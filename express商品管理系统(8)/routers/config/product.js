/*
**   library
*/
const express = require('express');
const router = express.Router();
const fs = require('fs');
const multiparty = require('multiparty');
const DB = require('../../modules/db.js');
//商品列表
router.get('/',function(req,res){
    DB.find('product',{},function(err,doc){
      if(err){
        console.log('查询失败',err);
        return false;
      }
      res.render('product/product.html',{list:doc});
    });
});
//商品增加表单
router.get('/add',function(req,res){
    res.render('product/add.html');
});
//新增操作
router.post('/doAdd',function(req,res){
  var form = new multiparty.Form({uploadDir:'static/upload'});
  form.parse(req,function(err,fields,files){
    var postData = {
      title : fields.title[0],
      price : fields.price[0],
      fee : fields.fee[0],
      description : fields.description[0],
      pic : files.pic[0].path
    };
    DB.insertOne('product', postData, function(err,doc){
      if(err){
        console.log('增加失败',err);
        return false;
      }
      res.redirect('/product');
    });
  });
});
router.get('/edit',function(req,res){
  var id= new DB.ObjectID(req.query.id);//获取自增长id
  DB.find('product',{"_id":id},function(err,doc){
      res.render('product/edit.html',{
        list: doc[0]
      });
  });
});
router.post('/doEdit',function(req,res){
   var form = new multiparty.Form({uploadDir:'static/upload'});
   form.parse(req,function(err,fields,files){
     //更新条件
     var condition = {"_id":new DB.ObjectID(fields._id[0])};
     //更新信息
     var postData = {
      title : fields.title[0],
      price : fields.price[0],
      fee : fields.fee[0],
      description : fields.description[0]
    };
    //判断图片修改
    if(files.pic[0].originalFilename){
      postData["pic"] = files.pic[0].path;
      //删除之前的图片
      fs.unlink(fields.picOld[0],function(err){
        if(err){
          consoe.log('删除之前图片失败');
        }
      });
    } else {
      //删除零时文件
      fs.unlink(files.pic[0].path,function(err){
        if(err){
          console.log('删除零时文件失败');
        }
      });
    }
    //更新数据
    DB.updateOne('product', condition ,postData, function(err,doc){
      if(err){
        console.log('修改失败',err);
        return false;
      }
      res.redirect('/product');
    });
  });
});
router.get('/delete',function(req,res){
  var whereStr  = {"_id": new DB.ObjectID(req.query.id)};
  DB.deleteOne('product',whereStr,function(err,doc){
    if(err){
      console.log('删除失败',err);
      return false;
    }
    res.redirect('/product');
  });
});
module.exports = router;
