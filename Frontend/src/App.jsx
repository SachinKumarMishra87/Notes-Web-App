import React from 'react'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import CreateText from './components/CreateText'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateNote from './components/UpdateNote'
const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="min-h-screen h-full">

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create-note' element={<CreateText />} />
          <Route path='/update-note' element={<UpdateNote />} />
        </Routes>
      </div>
    </>
  )
}

export default App
