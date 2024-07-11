import {React, useState, useEffect} from 'react'
import { useRegisterMutation } from './apiSlice'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css';
import"./styles.css"
import { useNavigate } from 'react-router-dom';
const Register = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
    })
    const [errors, setErrors] = useState({})
    const [register, {data, error, isLoading }] = useRegisterMutation()
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }
    const handleRegister = async (e) => {
      e.preventDefault()

      const validationErrors = {};

      if(!formData.firstName.trim()){
        validationErrors.username = "FirstName is required"
      }
      if(!formData.lastName.trim()){
        validationErrors.lastName = "Last Name is required"
      }
      setErrors(validationErrors)
            
         register(formData).unwrap()
          .then(data => {
            if(data.status==false) {
              toast.error(data.message)
              return
            }else{
            toast.success(data.message)
            setFormData({
              email: '',
              password: '',
              firstName: '',
              lastName: '',
              phoneNumber: ''
            })
            navigate('/login')
          }
          }).catch(err => {
            toast.warn(err.message)
            return
          }) 
           
    }
  return (
    <div className='overall-wrapper' >
        <h1 className='register'>Register</h1>
        <div className='auth-wrapper'>
        <form onSubmit={handleRegister} className='form-group'>
          <div>
          <label htmlFor='email'>
            Email:
          </label>
            <input required type="email" id ="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
          <label htmlFor='firstName'>
            First Name:
          </label>
        <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        {errors.firstName && <span>{errors.firstName}</span> }
          </div>
          <div>
          <label>
            Last Name:
          </label>
            <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div>
            
          <label>
            Phone Number:
          </label>
            <input required type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
          </div>
          <div>
          <label>
            Password:
          </label>
            <input required type="password" name="password" value={formData.password} onChange={handleChange} />

          </div>
          <div>
          {error && <p>Error: {error.data.message}</p>}
          </div>
          <div>
          <button type='submit' disabled = {isLoading}>Register</button>
          </div>

        </form>          
        </div>

        <ToastContainer />
    </div>
  )
}

export default Register