var express = require('express');
var router = express.Router();

// Require controller modules.
var sanPham_controller = require('../controllers/sanPhamController');
var gioHang_controller = require('../controllers/gioHangController');
var timKiem_controller = require('../controllers/timKiemController');

//SANPHAM ROUTE
router.get('/', sanPham_controller.danhMucSanPham);
router.get('/users/san_pham/danh_muc_san_pham/:current_page', sanPham_controller.danhMucSanPham);
router.get('/users/san_pham/danh_muc_san_pham/:cach_phan_loai/:phan_loai/:current_page', sanPham_controller.cachPhanLoai);
router.get('/users/san_pham/danh_muc_san_pham/sap_xep/:cach_sap_xep/:current_page', sanPham_controller.sapXep);
router.get('/users/san_pham/danh_muc_san_pham/san_pham_1', sanPham_controller.sanPham1);
router.get('/chi_tiet_sp/:id/:current_page', sanPham_controller.chiTietSanPham);
router.post('/chi_tiet_sp/:id/:current_page', sanPham_controller.updateChiTietSanPham);

router.get('/users/mua_hang/gio_hang', gioHang_controller.gioHang);
router.post('/users/mua_hang/gio_hang', gioHang_controller.themGioHang);

router.get('/users/tim_kiem', timKiem_controller.vaoTimKiemTuHeader);
router.get('/users/tim_kiem/:current_page', timKiem_controller.timKiemGet);

router.get('/users/tim_kiem_ket_hop/:current_page', timKiem_controller.timKiemKetHop);

module.exports = router;