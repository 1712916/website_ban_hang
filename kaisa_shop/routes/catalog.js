var express = require('express');
var router = express.Router();

// Require controller modules.
var sanPham_controller = require('../controllers/sanPhamController');

//SANPHAM ROUTE
router.get('/', sanPham_controller.danhMucSanPham);
router.get('/users/san_pham/danh_muc_san_pham', sanPham_controller.danhMucSanPham);
router.get('/users/san_pham/danh_muc_san_pham/:cach_phan_loai/:phan_loai', sanPham_controller.cachPhanLoai);
router.get('/users/san_pham/danh_muc_san_pham/sap_xep/:cach_sap_xep', sanPham_controller.sapXep);
router.get('/users/san_pham/danh_muc_san_pham/san_pham_1', sanPham_controller.sanPham1);
router.get('/chi_tiet_sp/:id', sanPham_controller.chiTietSanPham);

module.exports = router;