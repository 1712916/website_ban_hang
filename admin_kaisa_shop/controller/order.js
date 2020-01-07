const Order=require('../models/order');

exports.listOrder=function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/signin');
    }
    Order.find().exec((err,data)=>{
      if(err){
        res.redirect('/');
      }
      res.render('./don_hang/danh_sach_don_hang', { title: 'Danh sách đơn hàng',listOrder:data, headProfile: req.user });
    })
  
   
  }

exports.updateStatus=function(req,res,next){
    var id=req.params._id;
    const update={
      tinhTrang:req.body.orderStatus
    }
    Order.findByIdAndUpdate(id,update).exec((err,res)=>{
      if(err){
        res.redirect('/');
      }
    })
    res.redirect('/listOrder');

}
