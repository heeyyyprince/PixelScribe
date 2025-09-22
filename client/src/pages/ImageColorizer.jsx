import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const ImageColorizer = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [colorizedImage, setColorizedImage] = useState(null)

  const { user, setUser, token, setShowLogin, backendUrl } = useContext(AppContext)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
        setColorizedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleColorize = async () => {
    if (!selectedImage) {
      toast.error('Please select an image first')
      return
    }

    if (!token) {
      setShowLogin(true)
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const response = await axios.post(`${backendUrl}/api/enhance/colorize-image`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response.data.success) {
        setColorizedImage(response.data.colorizedImage)
        setUser({ ...user, creditBalance: response.data.creditBalance })
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Colorization error:', error)
      toast.error(error.response?.data?.message || 'Failed to colorize image')
    } finally {
      setLoading(false)
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
          AI Image Colorizer
        </motion.h1>
        
        <motion.p 
          className='text-gray-600 max-w-2xl text-center mb-12 text-lg'
          variants={itemVariants}
        >
          Transform black and white photos into vibrant, realistic colored images using advanced AI technology.
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
                <p className="text-lg font-medium text-primary-700 mb-2">Upload Black & White Image</p>
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
              <h3 className='text-lg font-semibold mb-4 text-center text-gray-800'>Original</h3>
              <div className='aspect-square bg-gray-100 rounded-lg flex items-center justify-center'>
                {selectedImage ? (
                  <img src={selectedImage} alt="Original" className="max-w-full max-h-full object-contain rounded-lg" />
                ) : (
                  <p className='text-gray-500'>No image selected</p>
                )}
              </div>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-lg'>
              <h3 className='text-lg font-semibold mb-4 text-center text-gray-800'>Colorized</h3>
              <div className='aspect-square bg-gray-100 rounded-lg flex items-center justify-center'>
                {loading ? (
                  <div className='flex flex-col items-center'>
                    <div className='w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4'></div>
                    <p className='text-gray-600'>Adding colors...</p>
                  </div>
                ) : colorizedImage ? (
                  <img src={colorizedImage} alt="Colorized" className="max-w-full max-h-full object-contain rounded-lg" />
                ) : (
                  <p className='text-gray-500'>Colorized image will appear here</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.button
            onClick={handleColorize}
            disabled={!selectedImage || loading}
            className='mt-8 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-3 rounded-full font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                Colorizing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Colorize Image
              </>
            )}
          </motion.button>

          {/* Feature Description */}
          <motion.div 
            className='mt-12 max-w-3xl text-center'
            variants={itemVariants}
          >
            <h3 className='text-xl font-semibold mb-4 text-gray-800'>What to Expect</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='bg-white p-6 rounded-lg shadow-sm'>
                <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h4 className='font-semibold mb-2'>Realistic Colors</h4>
                <p className='text-sm text-gray-600'>AI analyzes context to apply natural, realistic colors</p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-sm'>
                <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className='font-semibold mb-2'>Detail Preservation</h4>
                <p className='text-sm text-gray-600'>Maintain original image details while adding colors</p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-sm'>
                <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className='font-semibold mb-2'>Quick Processing</h4>
                <p className='text-sm text-gray-600'>Get colorized images in seconds</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ImageColorizer
