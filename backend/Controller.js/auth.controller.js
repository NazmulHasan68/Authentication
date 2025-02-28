import bcrypt from "bcryptjs";
import crypto from "crypto"
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { SendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";


export const checkAuth = async(req, res)=>{
    try {
       const user = await User.findById(req.userId)
       if(!user){
        return res.status(400).json({success:false, message:"User not found!"})
       } 
       res.status(400).json({success:true, user})

    } catch (error) {
        console.log("Check authentication ",error);
        res.status(500).json({success:false, message:"Authentication faild!"})
    }
}

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
    
    await sendVerificationEmail(user.email, verificationToken)


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




//verify email 
export const verifyEmail = async(req, res)=>{
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt : {$gt :Date.now()}
        })
        if(!user){
            return res.status(400).json({success : false, message:"Invalid or expired verification code"})
        }
        user.isVerified = true,
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined
        await user.save()
        
        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({
            success : true,
            message : "Email Verified successfully",
            user : {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const logout = async(req, res)=>{
    res.clearCookie("token")
    res.status(200).json({
        success :true,
        message : "Logged out successfully!"
    })
}


export const login = async(req, res)=>{
    const {email, password} = req.body;

   try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false, message:"Invalid creadentials"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).json({success:false, message:"Invalid creadentials"})
        }
        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success : true,
            message : "Logged in successfully",
            user : {
                ...user._doc,
                password: undefined
            }
        })
   } catch (error) {
        console.log("Error in login function");
        res.status(400).json({success:false, message:error.message})
   }
}



export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordExpiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetPasswordExpiresAt;

        await user.save();

        // Send email
        await SendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        return res.status(200).json({ success: true, message: "Reset password email sent successfully!" });

    } catch (error) {
        console.error("Error in forgotPassword:", error);
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
    }
};


export const resetPassword = async(req, res)=>{
    try {
        const {token} = req.params
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt : {$gt: Date.now()},
        })
        
        if(!user){
            return res.status(400).json({success:false, message:"Invalid or expired reset token"})
        }

        //update password 
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save()
        await sendResetSuccessEmail(user.email);

        res.status(200).json({success:true, message:"password reset successful!"})

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"ResetPassword error"})
    }
}