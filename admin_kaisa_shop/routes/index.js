var express = require('express');
var router = express.Router();
const Passport=require('passport');
const Admin=require('../models/admin');
const Products=require('../models/sanPham');



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
 
  res.render('index',{title: 'kaisa Shop', headProfile:req.user});
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
  res.redirect('/ds_thanh_vien/1');
});

router.get('/ds_thanh_vien/:page', function(req, res, next) {
  if(!req.isAuthenticated()){
    res.redirect('/dang_nhap');
  }
  var perPage = 4;
  var page = req.params.page || 1;
  
  // const search={
  //   tenSanPham:"Dell",
  //   giaSanPham:999000
  // };

  
  var skip=(page-1)*perPage;

  Admin.find({}).skip(skip).limit(perPage).exec((err,data)=>{
    if(!err){
        Admin.count().exec((err,count)=>{
          if(!err){
            res.render('./thanh_vien/danh_sach_thanh_vien', { title: 'Danh sách thành viên',
                                listAdmin:data,
                                current: page,
                                total: Math.ceil(count/perPage),
                                headProfile:req.user});
          }
        })
    }

    

  })
  

});


router.get('/ds_don_hang', function(req, res, next) {
  if(!req.isAuthenticated()){
    res.redirect('/dang_nhap');
  }
  res.render('./don_hang/danh_sach_don_hang', { title: 'Express' ,headProfile:req.user});
});





router.get('/profile', function(req, res, next) {
  if(!req.isAuthenticated()){
    res.redirect('/dang_nhap');
  }

  res.render('./thanh_vien/ds_thanh_vien/thanh_vien_1', { title: 'KaisaAdmin',profile:req.user,headProfile:req.user });
});
router.get('/ds_thanh_vien/thanh_vien_1', function(req, res, next) {
  if(!req.isAuthenticated()){
    res.redirect('/dang_nhap');
  }

  res.render('./thanh_vien/ds_thanh_vien/thanh_vien_1', { title: 'KaisaAdmin',profile:req.user,headProfile:req.user });
});

router.get('/ds_thanh_vien/thanh_vien_1/:_id', function(req, res, next) {
  if(!req.isAuthenticated()){
    res.redirect('/dang_nhap');
  }
  var id=req.params._id;
  Admin.findOne({_id:id}).exec((err,data)=>{
    if(err){
      res.redirect('/');
    }
    
    // const profileAdmin={
    //   email:data.email,
    //   name:data.name,
    //   phone:data.phone,
    //   birthday: data.birthday,
    //   address:data.address,
    //   company: data.company
    // }
   // console.log(profileAdmin);
    res.render('./thanh_vien/ds_thanh_vien/thanh_vien_1', { title: 'KaisaAdmin',profile:data,headProfile:req.user });

  })

  
});


router.post('/update_profile/:_id',function(req,res,next){
  

  const update = { name: req.body.name,
                  phone:req.body.phone,
                  birthday: req.body.birthday,
                  address:req.body.address,
                  company: req.body.company };
                  
  
  const id = req.params._id;

    Admin.findByIdAndUpdate(id,update,function(err,res){
        if(err){
          res.send("Thay đổi không thành công!");
          res.redirect('/');
        }
        console.log(res);
    } )


    if(id==req.user._id){
      res.redirect('/profile');
    }
    res.redirect('/ds_thanh_vien/thanh_vien_1/'+id); 
  
})

router.get('/top_san_pham', function(req, res, next) {
  if(!req.isAuthenticated()){
    res.redirect('/dang_nhap');
  }
  res.render('./san_pham/top_san_pham', { title: 'Express',headProfile:req.user });
});
router.get('/tat_ca_san_pham', function(req, res, next) {
  if(!req.isAuthenticated()){
    res.redirect('/dang_nhap');
  }
  
  Products.find().exec((err,data)=>{
    if(err){
      res.redirect('/');
    }
    console.log("this is my data:" +data);
  res.render('./san_pham/tat_ca_san_pham', { title: 'Danh sách sản phẩm', listProduct:data ,headProfile:req.user});
  })

  
});

// router.get('/:page', function(req, res, next) {
//   var perPage = 2
//   var page = req.params.page || 1;
  
//   const search={
//     tenSanPham:"Dell",
//     giaSanPham:999000
//   };

  
//   var skip=(page-1)*perPage;

//   Admin.find({}).skip(skip).limit(perPage).exec((err,data)=>{
//     if(!err){
//         Admin.count().exec((err,count)=>{
//           if(!err){
//             res.render('index', { title: 'Express',
//                                 content:data,
//                                 current: page,
//                                 total: Math.ceil(count/perPage)});
//           }
//         })
//     }

    

//   })
  

// });






module.exports = router;
