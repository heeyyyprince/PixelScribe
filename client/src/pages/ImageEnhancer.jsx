import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const ImageEnhancer = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [statusText, setStatusText] = useState('')
  const [elapsedSec, setElapsedSec] = useState(0)
  const [abortCtrl, setAbortCtrl] = useState(null)
  const [enhancedImage, setEnhancedImage] = useState(null)

  const { user, setUser, token, setShowLogin, backendUrl } = useContext(AppContext)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
        setEnhancedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEnhance = async () => {
    if (!selectedImage) {
      toast.error('Please select an image first')
      return
    }

    if (!token) {
      setShowLogin(true)
      return
    }
    
    setLoading(true)
    setUploadProgress(0)
    setStatusText('Uploading image...')
    setElapsedSec(0)

    const controller = new AbortController()
    setAbortCtrl(controller)

    let timer
    
    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      
      const enhanceResponse = await axios.post(`${backendUrl}/api/enhance/enhance-image`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        timeout: 90000,
        signal: controller.signal,
        onUploadProgress: (e) => {
          if (e.total) {
            const p = Math.round((e.loaded * 100) / e.total)
            setUploadProgress(p)
          }
        }
      })
      // After upload is complete, show processing state while awaiting response
      setStatusText('Processing with AI...')
      timer = setInterval(() => setElapsedSec(prev => prev + 1), 1000)
      
      if (enhanceResponse.data.success) {
        setEnhancedImage(enhanceResponse.data.enhancedImage)
        setUser({ ...user, creditBalance: enhanceResponse.data.creditBalance })
        toast.success(enhanceResponse.data.message)
      } else {
        toast.error(enhanceResponse.data.message)
      }
    } catch (error) {
      console.error('Enhancement error:', error)
      if (axios.isCancel?.(error) || error.name === 'CanceledError' || error.name === 'AbortError') {
        toast.info('Enhancement cancelled')
      } else if (error.code === 'ECONNABORTED') {
        toast.error('Request timed out. Please try again or use a smaller image.')
      } else {
        toast.error(error.response?.data?.message || 'Failed to enhance image')
      }
    } finally {
      setLoading(false)
      setStatusText('')
      setUploadProgress(0)
      setAbortCtrl(null)
      if (timer) clearInterval(timer)
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
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 pt-20'>
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
          AI Image Enhancer
        </motion.h1>
        
        <motion.p 
          className='text-gray-600 max-w-2xl text-center mb-12 text-lg'
          variants={itemVariants}
        >
          Enhance and upscale your images with AI-powered quality improvement and detail enhancement.
        </motion.p>

      <motion.div 
        className='w-full max-w-4xl flex flex-col items-center'
        variants={itemVariants}
      >
        {/* Upload Area */}
        <motion.div 
          className='w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border-2 border-dashed border-primary-300 text-center mb-8 hover:border-primary-500 transition-colors'
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-lg font-medium text-primary-700 mb-2">Upload Image to Enhance</p>
              <p className="text-sm text-primary-500">Drag & drop or click to select</p>
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
            <h3 className='text-lg font-semibold mb-4 text-center text-dark-800'>Enhanced</h3>
            <div className='aspect-square bg-gray-100 rounded-lg flex items-center justify-center'>
              {loading ? (
                <div className='flex flex-col items-center w-full px-6'>
                  {/* Upload progress bar */}
                  {uploadProgress > 0 && uploadProgress < 100 ? (
                    <>
                      <p className='text-sm text-gray-600 mb-2'>{statusText}</p>
                      <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
                        <div className='bg-primary-500 h-2 rounded-full transition-all' style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                      <p className='text-xs text-gray-500 mt-2'>{uploadProgress}%</p>
                    </>
                  ) : (
                    <>
                      <div className='w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-3'></div>
                      <p className='text-gray-600 mb-1'>{statusText || 'Enhancing...'}</p>
                      <p className='text-xs text-gray-500'>Elapsed: {elapsedSec}s</p>
                    </>
                  )}
                  <button
                    onClick={() => abortCtrl?.abort()}
                    className='mt-4 text-sm text-primary-700 hover:text-primary-800 underline'
                  >
                    Cancel
                  </button>
                </div>
              ) : enhancedImage ? (
                <img src={enhancedImage} alt="Enhanced" className="max-w-full max-h-full object-contain rounded-lg" />
              ) : (
                <p className='text-gray-500'>Enhanced image will appear here</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.button
          onClick={handleEnhance}
          disabled={!selectedImage || loading}
          className='mt-8 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-300'
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <>
              <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              Enhancing...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Enhance Image
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h4 className='font-semibold mb-2'>AI Upscaling</h4>
              <p className='text-sm text-gray-600'>Increase image resolution up to 4x without quality loss</p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-sm'>
              <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className='font-semibold mb-2'>Detail Enhancement</h4>
              <p className='text-sm text-gray-600'>Sharpen details and improve image clarity</p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-sm'>
              <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className='font-semibold mb-2'>Fast Processing</h4>
              <p className='text-sm text-gray-600'>Get enhanced images in seconds</p>
            </div>
          </div>
        </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ImageEnhancer
