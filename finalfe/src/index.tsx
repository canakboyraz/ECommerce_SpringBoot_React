import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//import pages
import Control from './pages/Control';
import Home from './pages/Home';
import Login from './pages/Login';



const router =
<BrowserRouter>
  <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/home' element={<Control item={<Home/>}/> }/>
  </Routes>
</BrowserRouter>



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(router);

