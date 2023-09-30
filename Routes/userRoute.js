import express from "express";
import { registerUser,userOtpSend,verifyUser } from "../controller/userController.js";

const router=express.Router();
router.post("/registeruser",registerUser)
router.post("/emailopt",userOtpSend)
router.post("/verifyuser",verifyUser)


export default router;