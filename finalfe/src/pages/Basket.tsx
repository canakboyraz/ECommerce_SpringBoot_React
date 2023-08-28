import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Products, Result } from '../models/Products'
import { singleProduct } from '../service/service'

function Basket() {


  const navigate = useNavigate()
  const params = useParams()
  const pid = params.pid
  const title = params.title
  const price = params.price

    const [bigImage, setBigImage] = useState('')
    const [item, setItem] = useState<Result>()

    const [proArr, setProArr] = useState<string[]>([])
    useEffect(() => {
      const stArr = localStorage.getItem("basket")
      if(stArr) {
        const arr:string[] = JSON.parse(stArr) as string[]
        console.log('Arr : '+arr)
        setProArr(arr)
      }
    }, [])


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
        
    
    const fncDelete =(index: number) => {
        const newArr = Object.assign([],proArr)
        newArr.splice(index, 1)
        setProArr(newArr)
        localStorage.setItem("basket", JSON.stringify(newArr))
    }

  return (
    <>  
        <hr></hr>
        <h2>My Basket</h2>
        <hr></hr>
             
             {proArr.map( (item,index) =>
                <div key={index}>
                <h3>{item}</h3>
                <img src={item} className="img-fluid img-thumbnail" style={{height:400}} />
                <span onClick={ () => fncDelete(index)} role='button' className='btn btn-danger' >Delete</span>
                </div>             
)} 

    </>
  )
}

export default Basket