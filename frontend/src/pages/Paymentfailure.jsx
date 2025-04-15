import React from 'react'
import { Link } from 'react-router-dom'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaRegArrowAltCircleLeft} from 'react-icons/fa';
import { IoMdCloseCircleOutline } from "react-icons/io";
const Paymentfailure = () => {
  return (
    <div className=' w-full h-[100vh] flex flex-row justify-center items-center'>
    <div className='border-none w-[450px] h-[450px] bg-[#0a2636] rounded-md shadow-lg shadow-black'>
      <header className='border-none w-full h-[40%]'>
        <div className='w-full h-full flex flex-col justify-around items-center'>
          <label className='w-20 h-20 rounded-full text-8xl text-red-500'>
            <IoMdCloseCircleOutline/>
          </label>
          <h1 className='text-red-500 uppercase font-bold text-3xl'>
          purchase cancelled
          </h1>
          <p className='text-gray-400 text-md'>
            Your payment are cancelled.We are processing now..
          </p>
        </div>
      </header>
      <section className='border-none w-full h-[45%] flex justify-center items-center'>
        <div className='py-3 rounded-lg shadow-lg shadow-gray-900 border-none w-[80%] h-[80%] bg-gray-700 flex flex-col justify-around items-center'>
          <div className='w-full flex flex-row justify-around items-center'>
          <h1 className='text-white text-2xl'>
            Total amount
          </h1>
          <h1 className='text-green-500 text-2xl font-bold flex flex-row justify-center items-center'>
          <FaIndianRupeeSign /> <span>500</span>
          </h1>
          </div>
          <div className='w-full flex flex-row justify-center items-center text-white'>
            <span>if you face any issue please contect SKR shop</span>
          </div>
        </div>
      </section>
      <footer className='border-none  w-full h-[15%] flex justify-center'>
        <div className=' rounded-lg shadow-sm shadow-gray-900 border-none w-[80%] h-[60%]  grid place-content-center bg-gray-700'>
          <Link to={"/"} className='text-white flex flex-row justify-center items-center'>
          <FaRegArrowAltCircleLeft className='mt-1 mr-2'/>
          <span> return to shop</span>
          </Link>
        </div>
      </footer>
    </div>
    
  </div>
  )
}

export default Paymentfailure
