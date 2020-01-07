const User=require('../models/user');
exports.listUser=function(req, res,next){
    if (!req.isAuthenticated()) {
      res.redirect('/signin');
    }
    User.find().exec((err,data)=>{
      if(err){
        res.redirect('/');
      }
      res.render('./thanh_vien/danh_sach_khach_hang', { title: 'Danh sách khách hàng',listUser:data, headProfile: req.user });
  
    })
   
  }

exports.profileUser=function(req, res,next){
    if (!req.isAuthenticated()) {
      res.redirect('/signin');
    }
    const id=req.params._id;
    User.findById(id).exec((err,data)=>{
      if(err){
        res.redirect('/');
      }
      res.render('./thanh_vien/ds_thanh_vien/khach_hang', { title: 'Danh sách khách hàng',profile:data, headProfile: req.user });
  
    })
   
  }