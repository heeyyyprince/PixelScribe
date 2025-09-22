import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const StyleTransfer = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [loading, setLoading] = useState(false)
  const [styledImage, setStyledImage] = useState(null)

  const { user, setUser, token, setShowLogin, backendUrl } = useContext(AppContext)

  const styles = [
    { id: 'van-gogh', name: 'Van Gogh', preview: '/api/placeholder/100/100' },
    { id: 'picasso', name: 'Picasso', preview: '/api/placeholder/100/100' },
    { id: 'monet', name: 'Monet', preview: '/api/placeholder/100/100' },
    { id: 'abstract', name: 'Abstract', preview: '/api/placeholder/100/100' },
    { id: 'watercolor', name: 'Watercolor', preview: '/api/placeholder/100/100' },
    { id: 'oil-painting', name: 'Oil Painting', preview: '/api/placeholder/100/100' }
  ]

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
        setStyledImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleStyleTransfer = async () => {
    if (!selectedImage) {
      toast.error('Please select an image first')
      return
    }

    if (!selectedStyle) {
      toast.error('Please select a style first')
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
      formData.append('styleId', selectedStyle)
      
      const response = await axios.post(`${backendUrl}/api/enhance/style-transfer`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response.data.success) {
        setStyledImage(response.data.styledImage)
        setUser({ ...user, creditBalance: response.data.creditBalance })
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Style transfer error:', error)
      toast.error(error.response?.data?.message || 'Failed to apply style transfer')
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
          AI Style Transfer
        </motion.h1>
        
        <motion.p 
          className='text-gray-600 max-w-2xl text-center mb-12 text-lg'
          variants={itemVariants}
        >
          Apply artistic styles to your images and transform them with various creative filters and effects.
        </motion.p>

      <motion.div 
        className='w-full max-w-6xl flex flex-col items-center'
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
              <p className="text-lg font-medium text-primary-700 mb-2">Upload Image for Style Transfer</p>
              <p className="text-sm text-primary-500">Drag & drop or click to select</p>
            </div>
          </label>
        </motion.div>

        {/* Style Selection */}
        <motion.div 
          className='w-full max-w-4xl mb-8'
          variants={itemVariants}
        >
          <h3 className='text-lg font-semibold mb-4 text-center text-dark-800'>Choose Art Style</h3>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {styles.map((style) => (
              <motion.div
                key={style.id}
                className={`bg-white p-4 rounded-lg shadow-sm border-2 cursor-pointer transition-all ${
                  selectedStyle === style.id ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200 hover:border-primary-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedStyle(style.id)}
              >
                <div className='w-full aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-2 flex items-center justify-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <p className='text-sm font-medium text-center text-primary-700'>{style.name}</p>
              </motion.div>
            ))}
          </div>
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
            <h3 className='text-lg font-semibold mb-4 text-center text-dark-800'>Styled Image</h3>
            <div className='aspect-square bg-gray-100 rounded-lg flex items-center justify-center'>
              {loading ? (
                <div className='flex flex-col items-center'>
                  <div className='w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4'></div>
                  <p className='text-gray-600'>Applying style...</p>
                </div>
              ) : styledImage ? (
                <img src={styledImage} alt="Styled" className="max-w-full max-h-full object-contain rounded-lg" />
              ) : (
                <p className='text-gray-500'>Styled image will appear here</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.button
          onClick={handleStyleTransfer}
          disabled={!selectedImage || !selectedStyle || loading}
          className='mt-8 bg-gradient-to-r from-primary-600 to-secondary-500 text-white px-8 py-3 rounded-full font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <>
              <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              Applying Style...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Apply Style
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h4 className='font-semibold mb-2'>Artistic Styles</h4>
              <p className='text-sm text-gray-600'>Choose from famous art styles and painting techniques</p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-sm'>
              <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className='font-semibold mb-2'>Neural Networks</h4>
              <p className='text-sm text-gray-600'>Advanced AI models for realistic style transfer</p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-sm'>
              <div className='w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h4 className='font-semibold mb-2'>High Resolution</h4>
              <p className='text-sm text-gray-600'>Maintain image quality while applying artistic effects</p>
            </div>
          </div>
        </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default StyleTransfer
