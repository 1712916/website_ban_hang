const mongoose =require('mongoose');

const sanPhamSchema=new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId},
    tenSanPham:{type: String},
    loaiSanPham:{type: String},
    giaSanPham:{type: Number},
    anhSanPham:{type: [String]},
    nhaSanXuat:{type: [String]},
    hanSuDung:{type:Date},
    moTaSanPham:{type: String},
    tinhTrangSanPham:{type: Boolean},
    ngayTaoSanPham:{type:Date}
},{collection:'sanPham'});

module.exports=mongoose.model('sanPham',sanPhamSchema); 