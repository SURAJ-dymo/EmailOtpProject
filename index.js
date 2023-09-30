import express from 'express';
import userRouter from './Routes/userRoute.js';
import Connection from './Connection/Conn.js';
import cors from 'cors';



Connection();
const App=express();
App.use(cors())
App.use(express.json())

App.use("/api/v1",userRouter)
App.listen(8000,()=>{
     console.log("server is running on port number 8000")
})