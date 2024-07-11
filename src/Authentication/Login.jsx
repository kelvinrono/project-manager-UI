import {React, useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import "./styles.css"
import { useLoginMutation } from './apiSlice'
import { useNavigate } from 'react-router-dom'

function Login() {
const [formData, setFormData] = useState({
  email: '',
  password: ''
})
const [errors, setErrors] = useState({})

const[login, {data, error, isLoading}] = useLoginMutation()

const navigate = useNavigate()

const handleChange = (e) =>{
  setFormData({...formData, [e.target.name]: e.target.value})
}

const handleLogin = async (e) =>{
  e.preventDefault()

    login(formData).unwrap().then((data) =>{
      toast.success("Login successful")
      localStorage.setItem('token', data.token)
      navigate('/home')
      
    }).catch((err) => {
      if(err.status === 401){
        toast.error(err.data.message)
      }else if(err.status==403){
        toast.error("Forbidden!")
      }else{
        toast.error("An error occurred!")
      }
    })

}

  return (
    <div className='overall-wrapper' >
        <h1 className='register'>Login</h1>
        <div className='auth-wrapper'>
        <form onSubmit={handleLogin} className='form-group'>
          <div>
          <label htmlFor='email'>
            Email:
          </label>
            <input required type="email" id ="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
          <label>
            Password:
          </label>
            <input required type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div>
          </div>
          <div>
          <button type='submit' disabled = {isLoading}>Login</button>
          </div>

        </form>          
        </div>

        <ToastContainer />
    </div>
  )
}

export default Login