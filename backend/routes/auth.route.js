import express from "express"
import { login, logout, singup, verifyEmail } from "../Controller.js/auth.controller.js"

const router = express.Router()

router.post("/signup",singup)
router.post("/verify-email", verifyEmail)

router.post("/login",login)
router.post("/logout",logout )

router



export default router