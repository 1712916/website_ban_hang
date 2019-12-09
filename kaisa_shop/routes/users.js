var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
var  passport = require('passport')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   //res.send('user/');
//   res.render('./user/san_pham/danh_muc_san_pham', { title: 'Các Sản Phẩm' });
// });

router.get('/mua_hang/thanh_toan', function(req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/mua_hang/thanh_toan', { title: 'Thanh Toán Bà Chủ' });
});
router.get('/mua_hang/xac_nhan', function(req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/mua_hang/xac_nhan', { title: 'Xác Nhận Đơn Hàng' });
});
router.get('/mua_hang/gio_hang', function(req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/mua_hang/gio_hang', { title: 'Giỏ Hàng' });
});

//################################################################
router.get('/logout', function(req, res, next){
  req.logout();
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err);
    req.user = null;
    res.clearCookie('_id');
    res.clearCookie('email');
    res.clearCookie('password');
    res.redirect('/');
  });

});

router.get('/tai_khoan/dang_ky', function(req, res, next) {
  //res.send('user/san_pham');
  var messages = req.flash('error')
  res.render('./user/tai_khoan/dang_ky',{ 
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
  const result= validationResult(req);
  var errors=result.errors;
  if (!result.isEmpty()) {
    var messages = [];
    errors.forEach(function(error){
        messages.push(error.msg);
    });
    res.render('./user/tai_khoan/dang_ky',{
      messages: messages,
      hasErrors: messages.length > 0,
    });
  }else{
     next();
  }
  }),
  passport.authenticate('local.signup', { successRedirect: '/users/tai_khoan/dang_nhap',
                                  failureRedirect: '/users/tai_khoan/dang_ky',
                                  failureFlash: {
                                    type: 'messageFailure',
                                    message: 'Invalid email and/ or password.'
                                  },
                                  successFlash: {
                                    type: 'messageSuccess',
                                    message: 'Successfully sign up.'
                                  }})
);



router.get('/tai_khoan/dang_nhap', function(req, res, next) {
  //res.send('user/san_pham');
  var messages = req.flash('error')

  res.render('./user/tai_khoan/dang_nhap',{ 
    messages: messages,
    hasErrors: messages.length > 0,
   })
  //res.render('./user/tai_khoan/dang_nhap', { title: 'Đăng Nhập' });
});
// Xử lý thông tin khi có người đăng nhập
router.post('/tai_khoan/dang_nhap',
  passport.authenticate('local.signin', { successRedirect: '/',
                                  failureRedirect: '/users/tai_khoan/dang_nhap',
                                  failureFlash: {
                                    type: 'messageFailure',
                                    message: 'Invalid email and/ or password.'
                                  },
                                  successFlash: {
                                    type: 'messageSuccess',
                                    message: 'Successfully Login'
                                  }})
);
//################################################################


router.get('/tai_khoan/theo_doi_don_hang', function(req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/tai_khoan/theo_doi_don_hang', { title: 'Theo Dõi Đơn Hàng' });
});
router.get('/lien_he', function(req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/lien_he/lien_he', { title: 'Liên Hệ' });
});
router.get('/tim_kiem', function(req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/tim_kiem', { title: 'Tìm kiếm' });
});

module.exports = router;
