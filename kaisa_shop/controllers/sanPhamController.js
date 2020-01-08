const modelSanPham = require('../models/sanPham');
const modelComment = require('../models/comment');
var itemPerPage = 3;
var pageDisplay = 4;

exports.danhMucSanPham = function (req, res, next) {
  //createPagination();
  if (isNaN(parseInt(req.params.current_page))) {
    next();
  }
  // modelSanPham.find({}, {}, { skip: req.params.current_page * itemPerPage - itemPerPage, limit: itemPerPage }).exec((err, docs) => {
  //   if (err) {
  //     res.render('layout', {});
  //   }
  //   else {
  //     console.log(docs);
  //     res.render('./user/san_pham/danh_muc_san_pham', { title: 'KaiSa Shop', data: docs });
  //   }
  // });
  modelSanPham.find({}).skip(req.params.current_page * itemPerPage - itemPerPage)
    .limit(itemPerPage)
    .exec(function (err, products) {
      modelSanPham.count().exec(function (err, count) {
        if (err) {
          return next(err);
        }
        console.log('thong tin req user: ' + req.user);
        if (req.isAuthenticated()) {
          res.render('./user/san_pham/danh_muc_san_pham', {
            title: 'Kaisa Shop',
            data: products,
            current: req.params.current_page,
            pages: Math.ceil(count / itemPerPage),
            baseUrl: '/users/san_pham/danh_muc_san_pham',
            currentUser: req.user,
            pageDisplay: pageDisplay
          });
        }
        else {
          res.render('./user/san_pham/danh_muc_san_pham', {
            title: 'Kaisa Shop',
            data: products,
            current: req.params.current_page,
            pages: Math.ceil(count / itemPerPage),
            baseUrl: '/users/san_pham/danh_muc_san_pham',
            currentUser: req.user,
            pageDisplay: pageDisplay
          });
        }
      });

    });
}

