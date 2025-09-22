import express from 'express'
import { chatWithAI, searchProject } from '../controllers/chatController.js'

const chatRouter = express.Router()

// Public endpoints for chatbot
chatRouter.post('/ai', chatWithAI)
chatRouter.post('/search', searchProject)

export default chatRouter
