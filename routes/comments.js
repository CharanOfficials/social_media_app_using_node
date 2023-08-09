import express from "express"
import passport from "passport"
const router = express.Router()
import commentsController from "../controllers/comments_controller.js"

router.post('/create',passport.checkAuthentication ,commentsController.createComment)
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy)
export default router