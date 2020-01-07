const mongoose=require('mongoose');

const product=new mongoose.Schema({
    
    tenSanPham:{type: String, required:false},
    loaiSanPham:{type: String, required:false},
    giaSanPham:{type: Number, required:false},
    anhSanPham:{type: String, required:false},
    anhSanPham1:{type: String, required:false},
    nhaSanXuat:{type: String, required:false},
    moTaSanPham:{type: String, required:false},
    soLuongSanPham:{type:Number,required:false},
    configuration:{
                cpu:{type: String, required:false},
                hardDisk:{type: String, required:false},
                ram:{type: String, required:false},
                screen:{type: String, required:false},
                graphic: {type: String, required:false},
                os:{type: String, required:false},
                color:{type: String, required:false}
    },
    nguoiDang:{type:mongoose.Schema.Types.ObjectId}

},{collection:'sanPham'});


module.exports=mongoose.model('sanPham',product);