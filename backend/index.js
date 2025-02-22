import express from "express";
import dotenv from "dotenv"
dotenv.config()
import { connectDB } from "./db/connectDB.js";


const app = express();
app.get("/",(req, res)=>{
    res.send("Hello world 123")
})

app.use("/api")

app.listen(3000, ()=>{
    connectDB()
    console.log("server is runing on port 3000");
})
