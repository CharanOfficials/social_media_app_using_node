import express from "express"
const router = express.Router()
import postsController from "../controllers/posts_controller.js"

router.post('/create', postsController.post)

export default router