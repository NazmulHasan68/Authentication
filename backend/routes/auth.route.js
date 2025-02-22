import express from "express"
import { login, logout, singup } from "../Controller.js/auth.controller.js"

const router = express.Router()

router.get("/signup",singup)

router.get("/login",login)

router.get("/logout",logout )


export default router