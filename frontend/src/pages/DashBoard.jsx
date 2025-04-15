import React from 'react'
import { Link } from 'react-router-dom'
import { GoGraph } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Outlet } from 'react-router-dom';
const DashBoard = () => {
  return (
    <div className=' w-full h-screen flex flex-col justify-center items-center border-none'>
      <nav className='w-full h-[10%] grid place-content-center border-none'>
        <h1 className='text-2xl font-bold text-green-500 capitalize'>Admin DashBoard</h1>
      </nav>
      <header className='flex md:flex-row flex-col w-140 border-none justify-around items-center md:h-[10%] h-[200px]'>
        <Link to={"/admin"} className='border-none flex flex-row justify-center items-center w-40 h-10 rounded-md bg-[#0a2636] shadow-sm shadow-black text-white hover:bg-gray-950 transition-all duration-200 hover:text-green-500'>
        <IoMdAddCircleOutline/>
        <span className='ml-2'>Create product</span>
        </Link>
        <Link to={"/admin/all-product"} className='border-none flex flex-row justify-center items-center w-40 h-10 rounded-md bg-[#0a2636] shadow-sm shadow-black text-white hover:bg-gray-950 transition-all duration-200 hover:text-green-500'>
        <MdOutlineProductionQuantityLimits/>
        <span className='ml-2'>Product</span>
        </Link>
        <Link to={"/admin/analyis"} className='border-none flex flex-row justify-center items-center w-40 h-10 rounded-md bg-[#0a2636] shadow-sm shadow-black text-white hover:bg-gray-950 transition-all duration-200 hover:text-green-500'>
        <GoGraph/>
        <span className='ml-2'>Analysis</span>
        </Link>
      </header>
      <section className=' w-full h-[80%] border-none'>
        <Outlet/>
      </section>
    </div>
  )
}

export default DashBoard

