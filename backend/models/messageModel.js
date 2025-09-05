const mongoose=require('mongoose');
const messageModel=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,   //users id from 'User'
        ref:'User',
        required:true
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,   //receivers id from 'User'
        ref:'User',
          required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true});
module.exports=mongoose.model('Message',messageModel);