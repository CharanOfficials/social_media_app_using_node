import express from "express"
const router = express.Router()
import usersController from "../controllers/users_controller.js"
// import post from "../routes/post.js"

router.get('/profile', usersController.profile)
// router.get('/postLikes', post) 
// router.get('/post', post)
router.get('/sign-Up', usersController.signUp)
router.get('/sign-In', usersController.signIn) 
router.post('/create', usersController.create)
router.post('/create-session', usersController.createSession)
router.post('/sign-out', usersController.signOut)

export default router