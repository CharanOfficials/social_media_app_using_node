import express from "express";
const router = express.Router() // Setup a separate router
import posts from './posts.js'
import users from './users.js'

router.use('/posts', posts)
router.use('/users', users)
export default router