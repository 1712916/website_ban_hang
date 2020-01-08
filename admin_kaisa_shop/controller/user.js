const User=require('../models/user');
const Order = require('../models/order');
exports.listUser=function(req, res,next){
    if (!req.isAuthenticated()) {
      res.redirect('/signin');
    }
    res.redirect('/listUser/1');
   
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
      Order.find({nguoiMua:data._id}).exec((err,listDonHang)=>{
        res.render('./thanh_vien/ds_thanh_vien/khach_hang', { title: 'Danh sách khách hàng',profile:data,listOrder:listDonHang ,headProfile: req.user });
      })
    
  
    })
   
  }

  exports.pageUser=function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/signin');
    }
    var perPage = 4;
    var page = req.params.page || 1;
 
    var skip = (page - 1) * perPage;
  
    User.find({}).skip(skip).limit(perPage).exec((err, data) => {
      if (!err) {
        User.count().exec((err, count) => {
          if (!err) {
            res.render('./thanh_vien/danh_sach_khach_hang', {
              title: 'Danh sách khách hàng',
              listUser: data,
              current: page,
              total: Math.ceil(count / perPage),
              link:'/listUser',
              headProfile: req.user
            });
          }
        })
      }
  
    })
}