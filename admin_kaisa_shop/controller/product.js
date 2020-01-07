const Product = require('../models/product');
const multer = require('multer');
exports.listProduct = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/signin');
    }
    res.redirect('/listProduct/1');

};

exports.pageProduct = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/signin');
    }
    var perPage = 4;
    var page = req.params.page || 1;

    var skip = (page) * perPage;

    // skip = (page - 1) * perPage;
    Product.count().exec((err, count) => {
        if (!err) {
            var skip = (page) * perPage;
            if (skip < count) {
                skip = count - skip
            } else {
                skip = 0;
            }
            Product.find({}).skip(skip).limit(perPage).exec((err, data) => {
                if (!err) {
                    res.render('./san_pham/tat_ca_san_pham', {
                        title: 'Danh sách sản phẩm',
                        listProduct: data.reverse(),
                        current: page,
                        total: Math.ceil(count / perPage),
                        link: '/listProduct',
                        headProfile: req.user
                    });
                }
            });
        }
    })
}


exports.addProduct=function(req,res,next){

    var newProduct = new Product();
   
      
        newProduct.tenSanPham=req.body.tenSanPham;
        newProduct.loaiSanPham=req.body.loaiSanPham;
        newProduct.giaSanPham=req.body.giaSanPham;
        newProduct.nhaSanXuat=req.body.nhaSanXuat;
        newProduct.moTaSanPham=req.body.moTaSanPham;
        newProduct.soLuongSanPham=req.body.soLuongSanPham;
        newProduct.configuration.cpu=req.body.cpu;
        newProduct.configuration.hardDisk=req.body.hardDisk;
        newProduct.configuration.ram=req.body.ram;
        newProduct.configuration.screen=req.body.screen;
        newProduct.configuration.graphic= req.body.graphic;
        newProduct.configuration.os=req.body.os;
        newProduct.configuration.olor=req.body.color;
        newProduct.nguoiDang=req.user._id;
  
        console.log(newProduct);
  
  
      newProduct.save();
      res.redirect('/listProduct');
  
  
    
  
  }

exports.detailProduct=function(req, res,next){

    if (!req.isAuthenticated()) {
      res.redirect('/signin');
    }
  
    const id = req.params._id;
  
    Product.findById(id).exec(function(err,data){
      if(err){
        res.redirect('/');
      }
  
      res.render('./san_pham/chi_tiet_san_pham', { title: 'Chi tiết sản phẩm',product:data, headProfile: req.user });
    })
  
    
  
  }

exports.updateProduct=function(req,res,next){
    if (!req.isAuthenticated()) {
      res.redirect('/signin');
    }

    const id = req.params._id;


    const update = {
      tenSanPham:req.body.tenSanPham,
      loaiSanPham:req.body.loaiSanPham,
      giaSanPham:req.body.giaSanPham,
      nhaSanXuat:req.body.nhaSanXuat,
      moTaSanPham:req.body.moTaSanPham,
      soLuongSanPham:req.body.soLuongSanPham,
     configuration:{
                cpu:req.body.cpu,
                hardDisk:req.body.hardDisk,
                ram:req.body.ram,
                screen:req.body.screen,
                graphic: req.body.graphic,
                os:req.body.os,
                color:req.body.color
    }
    };

    Product.findByIdAndUpdate(id,update, function (err, res) {
      if (err) {
        res.send("Thay đổi không thành công!");
      
      }
   
    })

    res.redirect('/product/'+id);
    

}
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
    };
exports.uploadAvatar=function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    //console.log("Tên file:"+req.body.file.path);
    if (!req.isAuthenticated()) {
      res.redirect('/signin');
    }
    const id = req.params._id;
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './public/productsAvatar/');
      },
      filename: function (req, file, cb) {
        cb(null, id + '.jpg');
      }
    });
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('file');
  
    upload(req, res, function (err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any
  
      if (req.fileValidationError) {
        //return res.render('index', { message: req.fileValidationError });
     
        return res.redirect('/product/' + id);
  
      }
      else if (!req.file) {
        //return res.render('index', { message: 'Please select an image to upload' });
       
        return res.redirect('/product/' + id);
  
      }
      else if (err instanceof multer.MulterError) {
        //return res.render('index', { message: err });
     
        return res.redirect('/product/' + id);
      }
      else if (err) {
        // return res.render('index', { message: err });
        
        return res.redirect('/product/' + id);
  
      }
  
  
  
  
      const update = { anhSanPham1: id + '.jpg',
                       anhSanPham: 'http://localhost:9999/image/'+id + '.jpg' };
      console.log("Toi day ngon nek: " + id);
      Product.findByIdAndUpdate(id, update, function (err, res) {
        if (err) {
          //res.send("Thay đổi không thành công!");
          return res.redirect('/');
        }
  
      })
  
      return res.redirect('/product/' + id);
  
  
    });
  }

exports.deleteProduct=function(req,res,next){
    if (!req.isAuthenticated()) {
      res.redirect('/signin');
    }
  
    const id = req.params._id;
 
    Product.findByIdAndDelete(id, function (err, res) {
      if (err) {
        res.send("Thay đổi không thành công!");
        res.redirect('/');
      }
      console.log(res);
    })
  
    res.redirect('/listProduct');
    
  
  }