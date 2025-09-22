import axios from 'axios'
import FormData from 'form-data'
import userModel from '../models/userModel.js'

// Controller function to enhance image using ClipDrop Image Upscaling API
export const enhanceImage = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId
    const imageFile = req.file

    if (!imageFile) {
    return res.json({ success: false, message: 'No image file provided' })
  }


    // Fetching User Details Using userId
    const user = await userModel.findById(userId)
    
    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }

    // Checking User creditBalance
    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }

    // Prepare form data for ClipDrop Image Upscaling API
    const formData = new FormData()
    formData.append('image_file', imageFile.buffer, {
      filename: imageFile.originalname,
      contentType: imageFile.mimetype
    })

    try {
      // Primary endpoint for ClipDrop Image Upscaling API
      let response
      try {
        response = await axios.post('https://clipdrop-api.co/image-upscaling/v1', formData, {
          headers: {
            'x-api-key': process.env.CLIPDROP_API,
            ...formData.getHeaders()
          },
          responseType: 'arraybuffer'
        })
      } catch (primaryError) {
        // Fallback to legacy endpoint if primary fails
        console.log('Primary upscaling endpoint failed, retrying legacy endpoint...', primaryError.response?.status || primaryError.message)
        response = await axios.post('https://clipdrop-api.co/image-upscaling/v1/upscale', formData, {
          headers: {
            'x-api-key': process.env.CLIPDROP_API,
            ...formData.getHeaders()
          },
          responseType: 'arraybuffer'
        })
      }

      // Convert response to base64
      const base64Image = Buffer.from(response.data, 'binary').toString('base64')
      const enhancedImageUrl = `data:image/png;base64,${base64Image}`

      // Deduct credit from user
      await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: -1 } })

      res.json({ 
        success: true, 
        message: 'Image enhanced successfully!',
        enhancedImage: enhancedImageUrl,
        creditBalance: user.creditBalance - 1
      })

    } catch (apiError) {
      const detail = apiError.response?.data?.error || apiError.response?.statusText || apiError.message
      console.log('ClipDrop Upscaling Error:', detail)
      res.json({ 
        success: false, 
        message: `Failed to enhance image: ${detail}`,
        creditBalance: user.creditBalance
      })
    }

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

// Controller function to colorize black & white images using ClipDrop Colorize API
export const colorizeImage = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId
    const imageFile = req.file

    if (!imageFile) {
      return res.json({ success: false, message: 'No image file provided' })
    }

    const user = await userModel.findById(userId)
    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }
    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }

    const formData = new FormData()
    formData.append('image_file', imageFile.buffer, {
      filename: imageFile.originalname,
      contentType: imageFile.mimetype
    })

    try {
      const response = await axios.post('https://clipdrop-api.co/colorize/v1', formData, {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formData.getHeaders()
        },
        responseType: 'arraybuffer'
      })

      const base64Image = Buffer.from(response.data, 'binary').toString('base64')
      const colorizedImageUrl = `data:image/png;base64,${base64Image}`

      await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: -1 } })

      res.json({
        success: true,
        message: 'Image colorized successfully!',
        colorizedImage: colorizedImageUrl,
        creditBalance: user.creditBalance - 1
      })

    } catch (apiError) {
      console.log('ClipDrop API Error:', apiError.response?.data || apiError.message)
      res.json({
        success: false,
        message: apiError.response?.data?.error || 'Failed to colorize image',
        creditBalance: user.creditBalance
      })
    }
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

// Controller function to remove objects (alias to Cleanup API)
export const removeObjects = async (req, res) => {
  return cleanupImage(req, res)
}

// Controller function for Style Transfer using Reimagine with style prompts
export const styleTransfer = async (req, res) => {
  try {
    const { styleId } = req.body
    const userId = req.userId || req.body.userId
    const imageFile = req.file

    if (!imageFile) {
      return res.json({ success: false, message: 'No image file provided' })
    }

    const user = await userModel.findById(userId)
    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }
    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }

    const stylePrompts = {
      'van-gogh': 'in the style of Vincent van Gogh with bold brush strokes and vibrant swirling patterns',
      'picasso': 'in the style of Pablo Picasso cubism with geometric abstraction and bold shapes',
      'monet': 'in the style of Claude Monet impressionism with soft light and pastel color palette',
      'abstract': 'abstract art style with expressive forms, high contrast and artistic textures',
      'watercolor': 'watercolor painting style with soft edges, gentle gradients and paper texture',
      'oil-painting': 'oil painting style with rich textures, layered strokes and realistic depth'
    }

    const stylePrompt = stylePrompts[styleId] || 'artistic style transfer with pleasing artistic aesthetics'

    const formData = new FormData()
    formData.append('image_file', imageFile.buffer, {
      filename: imageFile.originalname,
      contentType: imageFile.mimetype
    })
    formData.append('prompt', stylePrompt)

    try {
      const response = await axios.post('https://clipdrop-api.co/reimagine/v1/reimagine', formData, {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formData.getHeaders()
        },
        responseType: 'arraybuffer'
      })

      const base64Image = Buffer.from(response.data, 'binary').toString('base64')
      const styledImageUrl = `data:image/png;base64,${base64Image}`

      await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: -1 } })

      res.json({
        success: true,
        message: 'Style applied successfully!',
        styledImage: styledImageUrl,
        creditBalance: user.creditBalance - 1
      })

    } catch (apiError) {
      console.log('ClipDrop API Error:', apiError.response?.data || apiError.message)
      res.json({
        success: false,
        message: apiError.response?.data?.error || 'Failed to apply style',
        creditBalance: user.creditBalance
      })
    }
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

