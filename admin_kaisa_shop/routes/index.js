var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ds_thanh_vien', function(req, res, next) {
  res.render('./thanh_vien/danh_sach_thanh_vien', { title: 'Express' });
});
router.get('/ds_don_hang', function(req, res, next) {
  res.render('./don_hang/danh_sach_don_hang', { title: 'Express' });
});

router.get('/dang_nhap', function(req, res, next) {
  res.render('./tai_khoan/dang_nhap', { title: 'Express' });
});

router.get('/dang_ky', function(req, res, next) {
  res.render('./tai_khoan/dang_ky', { title: 'Express' });
});

router.get('/quen_mat_khau', function(req, res, next) {
  res.render('./tai_khoan/quen_mat_khau', { title: 'Express' });
});


router.get('/ds_thanh_vien/thanh_vien_1', function(req, res, next) {
  res.render('./thanh_vien/ds_thanh_vien/thanh_vien_1', { title: 'Express' });
});
router.get('/top_san_pham', function(req, res, next) {
  res.render('./san_pham/top_san_pham', { title: 'Express' });
});
router.get('/tat_ca_san_pham', function(req, res, next) {
  res.render('./san_pham/tat_ca_san_pham', { title: 'Express' });
});



module.exports = router;
