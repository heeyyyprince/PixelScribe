import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'

const HowItWorks = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-semibold mb-4 text-dark-800"
            variants={itemVariants}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-lg text-dark-500 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Transform Words Into Stunning Images in Three Simple Steps
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {stepsData.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
            >
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold z-10">
                {index + 1}
              </div>
              {index < stepsData.length - 1 && (
                <div className="absolute top-16 left-1/2 w-full h-0.5 bg-primary-200 transform -translate-x-1/2 hidden md:block" />
              )}
              <motion.div 
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 pt-10 h-full"
                whileHover={{ 
                  y: -10, 
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  transition: { duration: 0.3 }
                }}
              >
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 mb-6 flex items-center justify-center bg-primary-50 rounded-full">
                    <img src={step.icon} alt="" className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-dark-800">{step.title}</h3>
                  <p className="text-dark-500">{step.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks