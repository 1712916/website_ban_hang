var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderSchema = new Schema({
    dsSanPham:  [{type : Object}],
    tongTien: Number,
    tenNguoiMua: String,
    nguoiMua: mongoose.Schema.Types.ObjectId,
    diaChi: String,
    soSanPham: Number,
    dienThoai: String,
    tinhTrang: String,
    ngayGiao: {
        ngay: Number,
        thang: Number,
        nam: Number
    }
});
module.exports = mongoose.model('order', orderSchema);