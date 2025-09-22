import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { fadeInUp } from '../utils/animations'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Description = () => {
    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState(0)
    
    const onClickHandler = () => {
        if (user) {
            navigate('/text-to-image')
            scrollTo(0,0)
        } else {
            scrollTo(0,0)
            setShowLogin(true)
        }
    }

    const features = [
        {
            title: 'AI Image Generation',
            description: 'Transform text into stunning visuals with our advanced AI models',
            stats: '1M+ images created',
            icon: '🎨',
            color: 'from-primary-500 to-primary-600'
        },
        {
            title: 'Smart Enhancement',
            description: 'Upscale and enhance images while preserving natural details',
            stats: '500K+ enhanced',
            icon: '✨',
            color: 'from-secondary-500 to-secondary-600'
        },
        {
            title: 'Background Magic',
            description: 'Remove or replace backgrounds with pixel-perfect precision',
            stats: '300K+ processed',
            icon: '🪄',
            color: 'from-primary-400 to-secondary-500'
        }
    ]
    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-primary-50/30"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-6 py-2 rounded-full border border-primary-200 mb-6"
                        variants={fadeInUp}
                    >
                        <span className="text-2xl">🚀</span>
                        <span className="text-primary-700 font-medium">Powered by Advanced AI</span>
                    </motion.div>
                    
                    <motion.h2 
                        className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary-900 to-gray-900 bg-clip-text text-transparent"
                        variants={fadeInUp}
                    >
                        Meet PixelScribe
                    </motion.h2>
                    
                    <motion.p 
                        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                        variants={fadeInUp}
                    >
                        The ultimate AI creative platform that transforms your ideas into stunning visuals. 
                        Professional-grade tools powered by cutting-edge artificial intelligence.
                    </motion.p>
                </motion.div>

                {/* Main Content */}
                <motion.div 
                    className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center mb-20"
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
                    {/* Interactive Image Showcase */}
                    <motion.div
                        className="relative"
                        variants={fadeInUp}
                    >
                        <div className="relative group">
                            {/* Main Image */}
                            <motion.div
                                className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-50 p-4"
                                whileHover={{ 
                                    scale: 1.02,
                                    rotateY: 5,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <img 
                                    src={assets.sample_img_1} 
                                    className="w-full h-auto object-cover rounded-2xl" 
                                    alt="AI generated showcase" 
                                />
                                
                                {/* Readable badges placed inside the image with high contrast */}
                                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full font-semibold text-xs sm:text-sm shadow-lg drop-shadow-md border border-white/10">
                                    ✨ AI Generated
                                </div>
                                
                                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full font-semibold text-xs sm:text-sm shadow-lg drop-shadow-md border border-white/10">
                                    🎨 High Quality
                                </div>
                            </motion.div>
                            
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl -z-10 group-hover:blur-2xl transition-all duration-300"></div>
                        </div>
                    </motion.div>

                    {/* Content Panel */}
                    <motion.div
                        className="space-y-8"
                        variants={fadeInUp}
                    >
                        <div>
                            <h3 className="text-4xl font-bold mb-6 text-gray-900">
                                Revolutionary AI Creative Platform
                            </h3>
                            
                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                PixelScribe combines multiple AI technologies into one powerful platform. 
                                Create, enhance, and transform images with professional-grade tools that 
                                understand your creative vision.
                            </p>
                        </div>

                        {/* Feature Tabs */}
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                                        activeTab === index 
                                            ? 'border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg' 
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                    }`}
                                    onClick={() => setActiveTab(index)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl shadow-lg`}>
                                            {feature.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg text-gray-900 mb-1">{feature.title}</h4>
                                            <p className="text-gray-600 mb-2">{feature.description}</p>
                                            <div className="text-sm font-semibold text-purple-600">{feature.stats}</div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                                            activeTab === index 
                                                ? 'border-purple-500 bg-purple-500' 
                                                : 'border-gray-300'
                                        }`}>
                                            {activeTab === index && (
                                                <motion.div 
                                                    className="w-full h-full rounded-full bg-white scale-50"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 0.5 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        {/* CTA Button */}
                        <motion.a
                            href="/#features"
                            className="group w-full sm:w-auto bg-gradient-to-r from-primary-500 to-primary-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Explore AI Tools</span>
                            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
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
                    {[
                        { number: '1M+', label: 'Images Created', color: 'from-primary-500 to-primary-600' },
                        { number: '50K+', label: 'Happy Users', color: 'from-primary-600 to-secondary-600' },
                        { number: '99.9%', label: 'Uptime', color: 'from-secondary-500 to-secondary-600' },
                        { number: '24/7', label: 'Support', color: 'from-secondary-600 to-primary-500' }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                            variants={fadeInUp}
                            whileHover={{ y: -5 }}
                        >
                            <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                                {stat.number}
                            </div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Description