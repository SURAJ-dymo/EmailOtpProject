import mongoose from "mongoose";

const userOtpSchema=new mongoose.Schema({
    email:{
        type:String,
        reuired:true
    },
    otp:{
        type:String,
        reuired:true
    }
   
})

const UserOtp=new mongoose.model("userOtps",userOtpSchema);
export default UserOtp;