exports.cachPhanLoai = function (req, res, next) {
  var cachPhanLoai = req.params.cach_phan_loai;
  var phanLoai = req.params.phan_loai;
  let keyPhanLoai;
  if (cachPhanLoai == 'phan_loai') {
    if (phanLoai == 'laptop') {
      keyPhanLoai = "Laptop";
    }
    else if (phanLoai == 'smartphone') {
      keyPhanLoai = "Smartphone"
    }
    else if (phanLoai == 'linh_kien') {
      keyPhanLoai = "Linh kiện"
    }
    else if (phanLoai == 'pc_workstation') {
      keyPhanLoai = "PC-Workstation"
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

    modelSanPham.find({ "loaiSanPham": keyPhanLoai })
      .skip(req.params.current_page * itemPerPage - itemPerPage)
      .limit(itemPerPage)
      .exec(function (err, product) {
        modelSanPham.find({ "loaiSanPham": keyPhanLoai })
          .count().exec(function (err, count) {
            if (err) {
              console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
            } else {
              console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
              console.log(product);
              res.render('./user/san_pham/danh_muc_san_pham', {
                title: 'KaiSa Shop',
                data: product,
                current: req.params.current_page,
                pages: Math.ceil(count / itemPerPage),
                baseUrl: '/users/san_pham/danh_muc_san_pham/' + cachPhanLoai + '/' + phanLoai,
                currentUser: req.user,
                pageDisplay: pageDisplay
              });
            }
          });
      });
  }
  else if (cachPhanLoai == 'thuong_hieu') {
    if (phanLoai == 'apple') {
      keyPhanLoai = "Apple"
    }
    else if (phanLoai == 'lenovo') {
      keyPhanLoai = "Lenovo"
    }
    else if (phanLoai == 'dell') {
      keyPhanLoai = "Dell"
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

    modelSanPham.find({ "nhaSanXuat": keyPhanLoai })
      .skip(req.params.current_page * itemPerPage - itemPerPage)
      .limit(itemPerPage)
      .exec(function (err, product) {
        modelSanPham.find({ "nhaSanXuat": keyPhanLoai })
          .count().exec(function (err, count) {
            if (err) {
              console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
            } else {
              console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
              console.log(product);
              res.render('./user/san_pham/danh_muc_san_pham', {
                title: 'KaiSa Shop',
                data: product,
                current: req.params.current_page,
                pages: Math.ceil(count / itemPerPage),
                baseUrl: '/users/san_pham/danh_muc_san_pham/' + cachPhanLoai + '/' + phanLoai,
                currentUser: req.user,
                pageDisplay: pageDisplay
              });
              return;
            }
          });
      });
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
    modelSanPham.find({ "mauSac": keyPhanLoai })
      .skip(req.params.current_page * itemPerPage - itemPerPage)
      .limit(itemPerPage)
      .exec(function (err, product) {
        modelSanPham.find({ "mauSac": keyPhanLoai })
          .count().exec(function (err, count) {
            if (err) {
              console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
            } else {
              console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
              console.log(product);
              res.render('./user/san_pham/danh_muc_san_pham', {
                title: 'KaiSa Shop',
                data: product,
                current: req.params.current_page,
                pages: Math.ceil(count / itemPerPage),
                baseUrl: '/users/san_pham/danh_muc_san_pham/' + cachPhanLoai + '/' + phanLoai,
                currentUser: req.user,
                pageDisplay: pageDisplay
              });
              return;
            }
          });
      });
  }
  else if (cachPhanLoai == 'gia') {
    let min, max;
    let regex = /(.+)-(.+)/g;
    let match = regex.exec(phanLoai);
    min = match[1];
    max = match[2];
    modelSanPham.find({ "giaSanPham": { $gt: min, $lt: max } })
      .skip(req.params.current_page * itemPerPage - itemPerPage)
      .limit(itemPerPage)
      .exec(function (err, product) {
        modelSanPham.find({ "giaSanPham": { $gt: min, $lt: max } })
          .count().exec(function (err, count) {
            if (err) {
              console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
            } else {
              console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
              console.log(product);
              res.render('./user/san_pham/danh_muc_san_pham', {
                title: 'KaiSa Shop',
                data: product,
                current: req.params.current_page,
                pages: Math.ceil(count / itemPerPage),
                baseUrl: '/users/san_pham/danh_muc_san_pham/' + cachPhanLoai + '/' + min + '-' + max,
                currentUser: req.user,
                pageDisplay: pageDisplay
              });
              return;
            }
          });
      });
  }
  else {
    next();
  }
}

exports.sapXep = function (req, res, next) {
  var cachSapXep = req.params.cach_sap_xep;
  if (cachSapXep == 'a_den_z') {
    modelSanPham.find({})
      .sort({ "tenSanPham": 1 })
      .skip(req.params.current_page * itemPerPage - itemPerPage)
      .limit(itemPerPage)
      .exec(function (err, product) {
        modelSanPham.count().exec(function (err, count) {
          if (err) {
            console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
          } else {
            console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
            console.log(product);
            res.render('./user/san_pham/danh_muc_san_pham', {
              title: 'KaiSa Shop',
              data: product,
              current: req.params.current_page,
              pages: Math.ceil(count / itemPerPage),
              baseUrl: '/users/san_pham/danh_muc_san_pham/sap_xep/' + cachSapXep,
              currentUser: req.user,
              pageDisplay: pageDisplay
            });
            return;
          }
        });
      });
  }

  else if (cachSapXep == 'z_den_a') {
    modelSanPham.find({})
      .sort({ "tenSanPham": -1 })
      .skip(req.params.current_page * itemPerPage - itemPerPage)
      .limit(itemPerPage)
      .exec(function (err, product) {
        modelSanPham.count().exec(function (err, count) {
          if (err) {
            console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
          } else {
            console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
            console.log(product);
            res.render('./user/san_pham/danh_muc_san_pham', {
              title: 'KaiSa Shop',
              data: product,
              current: req.params.current_page,
              pages: Math.ceil(count / itemPerPage),
              baseUrl: '/users/san_pham/danh_muc_san_pham/sap_xep/' + cachSapXep,
              currentUser: req.user,
              pageDisplay: pageDisplay
            });
            return;
          }
        });
      });
  }

  else if (cachSapXep == 'theo_gia_tien_tang_dan') {
    modelSanPham.find({})
      .sort({ "giaSanPham": 1 })
      .skip(req.params.current_page * itemPerPage - itemPerPage)
      .limit(itemPerPage)
      .exec(function (err, product) {
        modelSanPham.count().exec(function (err, count) {
          if (err) {
            console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
          } else {
            console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
            console.log(product);
            res.render('./user/san_pham/danh_muc_san_pham', {
              title: 'KaiSa Shop',
              data: product,
              current: req.params.current_page,
              pages: Math.ceil(count / itemPerPage),
              baseUrl: '/users/san_pham/danh_muc_san_pham/sap_xep/' + cachSapXep,
              currentUser: req.user,
              pageDisplay: pageDisplay
            });
            return;
          }
        });
      });
  }

  else if (cachSapXep == 'theo_gia_tien_giam_dan') {
    modelSanPham.find({})
      .sort({ "giaSanPham": -1 })
      .skip(req.params.current_page * itemPerPage - itemPerPage)
      .limit(itemPerPage)
      .exec(function (err, product) {
        modelSanPham.count().exec(function (err, count) {
          if (err) {
            console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
          } else {
            console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
            console.log(product);
            res.render('./user/san_pham/danh_muc_san_pham', {
              title: 'KaiSa Shop',
              data: product,
              current: req.params.current_page,
              pages: Math.ceil(count / itemPerPage),
              baseUrl: '/users/san_pham/danh_muc_san_pham/sap_xep/' + cachSapXep,
              currentUser: req.user,
              pageDisplay: pageDisplay
            });
            return;
          }
        });
      });
  }

}

var commentPerPage = 3;
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
      
      modelComment.find({ "idSP": id })
        .skip(req.params.current_page * commentPerPage - commentPerPage)
        .limit(itemPerPage)
        .exec(function (err, comment) {
          modelComment.count().exec(function (err, count) {
            res.render('./user/san_pham/danh_muc_san_pham/chi_tiet_san_pham/san_pham_1', {
              title: 'KaiSa Shop',
              data: product,
              commentData: comment,
              currentPage: req.params.current_page,
              commentPages: Math.ceil(count / commentPerPage),
              baseUrl: '/chi_tiet_sp/' + id,
              currentUser: req.user,
              pageDisplay: pageDisplay
            });
          });
        });
    }
  });
}

