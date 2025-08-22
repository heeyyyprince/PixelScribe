import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import Verify from './pages/Verify'

const App = () => {

  const { showLogin } = useContext(AppContext)

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden'>
      <ToastContainer position='bottom-right' />
      <div className='fixed inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.15),transparent_50%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.15),transparent_50%)]'></div>
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy' element={<BuyCredit />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App