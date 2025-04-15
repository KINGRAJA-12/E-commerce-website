import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
const Home = ({role}) => {
  return (
    <div className='border-none w-full h-full flex flex-col justify-between items-center'>
      <Navbar role={role}/>
      <Outlet/>
    </div>
  )
}

export default Home
