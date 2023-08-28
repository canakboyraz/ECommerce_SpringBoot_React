import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { IUser } from '../models/IUser'
import { decrypt } from '../util'

function Control( props: {item: JSX.Element} ) {

  const navigate = useNavigate()
    const stSession = sessionStorage.getItem('user')
    var user:IUser
    if( stSession !== null ){
      try{
        const plainText = decrypt(stSession)
        user = JSON.parse(plainText) as IUser
      } catch (error){
        sessionStorage.removeItem("user")
        navigate('/login')
      }
      
    }
    
  return (
    <>
    { stSession === null  
    ?
    <Navigate to='/login' replace />
    :
    <>
        <Navbar user={user!}/>
        {props.item}
    </>
    }
    </>
  )
}

export default Control