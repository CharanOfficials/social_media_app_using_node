import express from "express";
const router = express.Router() // Setup a separate router
import homeController from "../controllers/home_controller.js"
import user from "../routes/users.js"

router.get('/', homeController.home)
//  "user/profile" in browser will hit profile in users.js
router.use('/user', user) 

export default router