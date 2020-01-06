// const mongoose =require('mongoose');

// const sanPhamSchema=new mongoose.Schema({
//     _id:{type:mongoose.Schema.Types.ObjectId},
//     tenSanPham:{type: String},
//     loaiSanPham:{type: String},
//     giaSanPham:{type: Number},
//     anhSanPham:{type: [String]},
//     nhaSanXuat:{type: [String]},
//     hanSuDung:{type:Date},
//     moTaSanPham:{type: String},
//     tinhTrangSanPham:{type: Boolean},
//     ngayTaoSanPham:{type:Date}
// },{collection:'sanPham'});

// module.exports=mongoose.model('sanPham',sanPhamSchema); 


const mongoose =require('mongoose');

const product=new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId},
    tenSanPham:{type: String, required:true},
    loaiSanPham:{type: String, required:true},
    giaSanPham:{type: Number, required:true},
    anhSanPham:{type: [String], required:true},
    nhaSanXuat:{type: [String], required:true},
    moTaSanPham:{type: String, required:true},
    configuration:{
                cpu:{type: String, required:false},
                hardDisk:{type: String, required:false},
                ram:{type: String, required:false},
                screen:{type: String, required:false},
                graphic: {type: String, required:false},
                os:{type: String, required:false},
                color:{type: String, required:false}
    },
    posted:{type:mongoose.Schema.Types.ObjectId}

},{collection:'sanPham'});


module.exports=mongoose.model('sanPham',product);
