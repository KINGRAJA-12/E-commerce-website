import React, { useEffect, useState } from "react";
import skr from "./../assets/skr.jpg";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCartArrowDown, FaRegCopy } from "react-icons/fa";
import PlaceOrder from "../components/PlaceOrder.jsx";
import useProduct from "../../others/useProduct.jsx";
import toast from "react-hot-toast";
import { FaArrowCircleLeft } from "react-icons/fa"
import Aside from "../components/Aside.jsx";
const Cart = () => {
  let [vc,setVc]=useState('')
  const {
    cart,
    isCart,
    isf,
    featureProduct,
    removeFromCart,
    fetchCartItems,
    increamentCount,
    decreamentCount,
    getFeaturedProduct,
    isApply,
    Copan,
    applyCopan,
    isVerify,
    verifyCopan,
    verified
  } = useProduct();

  const [amount, setAmount] = useState(0);
  let [asideVis,setAsideVis]=useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchCartItems();
        await getFeaturedProduct();
      } catch (err) {
        toast.error(err?.message);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    let totalAmount = cart?.reduce(
      (acc, item) => acc + item?.quantity * item?.product?.price,
      0
    );
    setAmount(totalAmount);
  }, [cart]);

  const handleIncrement = async (id) => {
    try {
      await increamentCount(id);
      await fetchCartItems();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleDecrement = async (id) => {
    try {
      console.log("id in decreament",id)
      await decreamentCount(id);
      await fetchCartItems(); 
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeFromCart(id);
      await fetchCartItems();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleApply = async () => {
    try {
      console.log("this is called")
      await applyCopan();
    } catch (err) {
      toast.error(err?.message);
    }
  };
  let handleVerify=async(text)=>{
    try{
      await verifyCopan(text);
    }catch(err){
      toast.error(err?.message);
    }
  }
  let handleSideVisible=()=>{
    setAsideVis(!asideVis)
  }
  let handleCopy=async(text)=>{
    try{
      if(!text ||text.length<8 || text.length==0)return toast.error("no copan found")
      await navigator.clipboard.writeText(text)
      toast.success("Copied to clipboard!");
    }catch(err){
      toast.error(err?.message||"failed to copay")
    }
  }
  return (
    <div className={`border-none w-full flex flex-row justify-around items-center h-screen relative ${asideVis?" md:bg-none md:backdrop-blur-none bg-black/30 backdrop-blur-sm":"opacity-100"}`}>
      <button className="absolute top-3 right-3 text-white text-3xl z-20 md:hidden" onClick={handleSideVisible}>
        <FaArrowCircleLeft/>
      </button>
      <main className="flex w-[70%] h-full flex-col justify-around items-center">
        <div className="w-full border-none h-[70%]">
          <header className="w-full h-[15%] grid place-content-center">
            <h1 className="uppercase font-bold text-2xl text-green-500 flex flex-row">
              <FaCartArrowDown className="m-1" />
              <span className="ml-1">Your cart items</span>
            </h1>
          </header>
          <section className="scroll w-full h-[85%] p-4 flex flex-col items-center overflow-y-scroll">
            {isCart ? (
              <div className="text-white">Fetching please wait...</div>
            ) : cart && cart.length > 0 ? (
              cart.map((item, index) => (
                <div
                  key={index}
                  className="shadow-sm shadow-black rounded-lg text-white md:w-[85%] w-full h-[30%] flex flex-row justify-around items-center bg-[#0a2636] my-2"
                >
                  <div className="h-full w-[15%] flex justify-center items-center overflow-hidden hover:bg-gray-900 transition-all duration-300 ease-linear">
                    <img
                      src={item?.product?.image || skr}
                      alt=""
                      className="h-28 w-28 hover:scale-110 transition-all duration-300 ease-linear"
                    />
                  </div>

                  <div className="h-full w-[25%] flex flex-col justify-around p-1 hover:bg-gray-900 transition-all duration-150 ease-linear">
                    <h4 className="text-md font-bold">{item?.product?.name}</h4>
                    <h6 className="text-sm text-gray-400">
                      {item?.product?.describtion
                        ? item?.product?.describtion.length > 15
                          ? item?.product?.describtion.slice(0, 10) + "..."
                          : item?.product?.describtion
                        : "No description"}
                    </h6>
                    <button
                      className="text-red-600 text-2xl"
                      onClick={() => handleDelete(item?.product?._id)}
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                  <div className="h-full w-[25%] flex flex-row justify-center items-center transition-all hover:bg-gray-900 duration-150 ease-linear">
                    <button
                      onClick={() => handleDecrement(item?.product?._id)}
                      className="w-6 h-6 bg-gray-800 rounded-lg text-xl grid place-content-center hover:bg-white hover:text-black transition-all duration-100 ease-linear"
                    >
                      -
                    </button>
                    <span className="m-2">{item?.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item?.product?._id)}
                      className="w-6 h-6 bg-gray-800 rounded-lg text-xl grid place-content-center hover:bg-white hover:text-black transition-all duration-100 ease-linear"
                    >
                      +
                    </button>
                  </div>

                  <div className="h-full w-[25%] grid place-content-center hover:bg-gray-900 transition-all duration-150 ease-linear">
                    <h2 className="font-bold text-xl text-green-600">
                      Rs {item?.quantity * item?.product?.price.toFixed(2)}
                    </h2>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white">No items found</div>
            )}
          </section>
        </div>
        <footer className="w-full h-[30%] hidden sm:block">
          <header className="w-full h-20 flex justify-center items-center">
            <h1 className="text-green-500 font-semibold text-2xl capitalize">
              Also recommend
            </h1>
          </header>
          <section className="scroll-animation w-full flex flex-row justify-around items-center overflow-x-scroll">
            {isf ? (
              <div>Fetching please wait...</div>
            ) : featureProduct && featureProduct.length > 0 ? (
              featureProduct.map((item, index) => (
                <Link key={index} to={`/product/${item?._id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}

                    className="w-24 h-24 border-none relative overflow-hidden rounded-lg m-4 shadow-md shadow-green-900"
                  >
                    <img
                      src={item?.image}
                      alt=""
                      className="w-full h-full hover:scale-110 transition-all ease-linear duration-300"
                    />
                  </motion.div>
                </Link>
              ))
            ) : (
              <div>No product found</div>
            )}
          </section>
        </footer>
      </main>
      <aside className="w-[30%] h-full p-3 hidden md:flex flex-col justify-around items-center">
        <PlaceOrder copan={Copan || ""} amount={amount || 0} verified={verified}/>
        <div className='w-full h-[30%] border-none rounded-lg text-white  flex flex-col justify-center items-center bg-[#0a2636] shadow-sm shadow-gray-700 hover:bg-gray-900 transition-all duration-300 ease-linear'>
          <div className='w-[80%] h-10 flex flex-row justify-around items-center bg-gray-900 rounded-lg mb-4'>
            <h4 className={`${Copan?"text-white":"text-gray-400"}`}>{Copan?Copan?.copanName:"COPAN"}</h4> 
            <button onClick={()=>handleCopy(Copan?.copanName||"")} disabled={!Copan}><FaRegCopy /></button>
          </div>
          <button onClick={handleApply} disabled={isApply} className='bg-green-500 w-40 h-8 rounded-md hover:bg-green-900 hover:scale-105 transition-all duration-150 ease-linear font-semibold capitalize shadow-sm shadow-black'>
           {isApply?"processing..." :"Apply copan"}
          </button>
        </div>
        <div className='w-full h-[30%] border-none rounded-lg text-white  flex flex-col justify-center items-center bg-[#0a2636] shadow-sm shadow-gray-700 hover:bg-gray-900 transition-all duration-300 ease-linear'>
          <div >
            <input onChange={(e)=>setVc(e.target.value)}  type="text" placeholder='Enter your copan code...' className='mb-4 text-white uppercase text-sm bg-gray-900 rounded-lg p-2'/>
          </div>
          <button disabled={isVerify||!Copan} onClick={()=>handleVerify(vc)} className='bg-red-500 w-40 h-8 rounded-md hover:bg-red-900 hover:scale-105 transition-all duration-150 ease-linear font-bold capitalize shadow-sm shadow-black'>
           {isVerify?"Processing...":"Add copan"}
          </button>
        </div>
      </aside>
    {asideVis&&<aside className="h-full p-3 absolute md:hidden w-full flex flex-col justify-around items-center z-10">
        <PlaceOrder copan={Copan || ""} amount={amount || 0} verified={verified}/>
        <div className='w-full h-[30%] border-none rounded-lg text-white  flex flex-col justify-center items-center bg-[#0a2636] shadow-sm shadow-gray-700 hover:bg-gray-900 transition-all duration-300 ease-linear'>
          <div className='w-[80%] h-10 flex flex-row justify-around items-center bg-gray-900 rounded-lg mb-4'>
            <h4 className={`${Copan?"text-white":"text-gray-400"}`}>{Copan?Copan?.copanName:"COPAN"}</h4> 
            <button onClick={()=>handleCopy(Copan?.copanName||"")} disabled={!Copan}><FaRegCopy /></button>
          </div>
          <button onClick={handleApply} disabled={isApply} className='bg-green-500 w-40 h-8 rounded-md hover:bg-green-900 hover:scale-105 transition-all duration-150 ease-linear font-semibold capitalize shadow-sm shadow-black'>
           {isApply?"processing..." :"Apply copan"}
          </button>
        </div>
        <div className='w-full h-[30%] border-none rounded-lg text-white  flex flex-col justify-center items-center bg-[#0a2636] shadow-sm shadow-gray-700 hover:bg-gray-900 transition-all duration-300 ease-linear'>
          <div >
            <input onChange={(e)=>setVc(e.target.value)}  type="text" placeholder='Enter your copan code...' className='mb-4 text-white uppercase text-sm bg-gray-900 rounded-lg p-2'/>
          </div>
          <button disabled={isVerify||!Copan} onClick={()=>handleVerify(vc)} className='bg-red-500 w-40 h-8 rounded-md hover:bg-red-900 hover:scale-105 transition-all duration-150 ease-linear font-bold capitalize shadow-sm shadow-black'>
           {isVerify?"Processing...":"Add copan"}
          </button>
        </div>
      </aside>}
    </div>
  );
};

export default Cart;
