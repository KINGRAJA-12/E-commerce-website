import React, { useState,useEffect } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion} from 'framer-motion';
import toast from 'react-hot-toast';
import useProduct from '../../others/useProduct.jsx';
const Addpro = ({ id, handleVisible,name,describtion,price,image,handleChangeDescribtion,handleChangePrice,handleImageChange,handleChangeName}) => {
  let {updateProduct,isUpdating,fetchAllProduct}=useProduct();
let handleChange=(e)=>{
    try{
      let file=e.target.files[0];
      let reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload=async()=>{
        handleImageChange(reader.result);
      }
    }catch(err){
      toast.error(err?.message)
    }
  }
let handleUpdate=async()=>{
  try{
    if(!name || !describtion || !price ||image==null)
      {
        return toast.error("All field are require");
      }
    await updateProduct(id,{pname:name,pdescribtion:describtion,pprice:price,pimage:image})
    handleChangeName('')
    handleChangeDescribtion('')
    handleChangePrice('')
    handleImageChange(null)
    handleVisible(null)
    }catch(err){
    toast.error(err?.message||"failed to update");
  }
}

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ ease: "linear", duration: 0.2 }}
      className="w-full max-w-[500px] h-auto flex justify-center items-center absolute bg-opacity-50"
    >
      <div className="w-full h-auto flex flex-col justify-around px-5 py-4 items-center bg-[#0a2636] hover:bg-gray-900 transition-all duration-300 ease-linear rounded-lg shadow-lg shadow-black">
        <header className="w-full flex justify-between items-center text-xl text-green-500 font-bold capitalize">
          <span>Update the product</span>
          <button className="text-white text-2xl" onClick={() => handleVisible(null)}>
            <IoIosCloseCircleOutline />
          </button>
        </header>
        <section className="w-full flex flex-col justify-around space-y-4">
          <div>
            <h6 className="text-gray-500 text-sm">Product Name</h6>
            <input type="text" placeholder="Enter new product name..." value={name||""} onChange={(e)=>handleChangeNameName(e.target.value)} className="w-full mt-1 bg-stone-950 text-white p-2 h-10 rounded-lg" />
          </div>
          <div>
            <h6 className="text-gray-500 text-sm">Description</h6>
            <input type="text" placeholder="Enter description..." value={describtion||""} onChange={(e)=>handleChangeDescribtion(e.target.value)} className="w-full mt-1 bg-stone-950 text-white p-2 h-10 rounded-lg" />
          </div>
          <div>
            <h6 className="text-gray-500 text-sm">Price</h6>
            <input type="text" placeholder="Enter price..." value={price||""} onChange={(e)=>handleChangePrice(e.target.value)} className="mt-1 w-full bg-stone-950 text-white p-2 h-10 rounded-lg" />
          </div>
          <div className="w-full flex items-center space-x-4">
            <div className="w-24 h-24 bg-stone-950 flex justify-center items-center rounded-lg shadow-sm shadow-gray-800">
              {image ? (
                <img src={image||""} alt={name||""} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-gray-500 text-sm">No Image</span>
              )}
            </div>
            <label htmlFor="file" className="text-gray-500 bg-stone-950 w-32 h-10 p-2 cursor-pointer rounded-md hover:bg-gray-950 transition-all duration-150 text-sm flex items-center justify-center space-x-2">
              <FaCloudUploadAlt />
              <span>Select Image</span>
            </label>
            <input type="file" className="hidden" accept="image/*" id="file" onChange={handleChange} />
          </div>
        </section>
        <footer className="w-full mt-4">
          <button onClick={handleUpdate} disabled={isUpdating} className="bg-[#34eeaa73] w-full h-10 text-white rounded-md cursor-pointer hover:bg-green-500 transition-all duration-200 hover:scale-105 shadow-sm shadow-green-950">
            {isUpdating?"processing...":"Update Product"}
          </button>
        </footer>
      </div>
    </motion.div>
  );
};

export default Addpro;
