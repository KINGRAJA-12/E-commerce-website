import React, { useEffect, useState } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Login from "./pages/login.jsx"
import Register from "./pages/Register.jsx"
import Home from "./pages/Home.jsx"
import Homepage from './pages/Homepage.jsx'
import PaymentSuccess from "./pages/PaymentSuccess.jsx"
import Paymentfailure from "./pages/Paymentfailure.jsx"
import Cart from './pages/Cart.jsx'
import DashBoard from './pages/DashBoard.jsx'
import Addproduct from './pages/Addproduct.jsx'
import Feature from './pages/Feature.jsx'
import Analysis from './pages/Analysis.jsx'
import Product from './pages/Product.jsx'
import Order from './pages/Order.jsx'
import { axiosInstance } from '../others/axiosInstances.js'
const App = () => {
  let [user,setUser]=useState(null)
  let [auth,setAuth]=useState(false)
  useEffect(()=>{
    let fetch=async()=>{
      try{
        let res=await axiosInstance.get("/auth/getme")
        console.log(res?.data?.user)
        setUser(res?.data?.user)
        setAuth(true)
      }catch(err){
           setUser(null)  
           setAuth(false)   
      }
    }
    fetch()
  },[])
  return (
    <Routes>
      <Route path='/login' element={user?<Navigate to={"/"}/>:<Login/>}/>
      <Route path='/register' element={user?<Navigate to={"/"}/>:<Register/>}/>
      <Route path='/' element={user?<Home role={user?.role||"user"}/>:<Navigate to={"/login"}/>}>
        <Route index element={user?<Homepage/>:<Navigate to={"/login"}/>}/>
        <Route path='product/:id' element={user?<Product/>:<Navigate to={"/login"}/>}/>
        <Route path='cart' element={user?<Cart/>:<Navigate to={"/login"}/>}/>
        <Route path='order' element={user?<Order/>:<Navigate to={"/login"}/>}/>
        <Route path='/admin' element={user?<DashBoard/>:<Navigate to={"/login"}/>}>
        <Route index element={user?<Addproduct/>:<Navigate to={"/login"}/>}/>
        <Route path='all-product' element={user?<Feature/>:<Navigate to={"/login"}/>}/>
        <Route path='analyis' element={user?<Analysis/>:<Navigate to={"/login"}/>}/>
      </Route>
      </Route>
      <Route path='/success' element={<PaymentSuccess/>}/>
      <Route path='/cancel' element={<Paymentfailure/>}/>
    </Routes>
  )
}

export default App
