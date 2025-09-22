import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()

    const onClickHandler = () => {
        // Navigate to features section to let user choose their tool
        const featuresSection = document.getElementById('features')
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // Animation variants for staggered animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    }

    const imageVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
    }

    return (
        <section className='relative min-h-screen flex items-center justify-center overflow-hidden' id='hero'>
            {/* Advanced Background */}
            <div className='absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30'></div>
            
            {/* Animated Background Elements */}
            <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse-slow'></div>
            <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse-slow'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-200/10 to-purple-200/10 rounded-full blur-3xl animate-spin-slow'></div>
            
            {/* Floating Elements */}
            <div className='absolute top-20 left-20 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-float opacity-60'></div>
            <div className='absolute top-40 right-32 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full animate-bounce-slow opacity-40'></div>
            <div className='absolute bottom-32 left-32 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full animate-ping-slow opacity-50'></div>
            
            <motion.div
                className='flex flex-col justify-center items-center text-center relative z-10 px-4 max-w-7xl mx-auto'
                variants={containerVariants}
                initial='hidden'
                animate='visible'
                viewport={{ once: true }}
            >
                {/* Hero Badge */}
                <motion.div
                    className='inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 shadow-lg mb-6'
                    variants={itemVariants}
                >
                    <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                        <span className='text-gray-700 font-medium text-sm'>AI-Powered Creative Suite</span>
                    </div>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    className='text-4xl sm:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight mb-6 text-gray-800'
                    variants={itemVariants}
                >
                    <span className='block'>Transform Your</span>
                    <span className='block bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600 bg-clip-text text-transparent'>
                        Ideas
                    </span>
                    <span className='block'>into Visual Magic</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className='text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed'
                    variants={itemVariants}
                >
                    Experience the future of creativity with our comprehensive AI toolkit. 
                    Generate stunning images, enhance photos, remove backgrounds, and apply artistic styles - all in one platform.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div className='flex flex-col sm:flex-row gap-6 mb-16' variants={itemVariants}>
                    <motion.button
                        className='group relative px-10 py-5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-2xl shadow-xl overflow-hidden'
                        whileHover={{ 
                            scale: 1.05, 
                            boxShadow: '0 20px 40px -12px rgba(255, 51, 102, 0.4)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClickHandler}
                    >
                        <div className='absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        <span className='relative flex items-center gap-3'>
                            <span>Explore AI Tools</span>
                            <svg className='w-6 h-6 group-hover:translate-x-2 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                            </svg>
                        </span>
                    </motion.button>
                    
                    <motion.a
                        href='/#how-it-works'
                        className='group px-10 py-5 bg-white/90 backdrop-blur-xl text-gray-800 font-bold text-lg rounded-2xl border-2 border-gray-200 shadow-xl hover:bg-white hover:border-primary-300 transition-all duration-300'
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className='flex items-center gap-3'>
                            <span>How It Works</span>
                            <svg className='w-6 h-6 group-hover:rotate-90 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                            </svg>
                        </span>
                    </motion.a>
                </motion.div>

                {/* Feature Showcase Grid */}
                <motion.div
                    className='relative max-w-6xl mx-auto'
                    variants={itemVariants}
                >
                    {/* Background Glow */}
                    <div className='absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl blur-3xl'></div>
                    
                    <motion.div 
                        className='relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-8 bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl'
                        initial={{ y: 100, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.8, type: 'spring', stiffness: 100 }}
                    >
                        {Array(6).fill('').map((_, index) => (
                            <motion.div 
                                key={index} 
                                className='group relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm border border-white/40'
                                variants={imageVariants}
                                whileHover={{ 
                                    y: -10, 
                                    scale: 1.1, 
                                    rotateY: 5,
                                    transition: { duration: 0.3 } 
                                }}
                            >
                                <img 
                                    className='w-full h-auto object-cover aspect-square'
                                    src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
                                    alt={`AI generated sample ${index + 1}`}
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4'>
                                    <div className='text-center'>
                                        <p className='text-white font-bold text-sm mb-1'>AI Generated</p>
                                        <div className='w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full'></div>
                                    </div>
                                </div>
                                
                                {/* Floating Badge */}
                                <div className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                    <svg className='w-3 h-3 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                                    </svg>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Bottom Stats */}
                <motion.div
                    className='mt-12 flex flex-wrap justify-center gap-8 text-center'
                    variants={itemVariants}
                >
                    <div className='flex flex-col items-center'>
                        <div className='text-3xl font-black bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent'>1M+</div>
                        <div className='text-gray-600 font-medium'>Images Generated</div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='text-3xl font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent'>50K+</div>
                        <div className='text-gray-600 font-medium'>Happy Creators</div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='text-3xl font-black bg-gradient-to-r from-secondary-600 to-primary-500 bg-clip-text text-transparent'>99.9%</div>
                        <div className='text-gray-600 font-medium'>Uptime</div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Header
// const Header = () => {
//     return (
//         <div className='text-center'>

//             <div className='text-stone-500 mt-14 inline-flex items-center gap-2 bg-white px-5 py-1 rounded-full border border-neutral-500'>
//                 <p>Best text to image generator</p>
//                 <img src={assets.star_icon} alt="" />
//             </div>


//             <h1 className='text-center mx-auto mt-10 text-4xl max-w-[300px] sm:text-6xl sm:max-w-[490px]'>
//                 Turn text to <span className='text-blue-600'>image</span>, in seconds.
//             </h1>

//             <p className='text-center max-w-xl mx-auto mt-5'>Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen.</p>

//             <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2 rounded-full hover:scale-[1.01] transition-all'>
//                 Generate Images
//             </button>

//             <div className='flex flex-wrap justify-center mt-16 gap-3'>
//                 {Array(6).fill('').map((item, index) => (
//                     <img className='rounded hover:scale-105 transition-all duration-300 cursor-pointer' width={70} key={index} src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1} />
//                 ))}
//             </div>
//             <p className='mt-2 text-neutral-600'>Generated images from imagify</p>
//         </div>
//     )
// }

// export default Header