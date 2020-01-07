var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var imageRouter = require('./routes/image');
const hbs = require('hbs');
const bodyParser=require('body-parser');
const Passport=require('passport');
var mongoose=require('mongoose'); 
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const url = process.env.URL_DATABASE;
var flash = require('connect-flash');
require('./hbsHelper/myHelper');

var app = express();

//body parser 
app.use(bodyParser.urlencoded({extends:true}));
app.use(expressSession({secret: 'mySecretKey'}));
app.use(Passport.initialize());
app.use(Passport.session());
app.use(express.urlencoded());
app.use(flash());

require('./passport/passport');

//kết nối đến database
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }).then(
  () => {
    console.log('Thông báo: Kết nối tới Database thành công (^_^)\n');
  },
  err => { /** handle initial connection error */
    console.log('Thông báo: Kết nối tới Database thất bại (T_T)\n');
  }
);

//this required before view engine setup
hbs.registerPartials(__dirname + '/views');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);imageRouter
app.use('/image', imageRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404',{layout:false});
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
