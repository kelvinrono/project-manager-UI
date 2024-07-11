import { useState } from 'react'
import './App.css'
import Register from './Authentication/Register'
import { Route, Routes, NavLink } from 'react-router-dom'
import Login from './Authentication/Login'
import Dashboard from './components/Dashboard/Dashboard'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    
    <>
    <Routes >
      <Route exact path="/" />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
