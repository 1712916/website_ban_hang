
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderSchema = new Schema({
    dsSanPham: Array,
	tongTien: Number,
	soSanPham:Number,
	nguoiMua: mongoose.Schema.Types.ObjectId,
	tenNguoiMua: String,
    diaChi: String,
    dienThoai: String,
	tinhTrang: String,
	ngayGiao:{
		ngay:Number,
		thang:Number,
		nam:Number
	}
	
});
module.exports = mongoose.model('order', orderSchema);
