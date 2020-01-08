const mongoose =require('mongoose');

const cartSchema=new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId},
    idUser: {type: String},
    hinh:{type: String},
    ten:{type: String},
    gia:{type: Number},
    soLuong:{type: Number}
},{collection:'Cart'});

module.exports=mongoose.model('Cart',cartSchema);