// Controller function to remove background using ClipDrop Remove Background API
export const removeBackground = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId
    const imageFile = req.file

    if (!imageFile) {
      return res.json({ success: false, message: 'No image file provided' })
    }

    // Fetching User Details Using userId
    const user = await userModel.findById(userId)
    
    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }

    // Checking User creditBalance
    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }

    // Prepare form data for ClipDrop Remove Background API
    const formData = new FormData()
    formData.append('image_file', imageFile.buffer, {
      filename: imageFile.originalname,
      contentType: imageFile.mimetype
    })

    try {
      // Call ClipDrop Remove Background API
      const response = await axios.post('https://clipdrop-api.co/remove-background/v1', formData, {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formData.getHeaders()
        },
        responseType: 'arraybuffer'
      })

      // Convert response to base64
      const base64Image = Buffer.from(response.data, 'binary').toString('base64')
      const processedImageUrl = `data:image/png;base64,${base64Image}`

      // Deduct credit from user
      await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: -1 } })

      res.json({ 
        success: true, 
        message: 'Background removed successfully!',
        processedImage: processedImageUrl,
        creditBalance: user.creditBalance - 1
      })

    } catch (apiError) {
      console.log('ClipDrop API Error:', apiError.response?.data || apiError.message)
      res.json({ 
        success: false, 
        message: apiError.response?.data?.error || 'Failed to remove background',
        creditBalance: user.creditBalance
      })
    }

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

// Controller function for Reimagine using ClipDrop Reimagine API
export const reimagineImage = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId
    const imageFile = req.file

    if (!imageFile) {
      return res.json({ success: false, message: 'No image file provided' })
    }

    // Fetching User Details Using userId
    const user = await userModel.findById(userId)
    
    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }

    // Checking User creditBalance
    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }

    // Prepare form data for ClipDrop Reimagine API
    const formData = new FormData()
    formData.append('image_file', imageFile.buffer, {
      filename: imageFile.originalname,
      contentType: imageFile.mimetype
    })

    try {
      // Call ClipDrop Reimagine API
      const response = await axios.post('https://clipdrop-api.co/reimagine/v1', formData, {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formData.getHeaders()
        },
        responseType: 'arraybuffer'
      })

      // Convert response to base64
      const base64Image = Buffer.from(response.data, 'binary').toString('base64')
      const reimaginedImageUrl = `data:image/png;base64,${base64Image}`

      // Deduct credit from user
      await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: -1 } })
      
      res.json({ 
        success: true, 
        message: 'Image reimagined successfully!',
        reimaginedImage: reimaginedImageUrl,
        creditBalance: user.creditBalance - 1
      })

    } catch (apiError) {
      console.log('ClipDrop API Error:', apiError.response?.data || apiError.message)
      res.json({ 
        success: false, 
        message: apiError.response?.data?.error || 'Failed to reimagine image',
        creditBalance: user.creditBalance
      })
    }

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

// Controller function for Replace Background using ClipDrop Replace Background API
export const replaceBackground = async (req, res) => {
  try {
    const { prompt } = req.body
    const userId = req.userId || req.body.userId
    const imageFile = req.file

    if (!imageFile || !prompt) {
      return res.json({ success: false, message: 'Image file and prompt are required' })
    }

    // Fetching User Details Using userId
    const user = await userModel.findById(userId)
    
    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }

    // Checking User creditBalance
    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }

    // Prepare form data for ClipDrop Replace Background API
    const formData = new FormData()
    formData.append('image_file', imageFile.buffer, {
      filename: imageFile.originalname,
      contentType: imageFile.mimetype
    })
    formData.append('prompt', prompt)

    try {
      // Call ClipDrop Replace Background API
      const response = await axios.post('https://clipdrop-api.co/replace-background/v1', formData, {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formData.getHeaders()
        },
        responseType: 'arraybuffer'
      })

      // Convert response to base64
      const base64Image = Buffer.from(response.data, 'binary').toString('base64')
      const processedImageUrl = `data:image/png;base64,${base64Image}`

      // Deduct credit from user
      await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: -1 } })

      res.json({ 
        success: true, 
        message: 'Background replaced successfully!',
        processedImage: processedImageUrl,
        creditBalance: user.creditBalance - 1
      })

    } catch (apiError) {
      console.log('ClipDrop API Error:', apiError.response?.data || apiError.message)
      res.json({ 
        success: false, 
        message: apiError.response?.data?.error || 'Failed to replace background',
        creditBalance: user.creditBalance
      })
    }

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

