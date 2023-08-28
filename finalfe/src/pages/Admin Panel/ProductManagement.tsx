import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../../components/Navbar'
import { Products, Result } from '../../models/Products'
import { allProduct, productAdd, productDelete } from '../../service/service'

function ProductManagement() {

  const navigate =  useNavigate()


  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [price, setPrice] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [image, setImage] = useState('')
  const [cid, setCid] = useState('')

  const [proArr,setProArr] = useState<Result[]>([])

  useEffect(() => {
    allProduct().then( res =>{
        setProArr(res.data.result)
    }).catch(err => {

    })
  }, [])

  const proDelete = (pid:number) =>{
    productDelete(pid).then(res=>{
      console.log(res.data)
      toast.success("Delete Product Success!")
      window.location.reload()
    }).catch(err=>{
      toast.error("Unauthorized User")
    })
  }


  const sendForm = (evt:React.FormEvent) =>{
    evt.preventDefault()
    productAdd(title,detail,price,thumbnail,image,cid).then( res => {
      const stData = JSON.stringify(res.data)
      toast.success("Product Add!")
      navigate('/home')
    }).catch(err => {
      console.log(err.message)
      toast.error("Hata")
    })

  }

  return (
    <>
      <h2 style={{marginTop:20}} >Product Add</h2>
      <form onSubmit={sendForm} className='col-sm-5'>
          <div className='mb-3'>
              <input onChange={(evt) => setTitle(evt.target.value)} className='form-control' placeholder='Title' />
          </div>
          <div className='mb-3'>
              <input onChange={(evt) => setDetail(evt.target.value)} className='form-control' placeholder='Detail' />
          </div>
          <div className='mb-3'>
              <input onChange={(evt) => setPrice(evt.target.value)} className='form-control' placeholder='Price' />
          </div>
          <div className='mb-3'>
              <input onChange={(evt) => setThumbnail(evt.target.value)} className='form-control' placeholder='İmage' />
          </div>
          <div className='mb-3'>
              <input onChange={(evt) => setImage(evt.target.value)} className='form-control' placeholder='Image' />
          </div>
          <div className='mb-3'>
              <input onChange={(evt) => setCid(evt.target.value)} className='form-control' placeholder='Cid' />
          </div>
          <button className='btn btn-danger' >Product Add</button>
      </form>


      <table style={{marginTop:20}} className="table">
  <thead>
    <tr>
      <th scope="col">pid</th>
      <th scope="col">Title</th>
      <th scope="col">Detail</th>
      <th scope="col">Price</th>
      <th scope="col">Thumbnail</th>
      <th scope="col">Delete</th>
      <th scope="col">Update</th>
    </tr>
  </thead>
  <tbody>
    {proArr.map((item,index)=>
    <tr key={index} >
        <th scope="row">{item.pid}</th>
        <td>{item.title}</td>
        <td>{item.detail}</td>
        <td>{item.price}$</td>
        <td><img src={item.thumbnail} style={{height: 150,}} className="card-img-top"/></td>
        <td><button onClick={ () => proDelete(item.pid)}  type="button" className="btn btn-danger btn-sm">Delete</button></td>
        <td><NavLink to={'/product-update/'+item.pid} className="btn btn-warning btn-sm" >Update</NavLink></td>
      </tr>
    )}
      
  </tbody>
</table>

    </>
  )
}

export default ProductManagement