import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { fadeInUp } from '../utils/animations'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Description = () => {
    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()
    
    const onClickHandler = () => {
        if (user) {
            navigate('/result')
            scrollTo(0,0)
        } else {
            scrollTo(0,0)
            setShowLogin(true)
        }
    }
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    <motion.h2 
                        className="text-3xl sm:text-4xl font-semibold mb-4 text-dark-800"
                        variants={fadeInUp}
                    >
                        Create AI Images
                    </motion.h2>
                    <motion.p 
                        className="text-lg text-dark-500 max-w-2xl mx-auto"
                        variants={fadeInUp}
                    >
                        Turn your imagination into stunning visuals
                    </motion.p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    <motion.div
                        className="rounded-xl overflow-hidden shadow-xl"
                        variants={fadeInUp}
                        whileHover={{ 
                            scale: 1.03,
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            transition: { duration: 0.3 }
                        }}
                    >
                        <img 
                            src={assets.sample_img_1} 
                            className="w-full h-auto object-cover" 
                            alt="AI generated image sample" 
                        />
                    </motion.div>

                    <motion.div
                        className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                        variants={fadeInUp}
                    >
                        <h3 className="text-2xl font-semibold mb-6 text-dark-800">Introducing the AI-Powered Text to Image Generator</h3>
                        
                        <div className="space-y-4 text-dark-600">
                            <p>
                                Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.
                            </p>
                            <p>
                                Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don't yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!
                            </p>
                        </div>
                        
                        <motion.button
                            className="mt-8 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-3 rounded-full font-medium shadow-md inline-flex items-center"
                            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.4)' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onClickHandler}
                        >
                            Try It Now
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default Description