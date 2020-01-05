// models/user.model.js
// load những thư viện chúng ta cần
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// định nghĩ cấu trúc user model
var Schema = mongoose.Schema;
var userSchema = new Schema({
    local: {
        email: { type: String, required: true },
        password: { type: String, required: true }
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});
userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model('User', userSchema);