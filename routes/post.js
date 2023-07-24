import express from "express"
const router = express.Router()
import postsController from "../controllers/post_controller.js"

router.get('/post', postsController.post)
router.get('/postLikes', postsController.postLikes)

export default router