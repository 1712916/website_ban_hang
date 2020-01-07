const mongoose =require('mongoose');

const order=new mongoose.Schema({
    dsSanPham: [{
        maSanPham: {type: mongoose.Schema.Types.ObjectId},
			giaSanPham:Number,
			soLuong:Number
    }	
	],
	soLuong:Number,
    tongTien:{type:Number},
	tinhTrang:String,
	ngayGiao:{
		ngay:Number,
		thang:Number,
		nam:Number
	}
	
	
	

},{collection:'order'});


module.exports=mongoose.model('order',order);