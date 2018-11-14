var ejs = require('ejs');

var app = {
  login: function(req,res){
    console.log('login');
    ejs.renderFile('views/index.ejs',{},function(err,data){
      res.end(data);
    });
  },
  register: function(req,res){
    console.log('register');
    ejs.renderFile('views/index.ejs',{},function(err,data){
      res.end(data);
    });
  },
  home: function(req,res){
    console.log('home');
    ejs.renderFile('views/index.ejs',{},function(err,data){
      res.end(data);
    });
  }
}

//export
module.exports = app;
