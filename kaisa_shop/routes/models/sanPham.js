const mongoose =require('mongoose');

const sanPhamSchema=new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId},
    tenSanPham:{type: String},
    loaiSanPham:{type: String},
    giaSanPham:{type: Number},
    anhSanPham:{type: String},
    nhaSanXuat:{type: String},
    moTaSanPham:{type: String},
    tinhTrangSanPham:{type: Boolean},
    ngayTaoSanPham:{type:Date},
    mauSac:{type: String},
    soLuongSanPham:{type: Number}
},{collection:'sanPham'});

module.exports=mongoose.model('sanPham',sanPhamSchema); 