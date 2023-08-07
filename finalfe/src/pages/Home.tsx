import React, { useEffect, useState } from 'react'
import { Product, ProductElement } from '../models/Product'
import { allProduct } from '../service/Productservice'


function Home() {


  const [arr, setArr] = useState<ProductElement[]>([])

  useEffect(() => {
    allProduct().then( res => {
      console.log(res.data)
      setArr(res.data.product)
    }).catch(err => {
      console.log(err.message)
      alert("Product List")
    })
  }, [])
  

  return (
    <>
        <h2>Products</h2>
        <div className='row'>
          {arr.map((item,index) =>
            <div className='col-sm-4' key={index}>
              <div className="card">
                <img src={item.text} style={{height:200}} className="card-img-top"/>
                <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.detail}</p>
                <p className="card-text">{item.price}$</p>
                <p className="card-text">{item.cname}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          )}
        </div>
    </>
  )
}

export default Home