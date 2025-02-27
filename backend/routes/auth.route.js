import express from "express"
import { forgotPassword, login, logout, resetPassword, singup, verifyEmail } from "../Controller.js/auth.controller.js"

const router = express.Router()

router.post("/signup",singup)
router.post("/verify-email", verifyEmail)

router.post("/login",login)
router.post("/logout",logout )

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);



export default router