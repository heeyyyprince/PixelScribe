import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    { icon: assets.facebook_icon, url: 'https://facebook.com/heeyyyprince', name: 'Facebook' },
    { icon: assets.twitter_icon, url: 'https://twitter.com/heeyyyprince', name: 'Twitter' },
    { icon: assets.instagram_icon, url: 'https://instagram.com/heeyyyprince', name: 'Instagram' },
  ]

  return (
    <footer className='mt-24 border-t border-dark-100 pt-10 pb-6 px-4 sm:px-10 md:px-14 lg:px-28'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
        <div className='col-span-1 md:col-span-2'>
          <motion.img 
            src={assets.new_pixelscribe_logo} 
            alt="PixelScribe" 
            className='h-10 mb-4'
            whileHover={{ scale: 1.05 }}
          />
          <p className='text-dark-500 max-w-md'>PixelScribe transforms your text descriptions into stunning visuals using advanced AI technology. Create unique images in seconds.</p>
          
          <div className='flex gap-4 mt-6'>
            {socialLinks.map((social, index) => (
              <motion.a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className='bg-white p-2 rounded-full shadow-sm border border-dark-100 hover:border-primary-300 transition-colors'
              >
                <img src={social.icon} alt={social.name} className='w-5 h-5' />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h3 className='font-semibold text-dark-800 mb-4'>Quick Links</h3>
          <ul className='space-y-2'>
            <li><Link to="/" className='text-dark-500 hover:text-primary-600 transition-colors'>Home</Link></li>
            <li><a href="/#features" className='text-dark-500 hover:text-primary-600 transition-colors'>Features</a></li>
            <li><a href="/#how-it-works" className='text-dark-500 hover:text-primary-600 transition-colors'>How It Works</a></li>
            <li><Link to="/buy" className='text-dark-500 hover:text-primary-600 transition-colors'>Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h3 className='font-semibold text-dark-800 mb-4'>Contact</h3>
          <ul className='space-y-2'>
            <li className='text-dark-500'>support@pixelscribe.ai</li>
            <li className='text-dark-500'>@heeyyyprince</li>
          </ul>
        </div>
      </div>

      <div className='border-t border-dark-100 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center'>
        <p className='text-dark-400 text-sm'>© {currentYear} PixelScribe. All rights reserved.</p>
        <p className='text-dark-400 text-sm mt-2 md:mt-0'>Created by <a href="https://github.com/heeyyyprince" target="_blank" rel="noopener noreferrer" className='text-primary-600 hover:underline'>heeyyyprince</a></p>
      </div>
    </footer>
  )
}

export default Footer