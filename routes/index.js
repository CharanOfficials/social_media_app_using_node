import express from "express";
const router = express.Router() // Setup a separate router
import homeController from "../controllers/home_controller.js"

router.get('/', homeController.home)

export default router