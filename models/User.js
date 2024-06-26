const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{type:String,required:true,unique:true},
    username:{type:String,requried:true,unique:true},
    password:{type:String,required:true},
    isVerified:{type:Boolean,default:false},
    location:String,
    age:Number,
    work:String,
    DOB:String,
    description:String,
    otp:String

});
const User = mongoose.models.User || mongoose.model("User",UserSchema);
module.exports =  User;