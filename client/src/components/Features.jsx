import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp } from '../utils/animations'
import { useNavigate } from 'react-router-dom'

const Features = () => {
  const navigate = useNavigate()
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const features = [
    {
      id: 1,
      title: 'Text to Image',
      description: 'Transform your text descriptions into stunning, unique visuals using advanced AI algorithms in seconds.',
      detailedDescription: 'Create breathtaking artwork from simple text prompts. Our advanced AI understands context, style, and artistic nuances to generate professional-quality images.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      route: '/text-to-image',
      available: true,
      category: 'generation',
      gradient: 'from-primary-500 to-primary-600',
      bgGradient: 'from-primary-50 to-primary-100',
      features: ['AI-Powered Generation', 'Multiple Art Styles', 'High Resolution', 'Instant Results'],
      popularity: 95
    },
    {
      id: 2,
      title: 'Image Upscaling',
      description: 'Enhance and upscale your images with AI-powered quality improvement and detail enhancement.',
      detailedDescription: 'Boost image quality with our AI enhancement technology. Upscale, sharpen, and restore details while maintaining natural appearance.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      route: '/image-enhancer',
      available: true,
      category: 'enhancement',
      gradient: 'from-secondary-500 to-secondary-600',
      bgGradient: 'from-secondary-50 to-secondary-100',
      features: ['4K Upscaling', 'Detail Enhancement', 'Noise Reduction', 'Smart Sharpening'],
      popularity: 88
    },
    {
      id: 3,
      title: 'Remove Background',
      description: 'Remove backgrounds from images instantly with precision AI technology for professional results.',
      detailedDescription: 'Perfect background removal with edge detection AI. Create transparent PNGs or replace backgrounds with custom scenes.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      route: '/background-remover',
      available: true,
      category: 'editing',
      gradient: 'from-primary-400 to-secondary-500',
      bgGradient: 'from-primary-50 to-secondary-50',
      features: ['Precision Cutting', 'Hair Detail Preservation', 'Batch Processing', 'Custom Backgrounds'],
      popularity: 92
    },
    {
      id: 4,
      title: 'Replace Background',
      description: 'Replace image backgrounds with AI-generated scenes using text prompts for creative compositions.',
      detailedDescription: 'Replace any background with AI-generated scenes. Simply describe the new background and watch as AI seamlessly integrates it with your subject.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      route: '/replace-background',
      available: true,
      category: 'editing',
      gradient: 'from-secondary-400 to-primary-500',
      bgGradient: 'from-secondary-50 to-primary-50',
      features: ['Text-to-Background', 'Seamless Integration', 'Natural Lighting', 'Custom Scenes'],
      popularity: 85
    },
    {
      id: 5,
      title: 'Reimagine',
      description: 'Create multiple creative variations of your images while preserving the core composition and style.',
      detailedDescription: 'Generate creative variations of your images. AI reimagines your photo with different styles, colors, and artistic interpretations.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      route: '/reimagine',
      available: true,
      category: 'enhancement',
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      features: ['Creative Variations', 'Style Preservation', 'Multiple Options', 'Artistic Interpretations'],
      popularity: 78
    },
    {
      id: 6,
      title: 'Uncrop Image',
      description: 'Extend your images beyond their borders with AI-generated content that matches the original style.',
      detailedDescription: 'Expand your images in any direction. AI generates seamless extensions that perfectly match the original content and style.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      ),
      route: '/uncrop',
      available: true,
      category: 'enhancement',
      gradient: 'from-indigo-500 to-indigo-600',
      bgGradient: 'from-indigo-50 to-indigo-100',
      features: ['Smart Extension', 'Style Matching', 'Seamless Borders', 'Custom Dimensions'],
      popularity: 85
    },
    {
      id: 7,
      title: 'Remove Text',
      description: 'Remove text and watermarks from images while preserving the background with AI-powered inpainting.',
      detailedDescription: 'Cleanly remove text, watermarks, and logos from images. AI intelligently fills the removed areas with matching background content.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      route: '/remove-text',
      available: true,
      category: 'editing',
      gradient: 'from-red-500 to-red-600',
      bgGradient: 'from-red-50 to-red-100',
      features: ['Text Detection', 'Watermark Removal', 'Background Restoration', 'Batch Processing'],
      popularity: 78
    },
    {
      id: 8,
      title: 'Cleanup',
      description: 'Remove unwanted objects and imperfections from images with precise AI-powered cleanup tools.',
      detailedDescription: 'Professional image cleanup with AI precision. Remove objects, blemishes, and unwanted elements while maintaining natural appearance.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      route: '/cleanup',
      available: true,
      category: 'editing',
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      features: ['Object Removal', 'Blemish Correction', 'Content-Aware Fill', 'Precision Tools'],
      popularity: 80
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tools', icon: '🎨' },
    { id: 'generation', name: 'Generation', icon: '✨' },
    { id: 'enhancement', name: 'Enhancement', icon: '🔧' },
    { id: 'editing', name: 'Editing', icon: '✂️' },
    { id: 'artistic', name: 'Artistic', icon: '🎭' }
  ]

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === selectedCategory)

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-primary-50/30"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-secondary-200/30 to-primary-200/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
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
            <span className="text-primary-700 font-medium">Revolutionary AI Tools</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary-900 to-gray-900 bg-clip-text text-transparent leading-tight"
            variants={fadeInUp}
          >
            AI-Powered Creative Suite
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Discover the future of creative work with our comprehensive AI toolkit. 
            Transform ideas into reality with cutting-edge technology.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
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
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
              }`}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Features Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                className={`group relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-500 ${
                  !feature.available ? 'opacity-75' : 'cursor-pointer hover:shadow-2xl'
                }`}
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
                }}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.3 } 
                }}
                onHoverStart={() => setHoveredFeature(feature.id)}
                onHoverEnd={() => setHoveredFeature(null)}
                onClick={() => {
                  if (feature.available) {
                    navigate(feature.route)
                  }
                }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Status Badge */}
                {!feature.available && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Coming Soon
                    </div>
                  </div>
                )}
                
                {/* Popularity Badge */}
                {feature.available && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {feature.popularity}% Popular
                    </div>
                  </div>
                )}

                <div className="relative z-10 p-8">
                  {/* Icon */}
                  <div className={`flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-center mb-4 text-gray-900 group-hover:text-gray-800">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    {hoveredFeature === feature.id ? feature.detailedDescription : feature.description}
                  </p>

                  {/* Feature List */}
                  <div className="space-y-2 mb-6">
                    {feature.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} mr-3`}></div>
                        {feat}
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  {feature.available ? (
                    <motion.div 
                      className={`text-center bg-gradient-to-r ${feature.gradient} text-white px-6 py-3 rounded-xl font-semibold shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Try Now
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </motion.div>
                  ) : (
                    <div className="text-center bg-gray-100 text-gray-500 px-6 py-3 rounded-xl font-semibold">
                      Notify Me
                    </div>
                  )}
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA Section */}
        <motion.div 
          className="text-center mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat'
              }}></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Creative Workflow?</h3>
              <p className="text-xl mb-8 opacity-90">Join thousands of creators using PixelScribe to bring their ideas to life</p>
              <motion.a
                href="/#features"
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Choose Your Tool
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features