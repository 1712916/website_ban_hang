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

router.get('/chi_tiet_sp/:id', function (req, res, next) {
  var id = req.params.id;

  modelSanPham.findById(id, function (err, product) {
    if (err) {
      console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
    } else {
      console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
      console.log(product);
      res.render('./user/san_pham/danh_muc_san_pham/chi_tiet_san_pham/san_pham_1', { title: 'KaiSa Shop', data: product });
    }

  });
});

module.exports = router;
