import React, { useState } from 'react'
import { register } from '../service/service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { IUser } from '../models/IUser'
import { decrypt } from '../util'
import Navbar from '../components/Navbar'

function Register() {

  const navigate =  useNavigate()


  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const sendForm = (evt:React.FormEvent) =>{
    evt.preventDefault()
    register(name,surname,age,email,password).then( res => {
      const stData = JSON.stringify(res.data)
      toast.success("Register Success!")
      navigate('/login')
    }).catch(err => {
      console.log(err.message)
      toast.error("Email Already Exist")
    })

  }

  const stSession = sessionStorage.getItem('user')
    var user:IUser
    if( stSession !== null ){
        const plainText = decrypt(stSession)
        user = JSON.parse(plainText) as IUser
    }

  return (
    <>
      <Navbar user={user!}/>
      <h2 style={{marginTop:20}} >User Register</h2>
      <form onSubmit={sendForm} className='col-sm-5'>
          <div className='mb-3'>
              <input onChange={(evt) => setName(evt.target.value)} className='form-control' placeholder='Name' />
          </div>
          <div className='mb-3'>
              <input onChange={(evt) => setSurname(evt.target.value)} className='form-control' placeholder='Surname' />
          </div>
          <div className='mb-3'>
              <input onChange={(evt) => setAge(evt.target.value)} className='form-control' placeholder='Age' />
          </div>
          <div className='mb-3'>
              <input onChange={(evt) => setEmail(evt.target.value)} className='form-control' placeholder='E-mail' />
          </div>
          <div className='mb-3'>
              <input onChange={(evt) => setPassword(evt.target.value)} className='form-control' type='password' placeholder='Password' />
          </div>
          <button className='btn btn-danger' >Register</button>
      </form>
    </>
  )
}

export default Register