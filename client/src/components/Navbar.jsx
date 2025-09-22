import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const Navbar = () => {
    const { setShowLogin, user, credit, logout } = useContext(AppContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    const navigate = useNavigate()

    return (
        <motion.nav 
            className='flex items-center justify-between py-6 px-4 sm:px-10 md:px-14 lg:px-28 relative z-30 bg-gradient-to-br from-primary-50 via-white to-secondary-50 bg-opacity-90'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Link to='/' className="flex items-center justify-center" onClick={() => window.location.href = '/'}>
                <motion.img 
                    className='w-56 sm:w-64 lg:w-80 mx-auto' 
                    src={assets.pixelscribe_logo_new} 
                    alt="PixelScribe Logo" 
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                />
            </Link>

            {/* Mobile menu button */}
            <div className='md:hidden'>
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className='text-dark-800 focus:outline-none'
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-8'>
                <motion.a 
                    href="/#features" 
                    className='text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200'
                    whileHover={{ scale: 1.05 }}
                >
                    Features
                </motion.a>
                <motion.a 
                    href="/#how-it-works" 
                    className='text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200'
                    whileHover={{ scale: 1.05 }}
                >
                    How It Works
                </motion.a>
                {/* Buy Credits (Desktop) */}
                <motion.button
                    onClick={() => {
                        if (user) {
                            navigate('/buy')
                        } else {
                            setShowLogin(true)
                        }
                    }}
                    className='bg-gradient-to-r from-primary-600 to-primary-500 text-white px-5 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Buy Credits
                </motion.button>
            </div>

            {/* User section */}
            <div className='hidden md:block'>
                {
                    user
                        ? <div className='flex items-center gap-3'>
                            <p className='text-dark-600'>Hi, {user?.name}</p>
                            <div className='relative group'>
                                <motion.img 
                                    className='w-10 rounded-full border-2 border-primary-300 cursor-pointer' 
                                    src={assets.profile_icon} 
                                    alt="Profile" 
                                    whileHover={{ scale: 1.1 }}
                                />
                                <div className='absolute hidden group-hover:block top-0 right-0 z-10 pt-12'>
                                    <motion.ul 
                                        className='list-none m-0 p-3 bg-white rounded-lg shadow-lg text-sm min-w-[120px]'
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <motion.li 
                                            onClick={logout} 
                                            className='py-2 px-3 cursor-pointer hover:bg-primary-50 rounded transition-colors'
                                            whileHover={{ backgroundColor: '#fce7f3', scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Logout
                                        </motion.li>
                                    </motion.ul>
                                </div>
                            </div>
                        </div>

                        : <div className='flex items-center gap-4'>
                            <motion.button 
                                onClick={() => setShowLogin(true)} 
                                className='bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300'
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                                Login
                            </motion.button>
                        </div>
                }
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <motion.div 
                    className='absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-2 py-4 md:hidden z-20'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className='flex flex-col space-y-3 px-6'>
                        <a href="/#features" className='py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200'>Features</a>
                        <a href="/#how-it-works" className='py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200'>How It Works</a>
                        <button
                            onClick={() => {
                                if (user) {
                                    navigate('/buy')
                                } else {
                                    setShowLogin(true)
                                }
                                setIsMenuOpen(false)
                            }}
                            className='bg-gradient-to-r from-primary-600 to-primary-500 text-white py-2 px-4 rounded-full font-medium'
                        >
                            Buy Credits
                        </button>
                        
                        {user ? (
                            <>
                                <p className='py-2 text-dark-600 font-medium'>Hi, {user?.name}</p>
                                <button onClick={logout} className='py-2 text-left text-dark-600 hover:text-primary-600 font-medium'>Logout</button>
                            </>
                        ) : (
                            <button 
                                onClick={() => {
                                    setShowLogin(true);
                                    setIsMenuOpen(false);
                                }} 
                                className='bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 rounded-full font-medium mt-2'
                            >
                                Login
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    )
}

export default Navbar