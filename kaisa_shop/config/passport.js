// config/passport.js
// load các module
var passport = require('passport');
// load  user model
var User = require('../models/user.model');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var randomstring = require('randomstring');
var nodemailer = require("nodemailer");
// passport session setup
// Lấy thông tin những giá trị auth
var configAuth = require('./auth');
// used to serialize the user for the session


passport.serializeUser(function (user, done) {
  done(null, user.id);
})
// used to deserialize the user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  })
})

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fungviet@gmail.com',
    pass: 'cqcgleoecjuwuppl'
  }
});

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

// local sign-up
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, done) {
  if (email)
    email = email.toLowerCase();
  process.nextTick(function () {
    // if the user is not already logged in:
    if (!req.user) {
      User.findOne({ 'local.email': email }, function (err, user) {
        if (err) { return done(err); }
        if (user) {
          return done(null, false, { message: 'Email is already in use.' })
        }
        var newUser = new User();
        var permalink = req.body.email.toLowerCase().replace(' ', '').replace(/[^\w\s]/gi, '').trim();
        var verification_token = randomstring.generate({
          length: 64
        });
        newUser.local.email = email;
        newUser.local.password = newUser.encryptPassword(password);
        newUser.local.verified = false;
        newUser.local.verify_token = verification_token;

        var mailOptions = {
          from: 'fungviet@gmail.com',
          to: email,
          subject: 'Veryfy',
          text: 'Click to this link for veryfy: ' + `http://localhost:9999/comfirmation/${verification_token}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        newUser.save(function (err) {
          if (err) {
            console.log(err);

          } else {
            return done(null, newUser);
          }
        });

      });
    }
  }
  )
}));


// local sign-in
passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, done) {
  if (email)
    email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

  // asynchronous
  process.nextTick(function () {
    User.findOne({ 'local.email': email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Not user found' })
      }
      if (!user.validPassword(password)) {

        return done(null, false, { message: 'Wrong password' })
      }
      return done(null, user);

    });
  }
  )
}));

passport.use(new FacebookStrategy({
  // điền thông tin để xác thực với Facebook.
  // những thông tin này đã được điền ở file auth.js
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret,
  callbackURL: configAuth.facebookAuth.callbackURL
},
  // Facebook sẽ gửi lại chuối token và thông tin profile của user
  function (token, refreshToken, profile, done) {
    // asynchronous
    process.nextTick(function () {
      // tìm trong db xem có user nào đã sử dụng facebook id này chưa
      console.log(" \n\n### " + profile._json.name);

      User.findOrCreate({ 'facebook.id': profile.id }, function (err, user) {
        if (err)
          return done(err);
        // Nếu tìm thấy user, cho họ đăng nhập
        if (user) {
          return done(null, user); // user found, return that user
        } else {
          // nếu chưa có, tạo mới user
          var newUser = new User();
          // lưu các thông tin cho user

          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // bạn có thể log đối tượng profile để xem cấu trúc
          newUser.facebook.email = profile.emails[0].value; // fb có thể trả lại nhiều email, chúng ta lấy cái đầu tiền
          // lưu vào db
          // console.log(newUser.facebook.name);
          newUser.save(function (err) {
            if (err)
              throw err;
            // nếu thành công, trả lại user
            return done(null, newUser);
          });
        }
      });
    });
  }));