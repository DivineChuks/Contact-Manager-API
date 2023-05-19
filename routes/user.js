import express from 'express'
import { getUserProfile } from '../controllers/user.js'
import { validateToken } from '../middleware/validateToken.js'

const router = express.Router()


router.get("/profile", validateToken, getUserProfile)




export default router