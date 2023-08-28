import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { categoryAdd } from '../../service/service'

function CategoryManagement() {
  const navigate =  useNavigate()


  const [name, setName] = useState('')

  const sendForm = (evt:React.FormEvent) =>{
    evt.preventDefault()
    categoryAdd(name).then( res => {
      const stData = JSON.stringify(res.data)
      toast.success("Category Add!")
      navigate('/home')
    }).catch(err => {
      console.log(err.message)
      toast.error("Hata")
    })

  }

  return (
    <>
      <h2 style={{marginTop:20}} >Category Add</h2>
      <form onSubmit={sendForm} className='col-sm-5'>
          <div className='mb-3'>
              <input onChange={(evt) => setName(evt.target.value)} className='form-control' placeholder='Category' />
          </div>
          <button className='btn btn-danger' >Category Add</button>
      </form>
    </>
  )
}

export default CategoryManagement