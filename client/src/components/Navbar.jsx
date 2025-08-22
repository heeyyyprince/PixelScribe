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
            className='flex items-center justify-between py-6 relative z-30 bg-gradient-to-br from-primary-50 via-white to-secondary-50 bg-opacity-90'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Link to='/' className="flex items-center justify-center">
                <motion.img 
                    className='w-44 sm:w-52 lg:w-64 mx-auto' 
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
                    className='text-dark-600 hover:text-primary-600 font-medium'
                    whileHover={{ scale: 1.05 }}
                >
                    Features
                </motion.a>
                <motion.a 
                    href="/#how-it-works" 
                    className='text-dark-600 hover:text-primary-600 font-medium'
                    whileHover={{ scale: 1.05 }}
                >
                    How It Works
                </motion.a>
                <motion.p 
                    onClick={() => navigate('/buy')} 
                    className='text-dark-600 hover:text-primary-600 font-medium cursor-pointer'
                    whileHover={{ scale: 1.05 }}
                >
                    Pricing
                </motion.p>
            </div>

            {/* User section */}
            <div className='hidden md:block'>
                {
                    user
                        ? <div className='flex items-center gap-3'>
                            <motion.button 
                                onClick={() => navigate('/buy')} 
                                className='flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-5 py-2 rounded-full'
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                                <img className='w-5' src={assets.credit_star} alt="" />
                                <p className='text-sm font-medium'>Credits: {credit}</p>
                            </motion.button>
                            <p className='text-dark-600 pl-2'>Hi, {user?.name}</p>
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
                                className='bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-2.5 rounded-full font-medium shadow-md'
                                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.2)' }}
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
                        <a href="/#features" className='py-2 text-dark-600 hover:text-primary-600 font-medium'>Features</a>
                        <a href="/#how-it-works" className='py-2 text-dark-600 hover:text-primary-600 font-medium'>How It Works</a>
                        <p onClick={() => navigate('/buy')} className='py-2 text-dark-600 hover:text-primary-600 font-medium cursor-pointer'>Pricing</p>
                        
                        {user ? (
                            <>
                                <div className='flex items-center gap-2 py-2'>
                                    <img className='w-5' src={assets.credit_star} alt="" />
                                    <p className='text-sm font-medium text-dark-600'>Credits: {credit}</p>
                                </div>
                                <button onClick={logout} className='py-2 text-left text-dark-600 hover:text-primary-600 font-medium'>Logout</button>
                            </>
                        ) : (
                            <button 
                                onClick={() => {
                                    setShowLogin(true);
                                    setIsMenuOpen(false);
                                }} 
                                className='bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 rounded-full font-medium mt-2'
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