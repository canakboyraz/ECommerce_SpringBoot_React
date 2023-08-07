import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../service/Loginservice'

function Login() {

    const navigate = useNavigate()

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    //send form
    const sendForm = (evt:React.FormEvent) => {
    evt.preventDefault()
    login(email,password).then( res =>{
        const stData = JSON.stringify(res.data)
        sessionStorage.setItem('admin', stData)
        navigate('/home')
    }).catch(err => {
        console.log(err.message)
        alert("Username or Password Fails")
    })
  }

  return (
    
   <div className='row'>
        <div className='col-sm-4'></div>
        <div className='col-sm-4'>
            <form onSubmit={sendForm}>
                <h2>User Login</h2>
                <div className='mb-3'>
                    <input required type='email' onChange={(evt) => setEmail(evt.target.value)} className='form-control' placeholder='Email' />
                </div>
                <div className='mb-3'>
                    <input required type='password' onChange={(evt) => setPassword(evt.target.value)} className='form-control' placeholder='Password'  />
                </div>
                <button className='btn btn-success'> Send </button> 
            </form>
        </div>
        <div className='col-sm-4'></div>
    </div>
  )
}

export default Login