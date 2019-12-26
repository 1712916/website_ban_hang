const mongoose =require('mongoose');
const bcrypt=require('bcrypt-nodejs');
const admin=new mongoose.Schema({
    email:{type: String, required:true},
    password: {type: String, required:true},
    name: {type: String, required:true},
    dateOfBirth:{type:String, required:true}
},{collection:'admin'});

user.methods.encryptPassword=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(7777),null);
};

user.methods.validPassword=function(password){
    return bcrypt.compareSync(password,this.password);
};

module.exports=mongoose.model('admin',admin);