import express from 'express'
const router = express.Router()
import friendsController from '../controllers/friends_controller.js'

router.get('/toggle', friendsController.toggleFriend)

export default router