const modelSanPham = require('../models/sanPham');

exports.danhMucSanPham = function (req, res, next) {
    modelSanPham.find().exec((err, docs) => {
      if (err) {
        res.render('layout', {});
      }
      else {
        console.log(docs);
        res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop', data: docs });
      }
  
    });
}

exports.phanLoai = function(req, res, next) {
    var phanLoai=req.params.phan_loai;
    let keyPhanLoai;
    if(phanLoai=='phu_kien')
    {
      keyPhanLoai="Phụ Kiện"
    }
    else if(phanLoai=='my_pham'){
      keyPhanLoai="Mỹ Phẩm"
    }
    else if(phanLoai=='do_choi'){
      keyPhanLoai="Đồ Chơi"
    }
    else if(phanLoai=='trang_tri'){
      keyPhanLoai="Trang Trí"
    }
    else{
      modelSanPham.find({}, function(err,product){
        if(err){
            console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
        }else{
          console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
          console.log(product);
          res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop',data:product });
        }
    
    });
    
    }
    modelSanPham.find({"loaiSanPham":keyPhanLoai}, function(err,product){
      if(err){
          console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
      }else{
        console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
        console.log(product);
        res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop',data:product });
      }
  
  });
}

exports.sanPham1 = function(req, res, next) {
    //res.send('user/san_pham');
    res.render('./user/san_pham/danh_muc_san_pham/chi_tiet_san_pham/san_pham_1', { title: 'Tên Sản Phẩm 1' });
}

exports.chiTietSanPham = function (req, res, next) {
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
}