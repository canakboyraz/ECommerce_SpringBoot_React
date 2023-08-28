import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Dashboard() {
  return (
    <>
    <h2 style={{marginTop:100}} >Dashboard</h2>
    
    <NavLink to={'/category-management'} type="button" className="btn btn-primary btn-lg">Category Management</NavLink>
    <NavLink to={'/product-management'} style={{marginLeft:30}} type="button" className="btn btn-warning btn-lg">Product Management</NavLink>
    <NavLink to={'/order-management'} style={{marginLeft:30}} type="button" className="btn btn-secondary btn-lg">Order Management</NavLink>
    </>
  )
}
