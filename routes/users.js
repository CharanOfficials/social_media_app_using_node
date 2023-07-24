import express from "express"
const router = express.Router()
import usersController from "../controllers/users_controller.js"
import post from "../routes/post.js"

router.get('/profile', usersController.profile)
router.get('/postLikes', post) 
router.get('/post', post) 

export default router