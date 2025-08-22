import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'

const Result = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [image, setImage] = useState(assets.sample_img_1)
  const [promptHistory, setPromptHistory] = useState([])

  const { generateImage } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    
    if (!input.trim()) return
    
    setLoading(true)
    // Add to prompt history
    setPromptHistory(prev => [...prev, input])

    try {
      const image = await generateImage(input)
      if (image) {
        setIsImageLoaded(true)
        setImage(image)
      }
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setLoading(false)
    }
  }

  // Animation variants
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

  const imageVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } }
  }

  return (
    <motion.div 
      className='container mx-auto px-4 py-12 min-h-[90vh] flex flex-col items-center justify-center'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className='text-3xl md:text-4xl font-bold text-dark-800 mb-6 text-center'
        variants={itemVariants}
      >
        Transform Your Ideas Into Images
      </motion.h1>
      
      <motion.p 
        className='text-dark-500 max-w-2xl text-center mb-12'
        variants={itemVariants}
      >
        Describe what you want to see, and our AI will bring it to life in seconds.
      </motion.p>

      <motion.div 
        className='w-full max-w-3xl flex flex-col items-center'
        variants={itemVariants}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={`image-${isImageLoaded}`}
            className='relative w-full max-w-xl bg-white p-4 rounded-xl shadow-lg mb-8'
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className='relative aspect-video bg-dark-50 rounded-lg overflow-hidden flex items-center justify-center'>
              {loading ? (
                <div className='absolute inset-0 flex flex-col items-center justify-center bg-dark-900/10 backdrop-blur-sm'>
                  <div className='w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4'></div>
                  <p className='text-dark-600 font-medium'>Creating your masterpiece...</p>
                </div>
              ) : null}
              
              <img 
                className='w-full h-full object-contain' 
                src={image} 
                alt="Generated image" 
                onLoad={() => loading ? null : setIsImageLoaded(true)}
              />
              
              {/* Progress bar */}
              <motion.div 
                className='absolute bottom-0 left-0 h-1 bg-primary-500'
                initial={{ width: 0 }}
                animate={{ width: loading ? '100%' : 0 }}
                transition={{ duration: loading ? 10 : 0.3 }}
              />
            </div>
            
            {isImageLoaded && (
              <motion.div 
                className='absolute -bottom-5 right-4 flex gap-2'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  onClick={() => setIsImageLoaded(false)}
                  className='bg-white text-dark-700 px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg border border-dark-100 flex items-center gap-2'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  New Image
                </motion.button>
                
                <motion.a
                  href={image}
                  download
                  className='bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg flex items-center gap-2'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </motion.a>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.form 
          onSubmit={onSubmitHandler} 
          className='w-full max-w-2xl'
          variants={itemVariants}
        >
          <div className='relative'>
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder='Describe what you want to generate...'
              className='w-full px-6 py-4 pr-36 bg-white border border-dark-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-dark-800 placeholder-dark-400'
              disabled={loading}
            />
            <motion.button 
              type='submit'
              className='absolute right-2 top-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading || !input.trim()}
            >
              {loading ? 'Creating...' : 'Generate'}
              {!loading && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
            </motion.button>
          </div>
        </motion.form>
        
        {/* Prompt suggestions */}
        {!isImageLoaded && promptHistory.length === 0 && (
          <motion.div 
            className='mt-8 w-full max-w-2xl'
            variants={itemVariants}
          >
            <p className='text-dark-500 text-sm mb-3'>Try these examples:</p>
            <div className='flex flex-wrap gap-2'>
              {[
                "A futuristic city with flying cars",
                "Sunset over a tropical beach",
                "A magical forest with glowing plants",
                "An astronaut riding a horse on Mars"
              ].map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => setInput(suggestion)}
                  className='bg-dark-50 hover:bg-dark-100 text-dark-700 px-3 py-1.5 rounded-full text-sm'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Prompt history */}
        {promptHistory.length > 0 && !isImageLoaded && (
          <motion.div 
            className='mt-8 w-full max-w-2xl'
            variants={itemVariants}
          >
            <p className='text-dark-500 text-sm mb-3'>Recent prompts:</p>
            <div className='flex flex-wrap gap-2'>
              {promptHistory.slice(-4).map((prompt, index) => (
                <motion.button
                  key={index}
                  onClick={() => setInput(prompt)}
                  className='bg-dark-50 hover:bg-dark-100 text-dark-700 px-3 py-1.5 rounded-full text-sm'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {prompt.length > 30 ? prompt.substring(0, 27) + '...' : prompt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Result