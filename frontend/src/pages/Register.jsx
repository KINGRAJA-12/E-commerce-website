import React, { useState } from 'react'
import skr from "./../assets/skr.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuth from '../../others/useAuth.jsx'
import toast from 'react-hot-toast'
const Register = () => {
  let navigate=useNavigate()
  let [name,setName]=useState('');
  let [email,setEmail]=useState('');
  let [password,setPassword]=useState('');
  let {register,isRegister}=useAuth();
  let handleRegister=async(e)=>{
    try{
      if(!name || !email || !password || password.length<7)return toast.error("please provide valid data");
      await register({name,email,password});
      setName('')
      setEmail('')
      setPassword('')
      navigate("/login")
    }catch(err){
      toast.error(err?.message||"register failed")
    }
  }
  return (
    <div className='border-none w-full h-screen flex flex-row justify-center items-center'>
    <motion.div
    initial={{opacity:0,y:-10}}
    animate={{ opacity: 1, y: 0 }}
    transition={{duration:1}}
     className='border-none w-[500px] h-[500px] bg-[#0a2636] rounded-md shadow-lg shadow-black'>
      <header className='border-none w-full h-[40%]'>
        <div className='w-full h-full flex flex-col justify-around items-center'>
          <img src={skr} alt="" className='w-20 h-20 rounded-full'/>
          <h1 className='text-green-500 uppercase font-extrabold text-3xl'>
            welcome to SKR store
          </h1>
          <p className='text-gray-400 text-lg'>
            create your new account
          </p>
        </div>
      </header>
      <section className='border-none w-full h-[45%] flex justify-center items-center'>
        <div className='py-1 rounded-lg shadow-lg shadow-gray-900 border-none w-[80%] h-[80%] bg-gray-700 flex flex-col justify-around items-center'>
        <input onChange={(e)=>setName(e.target.value)} type="text" placeholder='Enter your name...' value={name} className='w-[80%] h-[25%] mx-auto border-black border-2 focus:border-none text-white p-2 rounded-md shadow-sm'/>
          <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Enter your email...' value={email} className='w-[80%] h-[25%] mx-auto border-black border-2 focus:border-none text-white p-2 rounded-md shadow-sm'/>
          <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter your password..' value={password} className='w-[80%] h-[25%] mx-auto border-black border-2 focus:border-none text-white p-2 rounded-md shadow-sm'/>
          <button onClick={handleRegister} disabled={isRegister} className='bg-[#34eeaa73] w-20 h-8 text-white rounded-md cursor-pointer hover:bg-green-500 transition-all duration-200 hover:scale-110 shadow-sm shadow-green-950 border-none'>
            {isRegister?"Processing...":"Register"}
          </button>
        </div>
      </section>
      <footer className='border-none  w-full h-[15%] flex justify-center'>
        <div className=' rounded-lg shadow-sm shadow-gray-900 border-none w-[80%] h-[60%]  grid place-content-center bg-gray-700'>
          <Link to={"/login"} className='text-white'>Already have an account <span className='text-yellow-300 uppercase underline'>login</span></Link>
        </div>
      </footer>
    </motion.div>
    
  </div>
  )
}

export default Register
