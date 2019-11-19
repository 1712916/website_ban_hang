var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose'); 
const dtbName = 'kaisaShop'
const url = "mongodb+srv://bossxomlut:123123qweqwe@cluster0-ajqhs.gcp.mongodb.net/" + dtbName + "?retryWrites=true&w=majority";



var indexRouter = require('./routes/trang_chu');
var usersRouter = require('./routes/users');
var vinhRouter = require('./routes/vinh');
const hbs = require('hbs');
var app = express();

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
app.use('/users', usersRouter);
app.use('/vinh',vinhRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//


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
