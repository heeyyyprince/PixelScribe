import express from 'express'
import { enhanceImage, removeBackground, reimagineImage, replaceBackground, uncropImage, removeText, cleanupImage, colorizeImage, removeObjects, styleTransfer } from '../controllers/enhanceController.js'
import multer from 'multer'
import userAuth from '../middlewares/auth.js'

const enhanceRouter = express.Router()

// Configure multer for file uploads
const storage = multer.memoryStorage()
const upload = multer({ storage })
const uploadMultiple = multer({ storage }).fields([
  { name: 'image', maxCount: 1 },
  { name: 'mask_file', maxCount: 1 }
])

// Routes for ClipDrop API features (protected)
enhanceRouter.post('/enhance-image', userAuth, upload.single('image'), enhanceImage)
enhanceRouter.post('/remove-background', userAuth, upload.single('image'), removeBackground)
enhanceRouter.post('/reimagine', userAuth, upload.single('image'), reimagineImage)
enhanceRouter.post('/replace-background', userAuth, upload.single('image'), replaceBackground)
enhanceRouter.post('/uncrop', userAuth, upload.single('image'), uncropImage)
enhanceRouter.post('/remove-text', userAuth, upload.single('image'), removeText)
enhanceRouter.post('/cleanup', userAuth, uploadMultiple, cleanupImage)

// New routes expected by frontend
enhanceRouter.post('/colorize-image', userAuth, upload.single('image'), colorizeImage)
enhanceRouter.post('/remove-objects', userAuth, upload.single('image'), removeObjects)
enhanceRouter.post('/style-transfer', userAuth, upload.single('image'), styleTransfer)

export default enhanceRouter
