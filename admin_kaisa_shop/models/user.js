const mongoose =require('mongoose');

var userSchema = new mongoose.Schema({
    lock:Boolean,
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
            phone: String,
            birthday:String
        }
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    lock:{type:Boolean}
});

module.exports=mongoose.model('user',userSchema);