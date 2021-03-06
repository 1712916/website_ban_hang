const mongoose =require('mongoose');
const bcrypt=require('bcrypt-nodejs');

//super
const admin=new mongoose.Schema({
    email:{type: String, required:true},
    password: {type: String, required:true},
    name:{type: String, required:false},
    phone:{type: String, required:false},
    birthday: {type: String},
    address:{type: String, required:false},
    company: {type: String, required:false},
    avatar:{type:String, required:false},
    permission: {type: String, required:false}
},{collection:'admin'});

admin.methods.encryptPassword=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(7777),null);
};

admin.methods.validPassword=function(password){
    return bcrypt.compareSync(password,this.password);
};

module.exports=mongoose.model('admin',admin);