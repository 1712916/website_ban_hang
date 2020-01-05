require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
//var passport = require('passport-facebook');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var app = express();
const url = process.env.URL_DATABASE;


var indexRouter = require('./routes/trang_chu');
var usersRouter = require('./routes/users');
var vinhRouter = require('./routes/vinh');
var authRouter = require('./routes/auth');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site
const hbs = require('hbs');

require('./config/passport'); //vượt qua passport để config trang đăng nhâp/đăng ký

app.use(session({
  secret: 'adsa897adsa98bs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session());

//kết nối đến database
// 
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
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


const handlebars = require('hbs');

// handlebars.registerHelper('times', function(n, block) {
//   var accum = '';
//   for(var i = 0; i < n; ++i)
//       accum += block.fn(i);
//   return accum;
// });

// 2. register the helper, name it whatever you want
handlebars.registerHelper('repeat', require('handlebars-helper-repeat'));

// 3. register some partials
handlebars.registerPartial('button', '<button>{{text}}</button>');

// 4. use in templates
const fn = handlebars.compile('{{#repeat 2}}{{> button }}{{/repeat}}');

// handlebars.registerHelper('concat', function() {
//   arguments = [...arguments].slice(0, -1);
//   return arguments.join('');
// });
handlebars.registerHelper('concat', function () {
  var outStr = '';
  for (var arg in arguments) {
    if (typeof arguments[arg] != 'object') {
      outStr += arguments[arg];
    }
  }
  return outStr;
});

handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '==':
      return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=':
      return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

handlebars.registerHelper("math", function (lvalue, operator, rvalue, options) {
  lvalue = parseInt(lvalue);
  rvalue = parseInt(rvalue);

  return {
    '+': lvalue + rvalue,
    '-': lvalue - rvalue,
    '*': lvalue * rvalue,
    '/': lvalue / rvalue,
    '%': lvalue % rvalue
  }[operator];
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter);
app.use('/vinh', vinhRouter);
app.use('/', catalogRouter);  // Add catalog routes to middleware chain.


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
//
function checkAuth(req, res, next) {
  // if logined or it's login request, then go next route
  if (isLogin || (req.path === '/login' && req.method === 'POST')) {
    next()
  } else {
    res.send('Not logged in yet.')
  }
}


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.currentUser = req.user;
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
