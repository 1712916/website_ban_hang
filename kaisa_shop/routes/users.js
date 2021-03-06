var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
var passport = require('passport')
var nodemailer = require("nodemailer");
var User = require('../models/user.model');
var order = require('../models/order');
var Cart = require('../models/gioHang');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   //res.send('user/');
//   res.render('./user/san_pham/danh_muc_san_pham', { title: 'Các Sản Phẩm' });
// });
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fungviet@gmail.com',
    pass: 'cqcgleoecjuwuppl'
  }
});

router.get('/mua_hang/thanh_toan', function (req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/mua_hang/thanh_toan', { title: 'Thanh Toán Bà Chủ' });
});


router.get('/mua_hang/ket_qua_thanh_toan', function (req, res, next) {
  if (req.isAuthenticated())
    res.render('./user/mua_hang/ket_qua_thanh_toan', {});
  else {
    res.redirect('../tai_khoan/dang_nhap');
  }
});

router.post('/mua_hang/ket_qua_thanh_toan', function (req, res, next) {
  if (req.isAuthenticated()) {
    var dssp = new Array();
    var donHang = new order();
    var tongtien = 0;
    console.log(req.user._id);
    Cart.find({ 'idUser': req.user._id }, function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        result.forEach(element => {
          console.log(element);
          dssp.push(element);
          tongtien += element.gia;
        });

        donHang.tongTien = tongtien;
        console.log("Tong tien:" + donHang.tongTien);

        donHang.nguoiMua = req.user._id;
        donHang.tenNguoiMua = req.body.name;
        donHang.diaChi = req.body.address;
        donHang.dienThoai = req.body.phone;
        donHang.soSanPham = dssp.length;
        donHang.tinhTrang = "Chờ xử lý";
        donHang.dsSanPham = dssp;
        console.log(donHang.dsSanPham);

        order.insertMany(donHang, function (err, result) {
          if (err) throw err;
          console.log("1 document inserted\n" + donHang);
        });
      }

    })

    res.render('./user/mua_hang/xac_nhan', {});
  } else {
    res.redirect('../tai_khoan/dang_nhap');
  }
});


router.get('/mua_hang/xac_nhan', function (req, res, next) {
  console.log("Xoa cart hereeeeeee");
  
  Cart.deleteMany({ 'idUser': req.user._id }, function (err, obj) {
    if (err) throw err;
    console.log(" document(s) deleted");
  })
  res.render('./user/mua_hang/xac_nhan', { title: 'Xác Nhận Đơn Hàng' });
});


//################################################################

router.get('/tai_khoan/dang_ky', function (req, res, next) {
  //res.send('user/san_pham');
  var messages = req.flash('error')
  res.render('./user/tai_khoan/dang_ky', {
    messages: messages,
    hasErrors: messages.length > 0,
  })
  //res.render('./user/tai_khoan/dang_ky', { title: 'Đăng Ký' });
});
// Xử lý thông tin khi có người đăng nhập
router.post('/tai_khoan/dang_ky',
  [
    check('email', 'Your email is not valid').isEmail(),
    check('password', 'Your password must be at least 6 characters').isLength({ min: 6 })
  ],
  (function (req, res, next) {

    var messages = req.flash('error');
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
      var messages = [];
      errors.forEach(function (error) {
        messages.push(error.msg);
      });
      res.render('./user/tai_khoan/dang_ky', {
        messages: messages,
        hasErrors: messages.length > 0,
      });
    } else {
      next();
    }
  }),
  passport.authenticate('local-signup', {
    successRedirect: '/users/tai_khoan/dang_nhap',
    failureRedirect: '/users/tai_khoan/dang_ky',
    failureFlash: {
      type: 'messageFailure',
      message: 'Invalid email and/ or password.'
    },
    successFlash: {
      type: 'messageSuccess',
      message: 'Successfully sign up.'
    }
  })
);



router.get('/tai_khoan/dang_nhap', function (req, res, next) {
  //res.send('user/san_pham');
  var messages = req.flash('error')

  res.render('./user/tai_khoan/dang_nhap', {
    messages: messages,
    hasErrors: messages.length > 0,
  })
  //res.render('./user/tai_khoan/dang_nhap', { title: 'Đăng Nhập' });
});
// Xử lý thông tin khi có người đăng nhập
router.post('/tai_khoan/dang_nhap',
  passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/users/tai_khoan/dang_nhap',
    failureFlash: {
      type: 'messageFailure',
      message: 'Invalid email and/ or password.'
    },
    successFlash: {
      type: 'messageSuccess',
      message: 'Successfully Login'
    }
  })
);


// @@@@@@@@@@@@@@ RESET PASSWORD ##################################
router.get('/tai_khoan/reset_password', function (req, res, next) {
  res.render('./user/tai_khoan/reset_password', {});
});

router.post('/tai_khoan/reset_password', function (req, res, next) {
  console.log(req.body.email);
  var user = User.findOne({ 'local.email': req.body.email }, function (err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Not user found' });
    }
    else {
      var mailOptions = {
        from: 'fungviet@gmail.com',
        to: req.body.email,
        subject: 'Reset Password',
        text: 'Click to this link for reset password: ' + `http://localhost:9999/users/tai_khoan/new_password/${user.local.verify_token}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
      res.redirect('/users/tai_khoan/dang_nhap');
    }
  });

});
// token
var tk;
router.get('/tai_khoan/new_password/:token', function (req, res, next) {
  tk = req.params.token;
  res.render('./user/tai_khoan/new_password', {});
})

router.post('/tai_khoan/new_password', function (req, res, next) {
  console.log("IM HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
  var tmp = new User();
  User.findOneAndUpdate({ "local.verify_token": tk }, { $set: { "local.password": tmp.encryptPassword(req.body.password) } }, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    tk = null;
    res.redirect('/users/tai_khoan/dang_nhap');
  });
})

router.get('/tai_khoan/change_password', function (req, res, next) {
  if (req.isAuthenticated())
    res.render('./user/tai_khoan/change_password', {});
})
router.post('/tai_khoan/change_password', function (req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.user.local.email);
    User.findOne({ 'local.email': req.user.local.email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        console.log('111111111');
        return done(null, false, { message: 'Not user found' })
      }
      if (!user.validPassword(req.body.oldpassword)) {
        console.log('2222222222');
        return done(null, false, { message: 'Wrong password' })
      }
      User.updateOne({ "local.email": req.user.local.email }, { $set: { "local.password": user.encryptPassword(req.body.newpassword) } }, function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
      res.redirect('/');
    })
  }
})
//################################################################


router.get('/tai_khoan/theo_doi_don_hang', function (req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/tai_khoan/theo_doi_don_hang', { title: 'Theo Dõi Đơn Hàng' });
});
router.get('/lien_he', function (req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/lien_he/lien_he', { title: 'Liên Hệ' });
});
router.get('/tim_kiem', function (req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/tim_kiem', { title: 'Tìm kiếm' });
});

module.exports = router;
