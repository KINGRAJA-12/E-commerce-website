import React, { useEffect } from 'react';
import skr from './../assets/skr.jpg';
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { CiStar } from 'react-icons/ci';
import useUser from '../../others/useUser.jsx';
import toast from 'react-hot-toast';
const Product = () => {
  let {isLoading,singleProduct, getSingleProduct,otherProduct,isOther,getAllOtherproduct,addTocart,isAdding}=useUser();
  let {id}=useParams();
  useEffect(()=>{
    let fetch=async()=>{
      try{
        await getSingleProduct(id);
        await getAllOtherproduct(id)
      }catch(err){
        toast.error(err?.message);
      }
    }
    fetch();
  },[id])
  let handleAddToCart=async(id)=>{
    try{
      await addTocart(id);
    }catch(err){
      toast.error(err?.message);
    }
  }
  return (
    <div className='w-full h-screen flex items-center justify-center p-6'>
     <div className='w-1/2 h-full bg-[#0a2636] flex flex-col justify-around items-center hover:bg-gray-900 transition-all duration-300 ease-linear rounded-lg shadow-lg shadow-black overflow-hidden'>
       {isLoading?
       <div className='w-full h-full grid place-content-center'>loading please wait...</div>:(singleProduct?
       <><img src={singleProduct.image||skr} alt="Samsung S20" className='w-[50%] h-[30%] object-cover' />
        <div className='p-4'>
          <h1 className='text-xl font-bold text-white'>{singleProduct?.name}{singleProduct?.isFeatured?"(this is a featured product)":""}</h1>
          <p className='text-gray-400 mt-2'>{singleProduct?.describtion}</p>
          <p className='flex flex-row text-green-500 font-semibold items-center'><FaIndianRupeeSign className='mr-2'/> <span>{singleProduct?.price+" only"}</span></p>
          <footer className='mt-4'>
            <button onClick={()=>handleAddToCart(id)} className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300'>
              {isAdding?"adding...":"Add to Cart"}
            </button>
          </footer>
        </div> </>:<div className='w-full h-full grid place-content-center'>No product found</div>)}
      </div>
      <div className='scroll w-1/2 h-full flex flex-row flex-wrap justify-around items-center overflow-scroll'>
    {!isOther?(
            otherProduct&&otherProduct.length>0?(<section className='w-full flex flex-row flex-wrap justify-around items-center'>
                {otherProduct.map((item,index)=>(
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
    </div>
  );
};

export default Product;