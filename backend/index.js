import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config()
import { connectDB } from "./db/connectDB.js";

import authRoutes from './routes/auth.route.js'


const app = express();
const PORT = process.env.PORT || 5000
app.use(cors({origin : "http://localhost:5173", credentials:true}))

app.get("/",(req, res)=>{
    res.send("Hello world 123")
})
app.use(express.json()) // allows us to parse incoming request : req.body
app.use(cookieParser()) // allows us to parse incoming cookies
app.use("/api/auth", authRoutes)

app.listen(PORT, ()=>{
    connectDB()
    console.log(`server is runing on port ${PORT}`);
})
