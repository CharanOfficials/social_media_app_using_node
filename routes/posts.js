import express from "express"
import passport from "passport"
const router = express.Router()
import postsController from "../controllers/posts_controller.js"

router.post('/create',passport.checkAuthentication ,postsController.post)

export default router