// Controller function for Uncrop using ClipDrop Uncrop API
export const uncropImage = async (req, res) => {
  try {
    const { extendLeft = 0, extendRight = 0, extendUp = 0, extendDown = 0 } = req.body
    const userId = req.userId || req.body.userId
    const imageFile = req.file

    if (!imageFile) {
      return res.json({ success: false, message: 'No image file provided' })
    }

    // Fetching User Details Using userId
    const user = await userModel.findById(userId)
    
    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }

    // Checking User creditBalance
    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }

    // Prepare form data for ClipDrop Uncrop API
    const formData = new FormData()
    formData.append('image_file', imageFile.buffer, {
      filename: imageFile.originalname,
      contentType: imageFile.mimetype
    })
    
    // Add extend parameters if provided
    if (extendLeft > 0) formData.append('extend_left', extendLeft.toString())
    if (extendRight > 0) formData.append('extend_right', extendRight.toString())
    if (extendUp > 0) formData.append('extend_up', extendUp.toString())
    if (extendDown > 0) formData.append('extend_down', extendDown.toString())

    try {
      // Call ClipDrop Uncrop API
      const response = await axios.post('https://clipdrop-api.co/uncrop/v1', formData, {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formData.getHeaders()
        },
        responseType: 'arraybuffer'
      })

      // Convert response to base64
      const base64Image = Buffer.from(response.data, 'binary').toString('base64')
      const processedImageUrl = `data:image/png;base64,${base64Image}`

      // Deduct credit from user
      await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: -1 } })

      res.json({ 
        success: true, 
        message: 'Image uncropped successfully!',
        processedImage: processedImageUrl,
        creditBalance: user.creditBalance - 1
      })

    } catch (apiError) {
      console.log('ClipDrop API Error:', apiError.response?.data || apiError.message)
      res.json({ 
        success: false, 
        message: apiError.response?.data?.error || 'Failed to uncrop image',
        creditBalance: user.creditBalance
      })
    }

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

// Controller function for Remove Text using ClipDrop Remove Text API
export const removeText = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId
    const imageFile = req.file

    if (!imageFile) {
      return res.json({ success: false, message: 'No image file provided' })
    }

    // Fetching User Details Using userId
    const user = await userModel.findById(userId)
    
    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }

    // Checking User creditBalance
    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }

    // Prepare form data for ClipDrop Remove Text API
    const formData = new FormData()
    formData.append('image_file', imageFile.buffer, {
      filename: imageFile.originalname,
      contentType: imageFile.mimetype
    })

    try {
      // Call ClipDrop Remove Text API
      const response = await axios.post('https://clipdrop-api.co/remove-text/v1', formData, {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formData.getHeaders()
        },
        responseType: 'arraybuffer'
      })

      // Convert response to base64
      const base64Image = Buffer.from(response.data, 'binary').toString('base64')
      const processedImageUrl = `data:image/png;base64,${base64Image}`

      // Deduct credit from user
      await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: -1 } })

      res.json({ 
        success: true, 
        message: 'Text removed successfully!',
        processedImage: processedImageUrl,
        creditBalance: user.creditBalance - 1
      })

    } catch (apiError) {
      console.log('ClipDrop API Error:', apiError.response?.data || apiError.message)
      res.json({ 
        success: false, 
        message: apiError.response?.data?.error || 'Failed to remove text',
        creditBalance: user.creditBalance
      })
    }

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

// Controller function for Cleanup using ClipDrop Cleanup API
export const cleanupImage = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId
    const imageFile = req.file
    const maskFile = req.files?.mask_file?.[0] // For mask-based cleanup

    if (!imageFile) {
      return res.json({ success: false, message: 'No image file provided' })
    }

    // Fetching User Details Using userId
    const user = await userModel.findById(userId)
    
    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }

    // Checking User creditBalance
    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
    }

    // Prepare form data for ClipDrop Cleanup API
    const formData = new FormData()
    formData.append('image_file', imageFile.buffer, {
      filename: imageFile.originalname,
      contentType: imageFile.mimetype
    })
    
    if (maskFile) {
      formData.append('mask_file', maskFile.buffer, {
        filename: maskFile.originalname,
        contentType: maskFile.mimetype
      })
    }

    try {
      // Call ClipDrop Cleanup API
      const response = await axios.post('https://clipdrop-api.co/cleanup/v1', formData, {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formData.getHeaders()
        },
        responseType: 'arraybuffer'
      })

      // Convert response to base64
      const base64Image = Buffer.from(response.data, 'binary').toString('base64')
      const processedImageUrl = `data:image/png;base64,${base64Image}`

      // Deduct credit from user
      await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: -1 } })

      res.json({ 
        success: true, 
        message: 'Image cleaned up successfully!',
        processedImage: processedImageUrl,
        creditBalance: user.creditBalance - 1
      })

    } catch (apiError) {
      console.log('ClipDrop API Error:', apiError.response?.data || apiError.message)
      res.json({ 
        success: false, 
        message: apiError.response?.data?.error || 'Failed to cleanup image',
        creditBalance: user.creditBalance
      })
    }

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}
