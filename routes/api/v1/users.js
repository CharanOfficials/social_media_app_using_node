import express from "express";
const router = express.Router() // Setup a separate router
import usersApi from '../../../controllers/api/v1/users_api.js'

router.post('/create-session', usersApi.createSession)

export default router