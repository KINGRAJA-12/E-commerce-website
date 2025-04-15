import React from 'react'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import useProduct from '../../others/useProduct.jsx'
import toast from 'react-hot-toast';
const PlaceOrder = ({copan,amount,verified}) => {
  let {isPlacing,placeOrder,fetchCartItems}=useProduct();
  let handlePlace=async()=>{
    try{
      await placeOrder(copan?.copanName);
      await fetchCartItems();
    }catch(err){
      toast.error(err?.message);
    }
  }
  return (
  <div 
         className='w-full h-[30%] border-none rounded-lg text-white  flex flex-col justify-center items-center bg-[#0a2636] shadow-sm shadow-gray-700 hover:bg-gray-900 transition-all duration-300 ease-linear'>
         <section className='w-full h-[70%] flex flex-row justify-center items-center'>
           <div className='flex flex-col justify-around items-end capitalize font-bold'>
 
             <span className='text-gray-500 text-sm '>
               total amount:
             </span>
             <span className='text-gray-500 text-sm'>
               discount amount:
             </span>
             <br className='text-white'/>
             <span className='text-lg '>
               final price:
             </span>
           </div>
           <div className='flex flex-col justify-around items-start ml-4'>
             <span className='flex flex-row justify-center items-center'>
             <FaIndianRupeeSign /> <span>{amount}</span>
             </span>
             <span className='flex flex-row justify-center items-center'>
             <FaIndianRupeeSign /> <span>{copan?(verified?Math.floor((copan?.discountpercentage/100)*amount):"0"):"0"}</span>
             </span>
             <br className='text-white'/>
             <span className='flex flex-row justify-center items-center text-green-500'>
             <FaIndianRupeeSign /> <span className='text-lg mr-1'>{copan?(verified?amount-Math.floor(((copan?.discountpercentage/100)*amount).toString()):amount):amount}</span><span>only</span>
             </span>
           </div>
           </section>
           <footer>
             <button onClick={handlePlace} disabled={isPlacing} className='bg-green-500 w-24 h-8 rounded-md hover:bg-green-900 hover:scale-105 transition-all duration-150 ease-linear font-bold capitalize shadow-sm shadow-black'>
              {isPlacing?"processing..":"place order"}
             </button>
           </footer>
         </div>
  )
}

export default PlaceOrder
