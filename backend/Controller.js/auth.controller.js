import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
export const singup = async(req, res)=>{
    const {email, password, name} = req.body;
   try {
    if(!email || !password || !name){
        throw new Error("All the field are required!");
    }
    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
        return res.status(400).json({success:false, message:"User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 90000).toString();

    const user = new User({
        email,
        password : hashedPassword,
        name,
        verificationToken ,
        verificationTokenExpiresAt : Date.now() + 24 * 60 *60 * 1000 //24 hours
    })

    await user.save();
    //jwt 
    generateTokenAndSetCookie(res, user._id)
    res.status(200).json({
        success : true,
        message : "user created successfully!",
        user : {
            ...user._doc,
            password : undefined
        }
    })
   } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error , signup")
   }
}

export const login = async(req, res)=>{
    res.send("login route")
}

export const logout = async(req, res)=>{
    res.send("login route")
}