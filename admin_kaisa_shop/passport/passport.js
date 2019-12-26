const Passport=require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const modelAdmin = require('../models/admin');


Passport.serializeUser(function(admin,done){
    done(null,admin.id);
});

Passport.deserializeUser(function(id,done){
    modelUser.findById(id,function(err,admin){
        done(err,admin._id);
    });
});


Passport.use('local.signup',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
},function(req,email,passport,done){
        modelUser.findOne({ 'email':email},function(err,admin){
            if(err){
                return done(err);
            }
            if(admin){
               return done(null,false);
            }
            const newAdmin=new modelAdmin();
            newAdmin.email=email;
            newAdmin.password=newAdmin.encryptPassword(passport);
            newAdmin.name=document.getElementById("name").value;
            newAdmin.dateOfBirth=document.getElementById("birthday").value;
           // document.getElementById("uniqueID").value;
            newAdmin.save(function(err,res){
                if(err){
                    return done(err);
                }
                return done(null,newAdmin);
            });
        });
}));


Passport.use('local.signin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req,email,password,done){
    modelUser.findOne({'email':email},function(err,admin){
        if(err){
            return done(err);
        }
        if(!admin){
            //ko co user
           return done(null,false);
        }
        if(!admin.validPassword(password)){
              //mat khau khong dung
           return done(null,false);
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
    res.redirect('/');
  }
  function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
      return next();
    }
    res.redirect('/');
  }

  module.exports.isLoggedIn = isLoggedIn;
  module.exports.notLoggedIn = notLoggedIn;