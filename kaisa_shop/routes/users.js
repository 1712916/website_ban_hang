var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('user/');
  res.render('./user/san_pham/danh_muc_san_pham', { title: 'Các Sản Phẩm' });
});
router.get('/san_pham/danh_muc_san_pham', function(req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/san_pham/danh_muc_san_pham', { title: 'Các Sản Phẩm' });
});
router.get('/san_pham/danh_muc_san_pham/san_pham_1', function(req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/san_pham/danh_muc_san_pham/chi_tiet_san_pham/san_pham_1', { title: 'Tên Sản Phẩm 1' });
});
router.get('/mua_hang/thanh_toan', function(req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/mua_hang/thanh_toan', { title: 'Thanh Toán Bà Chủ' });
});
router.get('/mua_hang/xac_nhan', function(req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/mua_hang/xac_nhan', { title: 'Xác Nhận Đơn Hàng' });
});
router.get('/mua_hang/gio_hang', function(req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/mua_hang/gio_hang', { title: 'Giỏ Hàng' });
});
router.get('/tai_khoan/dang_ky', function(req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/tai_khoan/dang_ky', { title: 'Đăng Ký' });
});
router.get('/tai_khoan/dang_nhap', function(req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/tai_khoan/dang_nhap', { title: 'Đăng Nhập' });
});
router.get('/tai_khoan/theo_doi_don_hang', function(req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/tai_khoan/theo_doi_don_hang', { title: 'Theo Dõi Đơn Hàng' });
});
router.get('/lien_he', function(req, res, next) {
  //res.send('user/san_pham');
  res.render('./user/lien_he/lien_he', { title: 'Liên Hệ' });
});

module.exports = router;