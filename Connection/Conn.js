import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config()
const Connection=()=>{
    mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log("data baseconnected successfully")
    }).catch((e)=>{
        console.log("somthing went wrong on database")

    })
}
export default Connection;