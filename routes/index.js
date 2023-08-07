import express from "express";
const router = express.Router() // Setup a separate router
import homeController from "../controllers/home_controller.js"
import user from "../routes/users.js"
import post from '../routes/posts.js'
import comments from "../routes/comments.js"

router.get('/', homeController.home)
//  "user/profile" in browser will hit profile in users.js
router.use('/user', user) 
router.use('/posts', post)
router.use('/comments', comments)

export default router