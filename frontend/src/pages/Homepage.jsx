import React from 'react'
import skr from "./../assets/skr.jpg"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CiStar } from 'react-icons/ci';
import useUser from "./../../others/useUser.jsx"
import { useEffect } from 'react';
import toast from 'react-hot-toast';
const Homepage = () => {
    let {products,isFetching,getAllproduct}=useUser();
    useEffect(()=>{
        let fetchAll=async()=>{
            try{
                await getAllproduct();
            }catch(err){
                toast.error(err?.message);
            }
        }
        fetchAll()
        console.log("product",products)
    },[])
  return (
    <div className=' w-full h-full'>
        <header className='w-full h-[200px] flex flex-col justify-center items-center'>
            <h1 className='text-green-600 text-5xl font-bold mb-4 mx-auto text-center'>Explore our categories</h1>
            <h6 className='text-white opacity-80 text-lg'>Discover the latest trends in eco-friendly fashion</h6>
        </header>
        {!isFetching?(
        products&&products.length>0?(<section className='w-full flex flex-row flex-wrap justify-around items-center'>
            {products.map((item,index)=>(
            <Link to={`/product/${item?._id}`} key={index}>
            <motion.div 
            initial={{opacity:0,y:-10}}
            animate={{ opacity: 1, y: 0 }}
            transition={{duration:1}}
            
            className='w-52 h-52 border-none relative overflow-hidden rounded-lg m-4 shadow-md shadow-green-900'>
            <img src={item?.image||skr} alt="" className='w-full h-full hover:scale-110 transition-all ease-linear duration-300'/>
                <div className='absolute h-15 w-full border-2 pl-3 bg-black opacity-40 z-10 bottom-0 left-0'>
                    <h2 className='text-white font-bold'>{item?.name}</h2>
                    <p className='text-gray-400 text-sm'>{item.describtion?item.describtion.length > 15
                        ? item.describtion.slice(0, 10) + "..."
                        : item.describtion:"no describtion"}</p>
                    <CiStar className={` rounded-full absolute top-0 right-0 font-extrabold ${item?.isFeatured?"bg-yellow-400 text-black rounded-full":"text-yellow-500"}`}/>
                </div>
            </motion.div>
            </Link>))}
   
        </section>):(<section className='w-full h-full flex justify-center items-center text-green-500'>No product found</section>)):(<section className='w-full h-full flex justify-center items-center text-green-500'>Fetching please wait..</section>)}
    </div>
  )
}

export default Homepage
