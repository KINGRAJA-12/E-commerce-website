import React from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from 'react';
import toast from 'react-hot-toast';
import useProduct from '../../others/useProduct.jsx';
const Addproduct = () => {
  let {isCreating,createProduct}=useProduct();
  let [name,setName]=useState('');
  let [describtion,setDescribtion]=useState('');
  let [image,setImage]=useState(null);
  let [price,setPrice]=useState('');
  let handleChange=(e)=>{
    try{
      let file=e.target.files[0];
      let reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=async()=>{
        setImage(reader.result);
      }
    }catch(err){
      toast.error(err?.message)
    }
  }
  let handleAdd=async()=>{
    try{
      if(!name || !describtion || image==null || !price)return toast.error("All date required");
      await createProduct({name,describtion,image,price});
      setName('')
      setPrice('')
      setDescribtion('')
      setImage(null)
    }catch(err){
      toast.error(err?.message)
    }
  }
    return (<div className='w-full h-full flex justify-center items-center'>
      <div className='w-140 h-[80%] flex flex-col justify-around px-5 p-2 items-center border-none bg-[#0a2636] hover:bg-gray-900 transition-all duration-300 ease-linear rounded-lg shadow-lg shadow-black'>
    
        <header className='w-full h-[8%] border-none text-xl text-green-500 font-bold capitalize'>
          Add new product
        </header>
        <section className='w-full h-[75%] flex flex-col justify-around'>
          <div>
            <h6 className='text-gray-500 text-sm '>Product Name</h6>
            <input onChange={(e)=>setName(e.target.value)} type="text" value={name} placeholder='Enter new product name...' className='w-full mt-1 bg-stone-950 text-white p-2 h-[80%] m rounded-lg' />
          </div>
          <div>
            <h6 className='text-gray-500 text-sm '>Description</h6>
            <input onChange={(e)=>setDescribtion(e.target.value)} value={describtion} type="text" name="" id="" className='w-full mt-1 bg-stone-950 text-white p-2 h-[80%] rounded-lg'  placeholder='Enter describtion...' />
          </div>
          <div>
            <h6 className='text-gray-500 text-sm '>Price</h6>
            <input onChange={(e)=>setPrice(e.target.value)} type="text" value={price} placeholder='Enter price...' className='mt-1 w-full bg-stone-950 text-white p-2 h-[80%] rounded-lg' />
          </div>
          <div className='w-full h-[30%] flex flex-row items-center'>
            <div className='w-100 h-24 bg-stone-950 grid shadow-sm shadow-gray-800 place-content-center mr-2 p-2 rounded-sm'>
              {!image?<label className='text-gray-500 text-sm'>
                selected image
              </label>:
              <img src={image||""} alt="selected image" className='w-20 h-20 rounded-full'/>}
            </div>
            <label htmlFor="file" className='text-gray-500 shadow-sm bg-stone-950  w-32 h-10 p-2 cursor-pointer rounded-md hover:text hover:bg-gray-950 transition-all duration-150 text-sm flex items-center justify-around'>
              <FaCloudUploadAlt/>
             <span>select image</span></label>
            <input type="file" className='hidden' accept='image/**' name="" id="file" onChange={handleChange}/>
          </div>
        </section>
        <footer className='w-full h-[17%] flex items-center'>
          <button disabled={isCreating} onClick={handleAdd} className='bg-[#34eeaa73] w-full h-10 text-white rounded-md cursor-pointer hover:bg-green-500 transition-all duration-200 hover:scale-102 shadow-sm shadow-green-950 border-none'>
            {isCreating?"processing...":"create product"}
          </button>
        </footer>
      </div>
    </div>
  )
}

export default Addproduct
