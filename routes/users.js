import express from "express"
const router = express.Router()
import usersController from "../controllers/users_controller.js"
import passport from "../config/passport-local-strategy.js" 
router.get('/profile/:id', passport.checkAuthentication, usersController.profile)
router.get('/sign-Up', usersController.signUp)
router.get('/sign-In', usersController.signIn) 
router.post('/create', usersController.create)
router.get('/sign-out', usersController.destroySession)

// use passport as a middleware to authenticate
router.post(
    '/create-session',
    passport.authenticate('local', { failureRedirect: '/user/sign-in' },), //if fail
    usersController.createSession // if success
  );

router.post(
  '/update/:id',
  passport.checkAuthentication,
  usersController.updateProfile
)
// fetch the data
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
// Collect data and logged in 
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/sign-in' } ), usersController.createSession)
export default router