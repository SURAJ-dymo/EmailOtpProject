import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   phone:{
    type:String,
    required:true
   },
   phone:{
    type:String,
    required:true
   },
   city:{
    type:String,
    required:true
   },
   grade:{
    type:String,
    required:true
   },
   mystate:{
    type:String,
    required:true
   },
   schoolName:{
    type:String,
    required:true
   }
})

 const User=new mongoose.model("users",userSchema);
 export default User;