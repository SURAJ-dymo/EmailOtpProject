import dotenv from 'dotenv';

import User from "../model/userModel.js";
import UserOtp from "../model/userOtp.js";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

dotenv.config()

//email config

const transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
          user: process.env.EMAIL,
          pass:process.env.PASS
     }
})


export const registerUser = async (req, res, next) => {

     const { name, email, phone, city, grade, mystate, schoolName } = req.body;
     console.log(name, email, phone, city, grade, mystate, schoolName)

     const u = new User({
          name, email, phone, city, grade, mystate, schoolName
     })
     const savedUser = await u.save();

     res.status(200).json({
          user: savedUser,
          message: "user Saved Successfully",
          success: true
     })
}
export const userOtpSend = async (req, res) => {
  
    const {email}=req.body;
     if (!email) {
          res.status(400).json({
               error: "Please Enter Your Email"
          })
     }
     try {
          const preuser = await User.findOne({ email: email });
           
          if (preuser) {
              

               const OTP = Math.floor(100000 + Math.random() * 900000);
              

               const existMail = await UserOtp.findOne({ email: email });
               if (existMail) {
                    const datateUserOtpdata = await UserOtp.findByIdAndUpdate({ _id: existMail._id }, { otp: OTP }, { new: true });
                    await datateUserOtpdata.save();

                    const mailOptions = {
                         from: "surajmane0369@gmail.com",
                         to: email,
                         subject: "sending otp for mail verification",
                         text: `OTP-${OTP}`
                    }
                    transporter.sendMail(mailOptions, (err, info) => {
                         if (err) {
                              console.log(err)
                              res.status(400).json({ error: "email not send" })
                         } else {
                              res.status(200).json({
                                   message: "otp send successfully"
                              })
                         }
                    })


               } else {
                    const saveOtpData = new UserOtp({
                         email,
                         otp: OTP
                    })
                    await saveOtpData.save()

                    const mailOptions = {
                         from: "surajmane0369@gmail.com",
                         to: email,
                         subject: "sending otp for mail verification",
                         text: `OTP-${OTP}`
                    }
                    transporter.sendMail(mailOptions, (err, info) => {
                         if (err) {
                             
                              res.status(400).json({ error: "email not send" })
                         } else {
                              res.status(200).json({
                                   message: "otp send successfully"
                              })
                         }
                    })
               }
          }

     } catch (error) {
         
          res.status(400).json({
               error: 'This User Not Exist in our DB'
          })
     }

}

export const verifyUser=async(req,res)=>{

           const {otpss}=req.body
         
        
try {
     const u=await UserOtp.findOne({otp:otpss});

     if(u){

        const validUser=await User.findOne({email:u.email});
    const token=jwt.sign({id:validUser._id},process.env.SECRETEKEY,{expiresIn:process.env.JWT_EXPIRE});

    res.status(200).json({
         user:validUser,
         message:"your are valid user",
         success:true,
         token:token
    })
      


     }else{
              res.status(400).json({
                   message:"user not found"
              })
     }
} catch (error) {
     res.status(400).json({
          message:"user not found",
          error
     })
}
          




}
