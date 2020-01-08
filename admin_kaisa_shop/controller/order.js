const Order = require('../models/order');
const User=require('../models/user');

exports.listOrder = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  }
  res.redirect('/listOrder/1');


}

exports.pageOrder = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  }

  var perPage = 4;
  var page = req.params.page || 1;


  // skip = (page - 1) * perPage;
  Order.count().exec((err, count) => {
    if (!err) {
      var skip = (page) * perPage;
      if (skip < count) {
        skip = count - skip
      } else {
        skip = 0;
      }
      Order.find({}).skip(skip).limit(perPage).exec((err, data) => {
        if (!err) {
          res.render('./don_hang/danh_sach_don_hang', {
            title: 'Danh sách đơn hàng',
            listOrder: data.reverse(),
            current: page,
            total: Math.ceil(count / perPage),
            link: '/listOrder',
            headProfile: req.user
          });
        }
      });
    }
  })


}

exports.updateStatus = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  }

  var id = req.params._id;
  
  const update = {
    tinhTrang: req.body.orderStatus,
    ngayGiao:{
      ngay:0,
      thang:0,
      nam:0
    }
  }

  if(update.tinhTrang=="Đã giao"){
    let date_ob = new Date();
    update.ngayGiao.ngay=date_ob.getDate();
    update.ngayGiao.thang=date_ob.getMonth();
    update.ngayGiao.thang++;
    update.ngayGiao.nam=date_ob.getFullYear ();
  }

  Order.findByIdAndUpdate(id, update).exec((err, data) => {
    if (err) {
    console.log("Thông báo: Lỗi ở đây nè :L"+update.tinhTrang);
    }
  })
  res.redirect('/listOrder/detail/'+id);

}

exports.detailOrder=function(req,res,next){
  if (!req.isAuthenticated()) {
    res.redirect('/signin');
  }
  const id=req.params._id;

  Order.findById(id).exec((err,data)=>{
    res.render('./don_hang/chi_tiet_don_hang', {
      title: 'Chi tiết đơn hàng',
      detailOrder: data,
      headProfile: req.user

   
  })




})
}
