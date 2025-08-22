import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setShowLogin(true)
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
        <section className='relative py-20 overflow-hidden mt-8 md:mt-12' id='hero'>
            {/* Background decorative elements */}
            <div className='absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow'></div>
            <div className='absolute bottom-20 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow'></div>
            
            <motion.div
                className='flex flex-col justify-center items-center text-center relative z-10'
                variants={containerVariants}
                initial='hidden'
                animate='visible'
                viewport={{ once: true }}
            >
                <motion.div
                    className='inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full border border-primary-200 shadow-sm relative z-20'
                    variants={itemVariants}
                >
                    <p className='text-dark-600 font-medium'>Premium Text to Image Generator</p>
                    <img src={assets.star_icon} alt="Star" className='w-5 h-5 animate-float' />
                </motion.div>

                <motion.h1
                    className='text-center mx-auto mt-8 text-4xl sm:text-6xl md:text-7xl font-bold max-w-4xl leading-tight'
                    variants={itemVariants}
                >
                    Transform <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500'>Words</span> into <span className='text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-primary-500'>Visual Magic</span>
                </motion.h1>

                <motion.p
                    className='text-center max-w-2xl mx-auto mt-6 text-lg text-dark-600'
                    variants={itemVariants}
                >
                    PixelScribe uses advanced AI to turn your text descriptions into stunning visuals in seconds. Unleash your creativity without design skills.
                </motion.p>

                <motion.div className='flex flex-col sm:flex-row gap-4 mt-10' variants={itemVariants}>
                    <motion.button
                        className='px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-full shadow-lg flex items-center justify-center gap-2 group'
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClickHandler}
                    >
                        <span>Start Creating</span>
                        <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                        </svg>
                    </motion.button>
                    
                    <motion.a
                        href='/#how-it-works'
                        className='px-8 py-3 bg-white text-dark-800 font-medium rounded-full border border-dark-200 shadow-sm hover:bg-dark-50 transition-colors'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        How It Works
                    </motion.a>
                </motion.div>

                <motion.div
                    className='mt-16 relative'
                    variants={itemVariants}
                >
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent to-white/80 z-10 pointer-events-none'></div>
                    <motion.div 
                        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-dark-100 shadow-lg'
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}
                    >
                        {Array(6).fill('').map((_, index) => (
                            <motion.div 
                                key={index} 
                                className='relative group overflow-hidden rounded-lg shadow-md'
                                variants={imageVariants}
                                whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.2 } }}
                            >
                                <img 
                                    className='w-full h-auto object-cover aspect-square'
                                    src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
                                    alt={`Sample generated image ${index + 1}`}
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-dark-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-2'>
                                    <p className='text-white text-xs'>Prompt #{index + 1}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.p
                    className='mt-4 text-dark-500 text-sm'
                    variants={itemVariants}
                >
                    Images generated with PixelScribe AI
                </motion.p>
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