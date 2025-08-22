import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const Login = () => {

    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { backendUrl, setShowLogin, setToken, setUser } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            if (state === 'Login') {

                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }

            } else {

                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }

            }



        } catch (error) {
            toast.error(error.message)
        }
    }



    useEffect(() => {
        // Disable scrolling on body when the login is open
        document.body.style.overflow = 'hidden';

        // Cleanup function to re-enable scrolling
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <motion.div 
            className='fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-sm flex justify-center items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div 
                className='absolute inset-0 bg-black/50'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                onClick={() => setShowLogin(false)}
            />
            <motion.form 
                onSubmit={onSubmitHandler} 
                className='relative bg-white p-10 rounded-xl text-slate-500 shadow-xl max-w-md w-full z-50'
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                    delay: 0.1
                }}
            >

                <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>

                <p className='text-sm'>Welcome back! Please sign in to continue</p>

                {state !== 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                    <img src={assets.email_icon} alt="User" className="w-4 h-4 opacity-70" />
                    <input onChange={e => setName(e.target.value)} value={name} className='outline-none text-sm w-full' type="text" placeholder='Full Name' required />
                </div>}

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.email_icon} alt="Email" className="w-4 h-4 opacity-70" />
                    <input onChange={e => setEmail(e.target.value)} value={email} className='outline-none text-sm w-full' type="email" placeholder='Email id' required />
                </div>

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} alt="Password" className="w-4 h-4 opacity-70" />
                    <input onChange={e => setPassword(e.target.value)} value={password} className='outline-none text-sm w-full' type="password" placeholder='Password' />
                </div>

                <p className='text-sm text-primary-600 my-4 cursor-pointer hover:underline'>Forgot password?</p>

                <motion.button 
                    className='bg-gradient-to-r from-primary-600 to-primary-500 w-full text-white py-2.5 rounded-full font-medium shadow-md'
                    whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                >
                    {state === 'Login' ? 'Login' : 'Create Account'}
                </motion.button>

                {state === "Login"
                    ? <p className='mt-5 text-center'>Don't have an account? <span onClick={() => setState('Sign Up')} className='text-primary-600 cursor-pointer hover:underline font-medium'>Sign up</span></p>
                    : <p className='mt-5 text-center'>Already have an account? <span onClick={() => setState('Login')} className='text-primary-600 cursor-pointer hover:underline font-medium'>Login</span></p>
                }

                <motion.button
                    onClick={() => setShowLogin(false)} 
                    className='absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <img className='w-4 h-4' src={assets.cross_icon} alt="Close" />
                </motion.button>
            </motion.form>
        </motion.div>
    )
}

export default Login