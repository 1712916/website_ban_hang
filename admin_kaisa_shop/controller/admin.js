const Admin = require('../models/admin');
const multer = require('multer');

exports.listAdmin=function(req,res,next){
    if (!req.isAuthenticated()) {
        res.redirect('/signIn');
      }
      res.redirect('/listAdmin/1');
};

exports.pageAdmin=function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/signin');
    }
    var perPage = 4;
    var page = req.params.page || 1;
 
    var skip = (page - 1) * perPage;
  
    Admin.find({}).skip(skip).limit(perPage).exec((err, data) => {
      if (!err) {
        Admin.count().exec((err, count) => {
          if (!err) {
            res.render('./thanh_vien/danh_sach_thanh_vien', {
              title: 'Danh sách thành viên',
              listAdmin: data,
              current: page,
              total: Math.ceil(count / perPage),
              link:'/listAdmin',
              headProfile: req.user
            });
          }
        })
      }
  
    })
}
  
  
 
exports.profileAdmin=function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/signin');
    }
    var id = req.params._id;
    Admin.findOne({ _id: id }).exec((err, data) => {
      if (err) {
        res.redirect('/');
      }
      res.render('./thanh_vien/ds_thanh_vien/thanh_vien_1', { title: 'KaisaAdmin', profile: data, headProfile: req.user });
  
    })
   }

  
exports.updateProfile=function (req, res, next) {
    const update = {
      name: req.body.name,
      phone: req.body.phone,
      birthday: req.body.birthday,
      address: req.body.address,
      company: req.body.company
    };
  
    const id = req.params._id;
  
    Admin.findByIdAndUpdate(id, update, function (err, res) {
      if (err) {
        res.send("Thay đổi không thành công!");
        res.redirect('/');
      }
      console.log(res);
    })
  
  
    if (id == req.user._id) {
      res.redirect('/profile');
    }
    res.redirect('/listAdmin/profile/' + id);
  
  }

  const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
    };
    
exports.updateAvatar=function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    //console.log("Tên file:"+req.body.file.path);
    if (!req.isAuthenticated()) {
      res.redirect('/signin');
    }
    const id = req.params._id;
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './public/avatars/');
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
        if (id == req.user._id) {
          return res.redirect('/profile');
        }
        return res.redirect('/listAdmin/profile/' + id);
  
      }
      else if (!req.file) {
        //return res.render('index', { message: 'Please select an image to upload' });
        if (id == req.user._id) {
          return res.redirect('/profile');
        }
        return res.redirect('/listAdmin/profile/' + id);
  
      }
      else if (err instanceof multer.MulterError) {
        //return res.render('index', { message: err });
        if (id == req.user._id) {
          return res.redirect('/profile');
        }
        return res.redirect('/listAdmin/profile/' + id);
      }
      else if (err) {
        // return res.render('index', { message: err });
        if (id == req.user._id) {
          return res.redirect('/profile');
        }
        return res.redirect('/listAdmin/profile/' + id);
  
      }
  
  
  
  
      const update = { avatar: id + '.jpg' };
      console.log("Toi day ngon nek: " + id);
      Admin.findByIdAndUpdate(id, update, function (err, res) {
        if (err) {
          //res.send("Thay đổi không thành công!");
          return res.redirect('/');
        }
  
      })
  
      if (id == req.user._id) {
        return res.redirect('/profile');
      }
      return res.redirect('/listAdmin/profile/' + id);
  
  
    });
  }

exports.updatePermission=function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/dang_nhap');
    }
  
    const id = req.params._id;
  
    if(id==req.user._id){
      return res.redirect('/');
    }
    if(req.user.permission!="999"){
      return res.redirect('/');
    }
    Admin.findById(id).exec((err, data) => {
      if (!err) {
        //0 là mới tạo ních cần xin phép, -1 là đang khóa, 1 là đang mở
        if (data.permission == "0" || data.permission == "-1") {
          {
            Admin.findByIdAndUpdate(id, { permission: "1" }, function (err, res) {
              if (err) {
                //res.send("Thay đổi không thành công!");
                return res.redirect('/');
              }
  
            })
            res.redirect('/listAdmin');
          }
        } else {
          Admin.findByIdAndUpdate(id, { permission: "-1" }, function (err, res) {
            if (err) {
              //res.send("Thay đổi không thành công!");
              return res.redirect('/');
            }
  
          })
          res.redirect('/listAdmin');
        }
      }
    })
  
  }