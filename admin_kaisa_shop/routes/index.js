var express = require('express');
var router = express.Router();
const Passport=require('passport');
const Admin=require('../models/admin');



router.get('/phanquyen', function(req, res,next) {
  if(req.user==null){
    return next();
   }
 if(req.user.permission!="super"){
  return next();
 }

res.render('phanquyen',{layout:false});
  
});


router.get('/',function(req,res,next){ 
  if(!req.isAuthenticated()){
    res.redirect('/dang_nhap');
  }
 
  res.render('index',{title: 'kaisa Shop', profile:req.user});
});

router.get('/dang_ky', function(req, res, next) {
  if(req.isAuthenticated()){
    res.redirect('/');
  }
  res.render('./tai_khoan/dang_ky', { title: 'Đăng ký',layout: false ,message:req.flash('message')});
});

router.post('/dang_ky', Passport.authenticate('local.signup',{
  successRedirect: '/dang_nhap',
  failureRedirect: '/dang_ky',
  failureFlash: true

}));


router.get('/dang_nhap', function(req, res, next) {
  if(req.isAuthenticated()){
    res.redirect('/');
  }
  res.render('./tai_khoan/dang_nhap', { title: 'Đăng nhập',layout: false ,message:req.flash('message'),email:req.flash('email')});
});
router.post('/dang_nhap', Passport.authenticate('local.signin',{
  successRedirect: '/',
  failureRedirect: '/dang_nhap',
  failureFlash: true


}));



router.get('/quen_mat_khau', function(req, res, next) {
  if(req.isAuthenticated()){
    res.redirect('/');
  }
  res.render('./tai_khoan/quen_mat_khau', { title: 'Quên mật khẩu',layout: false });
});








router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');  
});




router.get('/ds_thanh_vien', function(req, res, next) {
  if(!req.isAuthenticated()){
    res.redirect('/dang_nhap');
  }
  res.render('./thanh_vien/danh_sach_thanh_vien', { title: 'Express' });
});
router.get('/ds_don_hang', function(req, res, next) {
  if(!req.isAuthenticated()){
    res.redirect('/dang_nhap');
  }
  res.render('./don_hang/danh_sach_don_hang', { title: 'Express' });
});



router.get('/ds_thanh_vien/thanh_vien_1', function(req, res, next) {
  if(!req.isAuthenticated()){
    res.redirect('/dang_nhap');
  }
  res.render('./thanh_vien/ds_thanh_vien/thanh_vien_1', { title: 'KaisaAdmin',profile:req.user });
});

router.post('/update_profile',function(req,res,next){
  

  const update = { name: req.body.name,
                  phone:req.body.phone,
                  birthday: req.body.birthday,
                  address:req.body.address,
                  company: req.body.company };
                  
  
  const id = req.user._id;

    const admin=Admin.findByIdAndUpdate(id,update,function(err,res){
        if(err){
          res.send("Thay đổi không thành công!");
          res.redirect('/');
        }
        console.log(res);
    } )



   res.redirect('/ds_thanh_vien/thanh_vien_1');
})

router.get('/top_san_pham', function(req, res, next) {
  if(!req.isAuthenticated()){
    res.redirect('/dang_nhap');
  }
  res.render('./san_pham/top_san_pham', { title: 'Express' });
});
router.get('/tat_ca_san_pham', function(req, res, next) {
  if(!req.isAuthenticated()){
    res.redirect('/dang_nhap');
  }
  res.render('./san_pham/tat_ca_san_pham', { title: 'Express' });
});






module.exports = router;
