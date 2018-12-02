/*
** library
*/
const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const md5 = require('md5-node');
const DB = require('../modules/db.js');
/*
** 引入其他子路由并配置
*/
const product = require('./config/product.js');
router.use('/product',product);

/*
** 本模块路由
*/

//登陆
router.get('/login',function(req,res){
  res.render('login/login.html');
});
//检查
router.post('/check',function(req,res){
    var form = new multiparty.Form();
    form.parse(req,function(err,fields,files){
      var whereStr = {
        username : fields.username[0],
        password : md5(fields.password[0])
      };
      DB.find('user',whereStr,function(err,doc){
        if(err){
          console.log('查询失败',err);
          return false;
        }
        if(doc.length > 0){
              req.session.userinfo = doc[0];//保存用户信息
              res.redirect('/product');//重定向
        } else {
              res.send("<script>alert('登录失败');location.href='/login'</script>");
        }
      });
    });
});
//退出
router.get('/logout',function(req,res){
  req.session.destroy(function(err){
    if(err){
      console.log('退出失败',err);
    }else{
      res.redirect('/login');//重定向
    }
  });
});
module.exports = router;
