
exports.index=function(req,res,next){
    if (!req.isAuthenticated()) {
        res.redirect('/signin');
    }
    res.render('index', { title: 'kaisa Shop', headProfile: req.user });
}


exports.profile=function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/signin');
    }
  
    res.render('./thanh_vien/ds_thanh_vien/thanh_vien_1', { title: 'Trang cá nhân', profile: req.user, headProfile: req.user });
  };