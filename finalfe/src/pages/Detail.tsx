import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { addCard, singleProduct } from '../service/service'
import { Result } from '../models/Products'
import { IUser } from '../models/IUser'
import { toast } from 'react-toastify';
import { decrypt } from '../util'
import { title } from 'process'


function Detail() {

    const navigate = useNavigate()
    const params = useParams()
    const pid = params.pid
    const title = params.title
    const price = params.price
    const thumbnail = params.thumbnail

    const [item, setItem] = useState<Result>()
    const [bigImage, setBigImage] = useState('')
    
    useEffect(() => {
      if(pid){
        singleProduct(pid).then( res => {
          setItem(res.data)
          setBigImage(res.data.images[0])
          
        }).catch(err => {
          //alert(err.message)
          navigate('/')
        })
      }
    }, [])

    const [userr, setUserr] = useState<IUser>()
    useEffect(() => {
      const stSession = sessionStorage.getItem('user')
      var user:IUser
      if( stSession !== null ){
        try{
          const plainText = decrypt(stSession)
          user = JSON.parse(plainText) as IUser
          if(user){
            setUserr(user)
          }else{
            navigate('/login')
          }
          
        } catch (error){
          sessionStorage.removeItem("user")
          navigate('/login')
        }
       
      }
    }, [])
    

    const addBasket = () => {
      addCard(userr!.email, pid!,item!.title,item!.price,item!.thumbnail!).then(res => {
        const obj = res.data
        if(obj){
          toast.success("Add Basket Success!")
        }
        console.log(obj)
      }).catch(err => {
        console.log(err.message)
      })
      
      addLocal(pid!,title!,price!,thumbnail!)
    }

    const addLocal = (pid: string,title:string,price:string,thumbnail:string) => {
        const stObj = localStorage.getItem('basket')
        if (stObj){
            //daha önce eklenmiş
            var stArr:string[] = []
            stArr = JSON.parse(stObj) as string[]
            stArr.push(item!.title)
            stArr.push(item!.thumbnail)
        
            const st = JSON.stringify(stArr)
            localStorage.setItem("basket",st)
        }else{
          const arr:string[] = []
          arr.push(item!.title)
          arr.push(item!.thumbnail)
          
          const saveStr = JSON.stringify(arr)
          localStorage.setItem("basket",saveStr)
          
        }
    }
    

  return (
    <>
      { item &&
       <>
        <div className='row'>
            <div className='col-sm-6'>
              <h2>{item.title}</h2>
              <p>{item.detail}</p>
              <p>{item.price}$</p>
              <button onClick={addBasket} className='btn btn-danger' > Add Basket</button>
            </div>
            <div className='col-sm-6'>
              <img src={bigImage} className="img-fluid img-thumbnail" style={{height:400}} />
              <div className='row mt-3'>
                  { item.images.map((item,index)=>
                    <div key={index} className='col-3' role='button' onClick={() => setBigImage(item)} > 
                      <img src={item} className='img-thumbnail' style={{height:100}} />
                    </div>
                  ) }
              </div>
            </div>
        </div>
       </>
      }
    </>
  )
}

export default Detail