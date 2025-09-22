import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Uncrop = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [processedImage, setProcessedImage] = useState(null)
  const [extend, setExtend] = useState({ left: 0, right: 128, up: 0, down: 128 })

  const { user, setUser, token, setShowLogin, backendUrl } = useContext(AppContext)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
        setProcessedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUncrop = async () => {
    if (!selectedFile) {
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
      if (extend.left > 0) formData.append('extendLeft', extend.left)
      if (extend.right > 0) formData.append('extendRight', extend.right)
      if (extend.up > 0) formData.append('extendUp', extend.up)
      if (extend.down > 0) formData.append('extendDown', extend.down)

      const response = await axios.post(`${backendUrl}/api/enhance/uncrop`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
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
      toast.error(error.response?.data?.message || 'Failed to uncrop image')
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } } }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 pt-20'>
      <motion.div className='container mx-auto px-4 sm:px-10 md:px-14 lg:px-28 py-16 min-h-screen flex flex-col items-center justify-center' initial="hidden" animate="visible" variants={containerVariants}>
        <motion.h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center' variants={itemVariants}>AI Uncrop</motion.h1>
        <motion.p className='text-gray-600 max-w-2xl text-center mb-12 text-lg' variants={itemVariants}>Extend your image canvas. AI generates seamless content to expand borders.</motion.p>

        <motion.div className='w-full max-w-4xl flex flex-col items-center' variants={itemVariants}>
          <motion.div className='w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border-2 border-dashed border-primary-300 text-center mb-6' variants={itemVariants}>
            <input type='file' accept='image/*' onChange={handleImageUpload} className='hidden' id='image-upload' />
            <label htmlFor='image-upload' className='cursor-pointer'>
              <div className='flex flex-col items-center'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-16 w-16 text-primary-500 mb-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
                </svg>
                <p className='text-lg font-medium text-primary-700 mb-2'>Upload Image</p>
                <p className='text-sm text-primary-500'>Drag & drop or click to select</p>
              </div>
            </label>
          </motion.div>

          <motion.div className='grid grid-cols-2 gap-4 w-full max-w-2xl' variants={itemVariants}>
            {['left','right','up','down'].map((dir) => (
              <div key={dir} className='flex items-center gap-2 bg-white p-4 rounded-xl shadow-sm border'>
                <label className='w-24 capitalize text-gray-700'>{dir}</label>
                <input type='number' min={0} max={512} value={extend[dir]} onChange={(e)=>setExtend(prev=>({...prev,[dir]: Number(e.target.value)}))} className='w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300' />
              </div>
            ))}
          </motion.div>

          <motion.div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-6' variants={itemVariants}>
            <div className='bg-white p-6 rounded-xl shadow-lg'>
              <h3 className='text-lg font-semibold mb-4 text-center text-gray-800'>Original</h3>
              <div className='aspect-square bg-gray-100 rounded-lg flex items-center justify-center'>
                {selectedImage ? <img src={selectedImage} alt='Original' className='max-w-full max-h-full object-contain rounded-lg' /> : <p className='text-gray-500'>No image selected</p>}
              </div>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-lg'>
              <h3 className='text-lg font-semibold mb-4 text-center text-gray-800'>Uncropped</h3>
              <div className='aspect-square bg-gray-100 rounded-lg flex items-center justify-center'>
                {loading ? (<div className='flex flex-col items-center'><div className='w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4'></div><p className='text-gray-600'>Uncropping...</p></div>) : processedImage ? (<img src={processedImage} alt='Processed' className='max-w-full max-h-full object-contain rounded-lg' />) : (<p className='text-gray-500'>Processed image will appear here</p>)}
              </div>
            </div>
          </motion.div>

          <motion.button onClick={handleUncrop} disabled={!selectedFile || loading} className='mt-8 bg-gradient-to-r from-primary-600 to-secondary-500 text-white px-8 py-3 rounded-full font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2' variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            {loading ? (<><div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>Uncropping...</>) : (<>Uncrop</>)}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Uncrop
