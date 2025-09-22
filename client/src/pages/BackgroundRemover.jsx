import React, { useContext, useState, useRef } from 'react'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import axios from 'axios'

const BackgroundRemover = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [processedImage, setProcessedImage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const canvasRef = useRef(null)
  const downloadLinkRef = useRef(null)

  const { user, setUser, token, setShowLogin, backendUrl } = useContext(AppContext)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file')
        return
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size should be less than 10MB')
        return
      }
      
      setSelectedFile(file)
      setError(null)
      setProcessedImage(null)
      setProgress(0)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeBackgroundClientSide = async (imageFile) => {
    return new Promise((resolve, reject) => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        // Set canvas dimensions
        canvas.width = img.width
        canvas.height = img.height
        
        // Draw original image
        ctx.drawImage(img, 0, 0)
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        
        // Simple background removal algorithm (removes white/light backgrounds)
        // This is a basic implementation - in production you'd use a more sophisticated AI model
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          
          // Check if pixel is close to white/light background
          const brightness = (r + g + b) / 3
          const isBackground = brightness > 200 && 
                              Math.abs(r - g) < 30 && 
                              Math.abs(g - b) < 30 && 
                              Math.abs(r - b) < 30
          
          if (isBackground) {
            data[i + 3] = 0 // Make transparent
          }
        }
        
        // Put processed image data back
        ctx.putImageData(imageData, 0, 0)
        
        // Convert to blob
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob)
          resolve(url)
        }, 'image/png')
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = URL.createObjectURL(imageFile)
    })
  }
  
  const handleRemoveBackground = async () => {
    if (!selectedImage) {
      toast.error('Please select an image first')
      return
    }

    if (!token) {
      setShowLogin(true)
      return
    }
    
    setLoading(true)
    setError(null)
    setProgress(0)
    
    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      
      const response = await axios.post(`${backendUrl}/api/enhance/remove-background`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response.data.success) {
        setProcessedImage(response.data.processedImage)
        setUser({ ...user, creditBalance: response.data.creditBalance })
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.error('Background removal failed:', error)
      toast.error(error.response?.data?.message || 'Failed to remove background')
    } finally {
      setLoading(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 pt-20">
      <motion.div 
        className='container mx-auto px-4 sm:px-10 md:px-14 lg:px-28 py-16 min-h-screen flex flex-col items-center justify-center'
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className='text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center'
          variants={itemVariants}
        >
          AI Background Remover
        </motion.h1>
        
        <motion.p 
          className='text-gray-600 max-w-2xl text-center mb-12 text-lg'
          variants={itemVariants}
        >
          Remove backgrounds from images instantly with precision AI technology for professional results.
        </motion.p>

      <motion.div 
        className='w-full max-w-4xl flex flex-col items-center'
        variants={itemVariants}
      >
        {/* Upload Area */}
        <motion.div 
          className='w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border-2 border-dashed border-secondary-300 text-center mb-8 hover:border-secondary-500 transition-colors'
          variants={itemVariants}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-secondary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-lg font-medium text-secondary-700 mb-2">Upload Image to Remove Background</p>
              <p className="text-sm text-secondary-500">Drag & drop or click to select</p>
            </div>
          </label>
        </motion.div>

        {/* Preview Area */}
        <motion.div 
          className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl'
          variants={itemVariants}
        >
          <div className='bg-white p-6 rounded-xl shadow-lg'>
            <h3 className='text-lg font-semibold mb-4 text-center text-dark-800'>Original</h3>
            <div className='aspect-square bg-gray-100 rounded-lg flex items-center justify-center'>
              {selectedImage ? (
                <img src={selectedImage} alt="Original" className="max-w-full max-h-full object-contain rounded-lg" />
              ) : (
                <p className='text-gray-500'>No image selected</p>
              )}
            </div>
          </div>

          <div className='bg-white p-6 rounded-xl shadow-lg'>
            <h3 className='text-lg font-semibold mb-4 text-center text-dark-800'>Background Removed</h3>
            <div className='aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden'>
              {/* Checkerboard pattern for transparency */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='10' height='10' fill='%23000'/%3e%3crect x='10' y='10' width='10' height='10' fill='%23000'/%3e%3c/svg%3e")`
              }}></div>
              
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div 
                    key="loading"
                    className='flex flex-col items-center relative z-10'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <div className='w-12 h-12 border-4 border-secondary-500 border-t-transparent rounded-full animate-spin mb-4'></div>
                    <p className='text-gray-600 mb-2'>Removing background...</p>
                    <div className='w-32 bg-gray-200 rounded-full h-2 mb-2'>
                      <div 
                        className='bg-secondary-500 h-2 rounded-full transition-all duration-300'
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className='text-sm text-gray-500'>{progress}%</p>
                  </motion.div>
                ) : processedImage ? (
                  <motion.div
                    key="result"
                    className="relative z-10 w-full h-full flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <img 
                      src={processedImage} 
                      alt="Background removed" 
                      className="max-w-full max-h-full object-contain rounded-lg" 
                    />
                    <motion.button
                      onClick={() => {
                        const link = downloadLinkRef.current
                        link.href = processedImage
                        link.download = `background-removed-${Date.now()}.png`
                        link.click()
                      }}
                      className="absolute top-2 right-2 bg-secondary-600 hover:bg-secondary-700 text-white p-2 rounded-full shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Download"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </motion.button>
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    className='flex flex-col items-center relative z-10 text-red-500'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <p className='text-center text-sm'>{error}</p>
                  </motion.div>
                ) : (
                  <motion.p 
                    key="placeholder"
                    className='text-gray-500 relative z-10'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Processed image will appear here
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.button
          onClick={handleRemoveBackground}
          disabled={!selectedImage || loading}
          className='mt-8 bg-gradient-to-r from-secondary-600 to-secondary-500 text-white px-8 py-3 rounded-full font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <>
              <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              Removing Background...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Remove Background
            </>
          )}
        </motion.button>

        {/* Feature Description */}
        <motion.div 
          className='mt-12 max-w-3xl text-center'
          variants={itemVariants}
        >
          <h3 className='text-xl font-semibold mb-4 text-dark-800'>What to Expect</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-white p-6 rounded-lg shadow-sm'>
              <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className='font-semibold mb-2'>Precision Removal</h4>
              <p className='text-sm text-gray-600'>AI-powered edge detection for clean background removal</p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-sm'>
              <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className='font-semibold mb-2'>High Quality</h4>
              <p className='text-sm text-gray-600'>Maintain image quality with transparent PNG output</p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-sm'>
              <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className='font-semibold mb-2'>Instant Results</h4>
              <p className='text-sm text-gray-600'>Get professional results in seconds</p>
            </div>
          </div>
        </motion.div>
        
        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        
        {/* Hidden download link */}
        <a ref={downloadLinkRef} style={{ display: 'none' }} />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default BackgroundRemover
