import React from 'react'
import Header from '../components/Header'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'
import { motion } from 'framer-motion'
import { AnimatedBackground } from '../components/DecorativeElements'
import { staggerContainer, fadeInUp } from '../utils/animations'

const Home = () => {
  return (
    <AnimatedBackground>
      <motion.div
        variants={staggerContainer(0.2, 0.1)}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <motion.div variants={fadeInUp}>
          <Header />
        </motion.div>
        
        <motion.div variants={fadeInUp}>
          <Features />
        </motion.div>
        
        <motion.div variants={fadeInUp}>
          <HowItWorks />
        </motion.div>
        
        <motion.div variants={fadeInUp}>
          <Description />
        </motion.div>
        
        <motion.div variants={fadeInUp}>
          <Testimonials />
        </motion.div>
        
        <motion.div variants={fadeInUp}>
          <GenerateBtn />
        </motion.div>
      </motion.div>
    </AnimatedBackground>
  )
}

export default Home