const modelSanPham = require('../models/sanPham');
var itemPerPage = 3;

exports.danhMucSanPham = function (req, res, next) {
  //createPagination();
  if (isNaN(parseInt(req.params.current_page))) {
    next();
  }
  modelSanPham.find({}, {}, { skip: req.params.current_page * itemPerPage - itemPerPage, limit: itemPerPage }).exec((err, docs) => {
    if (err) {
      res.render('layout', {});
    }
    else {
      console.log(docs);
      res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop', data: docs });
    }

  });
}

exports.cachPhanLoai = function (req, res, next) {
  var cachPhanLoai = req.params.cach_phan_loai;
  var phanLoai = req.params.phan_loai;
  let keyPhanLoai;
  if (cachPhanLoai == 'phan_loai') {
    if (phanLoai == 'phu_kien') {
      keyPhanLoai = "Phụ Kiện";
    }
    else if (phanLoai == 'my_pham') {
      keyPhanLoai = "Mỹ Phẩm"
    }
    else if (phanLoai == 'do_choi') {
      keyPhanLoai = "Đồ Chơi"
    }
    else if (phanLoai == 'trang_tri') {
      keyPhanLoai = "Trang Trí"
    }
    else {
      
      modelSanPham.find({}, function (err, product) {
        if (err) {
          console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
        } else {
          console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
          console.log(product);
          res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop', data: product });
        }
      }).skip(req.params.current_page * itemPerPage - itemPerPage).limit(itemPerPage);
    }
    modelSanPham.find({ "loaiSanPham": keyPhanLoai }, function (err, product) {
      if (err) {
        console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
      } else {
        console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
        console.log(product);
        res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop', data: product });
      }
    }).skip(req.params.current_page * itemPerPage - itemPerPage).limit(itemPerPage);
  }
  else if (cachPhanLoai == 'thuong_hieu') {
    if (phanLoai == 'apple') {
      keyPhanLoai = "Apple"
    }
    else if (phanLoai == 'asus') {
      keyPhanLoai = "Asus"
    }
    else if (phanLoai == 'gionee') {
      keyPhanLoai = "Gionee"
    }
    else if (phanLoai == 'micromax') {
      keyPhanLoai = "Micromax"
    }
    else if (phanLoai == 'samsung') {
      keyPhanLoai = "Samsung"
    }
    else {
      modelSanPham.find({}, function (err, product) {
        if (err) {
          console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
        } else {
          console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
          console.log(product);
          res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop', data: product });
        }
      }).skip(req.params.current_page * itemPerPage - itemPerPage).limit(itemPerPage);
    }
    modelSanPham.find({ "nhaSanXuat": keyPhanLoai }, function (err, product) {
      if (err) {
        console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
      } else {
        console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
        console.log(product);
        res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop', data: product });
        return;
      }
    }).skip(req.params.current_page * itemPerPage - itemPerPage).limit(itemPerPage);
  }
  else if (cachPhanLoai == 'mau_sac') {
    if (phanLoai == 'black') {
      keyPhanLoai = "Black"
    }
    else if (phanLoai == 'black_leather') {
      keyPhanLoai = "Black leather"
    }
    else if (phanLoai == 'black_with_red') {
      keyPhanLoai = "Black with red"
    }
    else if (phanLoai == 'gold') {
      keyPhanLoai = "Gold"
    }
    else if (phanLoai == 'space_grey') {
      keyPhanLoai = "Space grey"
    }
    else {
      modelSanPham.find({}, function (err, product) {
        if (err) {
          console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
        } else {
          console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
          console.log(product);
          res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop', data: product });
        }
      }).skip(req.params.current_page * itemPerPage - itemPerPage).limit(itemPerPage);
    }
    modelSanPham.find({ "mauSac": keyPhanLoai }, function (err, product) {
      if (err) {
        console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
      } else {
        console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
        console.log(product);
        res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop', data: product });
        return;
      }
    }).skip(req.params.current_page * itemPerPage - itemPerPage).limit(itemPerPage);
  }
  else if (cachPhanLoai == 'gia') {
    let min, max;
    let regex = /(.+)-(.+)/g;
    let match = regex.exec(phanLoai);
    min = match[1];
    max = match[2];
    modelSanPham.find({ "giaSanPham": { $gt: min, $lt: max } }, function (err, product) {
      if (err) {
        console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
      } else {
        console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
        console.log(product);
        res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop', data: product });
        return;
      }
    }).skip(req.params.current_page * itemPerPage - itemPerPage).limit(itemPerPage);
  }
  else {
    next();
  }
}

exports.sapXep = function (req, res, next) {
  var cachSapXep = req.params.cach_sap_xep;
  console.log('sap xep z den a');
  if (cachSapXep == 'a_den_z') {
    modelSanPham.find({}, function (err, product) {
      if (err) {
        console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
      } else {
        console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
        console.log(product);
        res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop', data: product });
        return;
      }
    }).sort({ "tenSanPham": 1 }).skip(req.params.current_page * itemPerPage - itemPerPage).limit(itemPerPage);
  }

  else if (cachSapXep == 'z_den_a') {
    modelSanPham.find({}, function (err, product) {
      if (err) {
        console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
      } else {
        console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
        console.log(product);
        res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop', data: product });
        return;
      }
    }).sort({ "tenSanPham": -1 }).skip(req.params.current_page * itemPerPage - itemPerPage).limit(itemPerPage);
  }
  else if (cachSapXep == 'theo_gia_tien_tang_dan') {
    modelSanPham.find({}, function (err, product) {
      if (err) {
        console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
      } else {
        console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
        console.log(product);
        res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop', data: product });
        return;
      }
    }).sort({ "giaSanPham": 1 }).skip(req.params.current_page * itemPerPage - itemPerPage).limit(itemPerPage);
  }
  else if (cachSapXep == 'theo_gia_tien_giam_dan') {
    modelSanPham.find({}, function (err, product) {
      if (err) {
        console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
      } else {
        console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
        console.log(product);
        res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop', data: product });
        return;
      }
    }).sort({ "giaSanPham": -1 }).skip(req.params.current_page * itemPerPage - itemPerPage).limit(itemPerPage);
  }

}

exports.sanPham1 = function (req, res, next) {
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