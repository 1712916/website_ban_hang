exports.signUp=function(req,res,next){
    if (req.isAuthenticated()) {
        res.redirect('/');
      }
      res.render('./tai_khoan/dang_ky', { title: 'Đăng ký', layout: false, message: req.flash('message') });
};

exports.signIn=function(req,res,next){
    if (req.isAuthenticated()) {
        res.redirect('/');
      }
      res.render('./tai_khoan/dang_nhap', { title: 'Đăng nhập', layout: false, message: req.flash('message'), email: req.flash('email') });
};

exports.recovery=function(req,res,next){
    if (req.isAuthenticated()) {
        res.redirect('/');
      }
      res.render('./tai_khoan/quen_mat_khau', { title: 'Quên mật khẩu', layout: false });
};

exports.signOut=function(req,res,next){
    req.logout();
    res.redirect('/');
};

