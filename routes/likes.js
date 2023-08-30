import express from 'express'
import likesController from '../controllers/likes_controller.js'
const router = express.Router()

router.post('/toggle', likesController.toggleLike)
export default router