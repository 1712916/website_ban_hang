const Passport=require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const modelAdmin = require('../models/admin');


Passport.serializeUser(function(admin,done){
    done(null,admin.id);
});

Passport.deserializeUser(function(id,done){
    modelAdmin.findById(id,function(err,admin){
        done(err,admin);
    });
});



Passport.use('local.signup',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
        
},function(req,email,password,done){
           
  //  var email=req.body.email;
    var name=req.body.name;
    var phone=req.body.phone;
    //var password=req.body.password
    var confirmPassword=req.body.confirmPassword;
    console.log('name:' +name);
    console.log('name:' +phone);
    console.log('name:' +confirmPassword);

    if(name==''||phone==''||email==''||password==''||confirmPassword==''){
        req.flash('message','Điền đầy đủ thông tin');
        return done(null,false);
    }
    if(password!=confirmPassword){
        req.flash('message','Nhập password giống nhau hai lần');
        return done(null,false);
    }

       
        modelAdmin.findOne({ 'email':email},function(err,admin){
            if(err){
                return done(err);
            }
            if(admin){
                req.flash('message','Email không hợp lệ!');
               return done(null,false);
            }
            const newAdmin=new modelAdmin();
            newAdmin.email=email;
            newAdmin.password=newAdmin.encryptPassword(password);
            newAdmin.name=name;
            newAdmin.phone=phone;
            newAdmin.permission="0";
    
     
            newAdmin.save(function(err,res){
                if(err){
                    return done(err);
                }
                const newAdmin2=new modelAdmin();
                return done(null,newAdmin2);
            });
        });
}));


Passport.use('local.signin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req,email,password,done){
    modelAdmin.findOne({'email':email},function(err,admin){
        if(err){
            return done(err);
        }
       
        if(!admin){
            //ko co user
            req.flash('email',email);
           return done(null,false,req.flash('message', 'Sai mật khẩu hoặc tài khoản.'));
        }
        if(!admin.validPassword(password)){
              //mat khau khong dung
              req.flash('email',email);
           return done(null,false,req.flash('message','Sai mật khẩu hoặc tài khoản.'));
        }
        if(admin.permission=="0"){
            req.flash('email',email);
            return done(null,false,req.flash('message','Tài khoản cần được cấp quyền truy cập hệ thống.'));
        }
        if(admin.permission=="-1"){
            req.flash('email',email);
            return done(null,false,req.flash('message','Tài khoản của bạn bị khóa.'));
        }
        
        return done(null,admin);
    });
}));


var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }

  }
  function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
      return next();
    }
   
  }



  
  module.exports.isLoggedIn = isLoggedIn;
  module.exports.notLoggedIn = notLoggedIn;