var express = require('express');
var router = express.Router();
const Passport = require('passport');


const indexController=require('../controller/index');
const accountController=require('../controller/account');
const adminController=require('../controller/admin');
const orderController=require('../controller/order');
const productController=require('../controller/product');
const userController=require('../controller/user');

router.get('/phanquyen', function (req, res, next) {
  if (req.user == null) {
    return next();
  }
  if (req.user.permission != "super") {
    return next();
  }

  res.render('phanquyen', { layout: false });

});


 router.get('/',indexController.index); 

 //Tài khoản
router.get('/signup',accountController.signUp );
router.post('/signup', Passport.authenticate('local.signup', {
  successRedirect: '/signin',
  failureRedirect: '/signup',
  failureFlash: true
}));
router.get('/signin',accountController.signIn);
router.post('/signin', Passport.authenticate('local.signin', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: true
}));
router.get('/recovery',accountController.recovery); 
router.get('/signout', accountController.signOut);
router.get('/profile', indexController.profile);

//Admin
router.get('/listAdmin',adminController.listAdmin); 
router.get('/listAdmin/:page',adminController.pageAdmin);
router.get('/listAdmin/profile/:_id',adminController.profileAdmin);
router.post('/updateProfileAdmin/:_id',adminController.updateProfile);
router.post('/upload_avatar_admin/:_id', adminController.updateAvatar);
router.post('/update_permission/:_id',adminController.updatePermission);


//Sản phẩm
router.get('/top_san_pham', function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/dang_nhap');
  }
  res.render('./san_pham/top_san_pham', { title: 'Express', headProfile: req.user });
});
router.get('/listProduct', productController.listProduct);
router.get('/listProduct/:page',productController.pageProduct); 
router.post('/addProduct',productController.addProduct);
router.get('/product/:_id',productController.detailProduct);
router.post('/updateProduct/:_id',productController.updateProduct);
router.post('/upload_avatar_product/:_id', productController.uploadAvatar);
router.post('/delete_product/:_id',productController.deleteProduct);



//Khách hàng
//thiếu chi tiết

router.get('/listUser', userController.listUser);
router.get('/listUser/:page', userController.pageUser);
router.get('/listUser/profile/:_id', userController.profileUser);




// Đơn hàng
//thiếu phân trang
router.get('/listOrder', orderController.listOrder);
router.get('/listOrder/:page', orderController.pageOrder);
router.get('/listOrder/detail/:_id', orderController.detailOrder);
router.post('/update_status_order/:_id',orderController.updateStatus);

module.exports = router;
