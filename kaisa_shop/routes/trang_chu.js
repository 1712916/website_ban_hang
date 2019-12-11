var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const modelSanPham = require('../models/sanPham');

const { check, validationResult } = require('express-validator');
var passport = require('passport')
// const dtbName = 'kaisaShop'
// const url = "mongodb+srv://bossxomlut:123123qweqwe@cluster0-ajqhs.gcp.mongodb.net/" + dtbName + "?retryWrites=true&w=majority";
// const url=process.env.URL_DATABASE;
// mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }).then(
//   () => {
//     console.log('Thông báo: Kết nối tới Database thành công (^_^)\n');
//   },
//   err => { /** handle initial connection error */
//     console.log('Thông báo: Kết nối tới Database thất bại (T_T)\n');
//   }
// );
/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('trang_chu', { title: 'KaiSa Shop' });
// });


router.get('/index.html', function (req, res, next) {
  
    res.render('trang_chu', {});

});

router.get('/', function (req, res, next) {
  
  var user = req.user;

  modelSanPham.find().exec((err, docs) => {
    if (err) {
      res.render('layout', {});
    }
    else {
      console.log(docs);
      res.render('trang_chu', { messages: user });
    }
  });
});

router.get('/', function(req, res) {
  res.redirect('/catalog');
});

module.exports = router;
