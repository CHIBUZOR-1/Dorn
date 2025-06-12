import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Hotjar from '@hotjar/browser';
import Login from './Pages/Login'
import ScrollToTop from './Components/ScrollToTop';
import { ToastContainer } from 'react-toastify'
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';

const App = () => {
  const siteId = import.meta.env.VITE_HOTJAR_SITE_ID;
  const hotjarVersion = import.meta.env.VITE_HOTJAR_VERSION;

  useEffect(() => {
    if (import.meta.env.MODE === 'production') {
    Hotjar.init(Number(siteId), Number(hotjarVersion));
  }
  }, []);
  return (
    <>
      <ToastContainer className='max-sm:flex max-sm:w-full px-1 max-sm:justify-center font-semibold' />
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/sign-up' element={<Register/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
      </Routes>
    </>
  )
}

export default App