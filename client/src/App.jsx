import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Result from './pages/Result'
import TextToImage from './pages/TextToImage'
import ImageEnhancer from './pages/ImageEnhancer'
import BackgroundRemover from './pages/BackgroundRemover'
import StyleTransfer from './pages/StyleTransfer'
import ImageColorizer from './pages/ImageColorizer'
import ObjectRemover from './pages/ObjectRemover'
import ReplaceBackground from './pages/ReplaceBackground'
import Reimagine from './pages/Reimagine'
import Uncrop from './pages/Uncrop'
import RemoveText from './pages/RemoveText'
import Cleanup from './pages/Cleanup'
import Chatbot from './components/Chatbot'
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
    <div className='min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50'>
      <ToastContainer position='bottom-right' />
      <div className='fixed inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.15),transparent_50%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.15),transparent_50%)]'></div>
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/text-to-image' element={<TextToImage />} />
        <Route path='/image-enhancer' element={<ImageEnhancer />} />
        <Route path='/background-remover' element={<BackgroundRemover />} />
        <Route path='/style-transfer' element={<StyleTransfer />} />
        <Route path='/image-colorizer' element={<ImageColorizer />} />
        <Route path='/object-remover' element={<ObjectRemover />} />
        <Route path='/replace-background' element={<ReplaceBackground />} />
        <Route path='/reimagine' element={<Reimagine />} />
        <Route path='/uncrop' element={<Uncrop />} />
        <Route path='/remove-text' element={<RemoveText />} />
        <Route path='/cleanup' element={<Cleanup />} />
        <Route path='/buy' element={<BuyCredit />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
      <Chatbot />
    </div>
  )
}

export default App