exports.updateChiTietSanPham = function (req, res, next) {

  modelComment.collection.insertOne({
    idSP: req.params.id,
    username: req.body.name,
    commentDate: Date.now(),
    message: req.body.message
  });
  var id = req.params.id;
  modelSanPham.findById(id, function (err, product) {
    if (err) {
      console.log("Thông báo: Không kết nối được với chi tiết sản phẩm!\n");
    } else {
      console.log("Thông báo:Kết nối thành công với chi tiết sản phẩm!\n");
      modelComment.find({ "idSP": id })
        .skip(req.params.current_page * commentPerPage - commentPerPage)
        .limit(itemPerPage)
        .exec(function (err, comment) {
          modelComment.count().exec(function (err, count) {
            res.render('./user/san_pham/danh_muc_san_pham/chi_tiet_san_pham/san_pham_1', {
              title: 'KaiSa Shop',
              data: product,
              commentData: comment,
              currentPage: req.params.current_page,
              commentPages: Math.ceil(count / commentPerPage),
              baseUrl: '/chi_tiet_sp/' + id,
              currentUser: req.user,
              pageDisplay: pageDisplay
            });
          });
        });
    }
  });

  // var myData = new Comment(req.body);
  // myData.save()
  //   .then(item => {
  //     res.send("item saved to database");
  //   })
  //   .catch(err => {
  //     res.status(400).send("unable to save to database");
  //   });
}