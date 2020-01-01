const mongoose =require('mongoose');

const commentSchema=new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId},
    idSP: {type: String},
    username:{type: String},
    commentDate:{type: Date},
    message:{type: String}
},{collection:'Comment'});

module.exports=mongoose.model('Comment',commentSchema); 