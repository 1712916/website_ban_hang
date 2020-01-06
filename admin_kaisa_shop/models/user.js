const mongoose =require('mongoose');
const bcrypt=require('bcrypt-nodejs');

var userSchema = new Schema({
    local: {
        email: String,
        password: String,
        verified: Boolean,
        permalink: String,
        verify_token: String,
        info: {
            avartar: String,
            fullname: String,
            address: String,
            phone: String
        }
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

module.exports=mongoose.model('user',userSchema);