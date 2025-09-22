import React, { useState } from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0)
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  }

  const modernSteps = [
    {
      title: 'Choose Your Tool',
      description: 'Select from our suite of AI-powered creative tools: Text to Image, Image Enhancer, Background Remover, or Style Transfer.',
      icon: '🎯',
      color: 'from-primary-500 to-primary-600',
      bgColor: 'from-primary-50 to-primary-100'
    },
    {
      title: 'Upload or Create',
      description: 'Upload your images or enter text prompts. Our AI understands your creative vision and processes your input instantly.',
      icon: '⚡',
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'from-secondary-50 to-secondary-100'
    },
    {
      title: 'Download & Share',
      description: 'Get professional-quality results in seconds. Download your creations and share them with the world.',
      icon: '🚀',
      color: 'from-primary-400 to-secondary-500',
      bgColor: 'from-primary-50 to-secondary-50'
    }
  ]

  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-white to-secondary-50/30"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-br from-secondary-200/20 to-primary-200/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-6 py-2 rounded-full border border-primary-200 mb-6"
            variants={itemVariants}
          >
            <span className="text-2xl">⚡</span>
            <span className="text-primary-700 font-medium">Simple & Powerful</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary-900 to-gray-900 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            How It Works
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Transform your creative workflow in three simple steps. 
            Our AI-powered platform makes professional content creation accessible to everyone.
          </motion.p>
        </motion.div>

        {/* Interactive Steps */}
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connection Lines */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-secondary-200 to-primary-300 transform -translate-y-1/2 z-0"></div>
              
              <div className="grid grid-cols-3 gap-8 relative z-10">
                {modernSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    variants={itemVariants}
                    onHoverStart={() => setActiveStep(index)}
                  >
                    {/* Step Number */}
                    <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} text-white flex items-center justify-center text-2xl font-bold shadow-xl z-20`}>
                      {index + 1}
                    </div>
                    
                    <motion.div 
                      className={`bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 pt-12 transition-all duration-500 ${
                        activeStep === index ? 'shadow-2xl scale-105' : ''
                      }`}
                      whileHover={{ 
                        y: -10,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-0 transition-opacity duration-500 ${
                        activeStep === index ? 'opacity-100' : ''
                      }`}></div>
                      
                      <div className="relative z-10 p-8 text-center">
                        {/* Icon */}
                        <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-4xl shadow-lg transform transition-transform duration-300 ${
                          activeStep === index ? 'scale-110' : ''
                        }`}>
                          {step.icon}
                        </div>
                        
                        {/* Content */}
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                        
                        {/* Progress Indicator */}
                        <div className="mt-6 flex justify-center">
                          <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden`}>
                            <div className={`h-full bg-gradient-to-r ${step.color} transform transition-transform duration-1000 ${
                              activeStep === index ? 'translate-x-0' : '-translate-x-full'
                            }`}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {modernSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={itemVariants}
              >
                <div className="flex items-start gap-6">
                  {/* Step Number & Line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} text-white flex items-center justify-center text-lg font-bold shadow-lg`}>
                      {index + 1}
                    </div>
                    {index < modernSteps.length - 1 && (
                      <div className={`w-1 h-16 bg-gradient-to-b ${step.color} opacity-30 mt-4`}></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <motion.div 
                    className="flex-1 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center text-2xl`}>
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-xl mb-8 opacity-90">Join thousands of creators who are already using PixelScribe</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/#features"
                  className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choose Your Tool
                </motion.a>
                <motion.a
                  href="/#features"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 inline-block"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Features
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks