import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5"
import { FaIndianRupeeSign } from "react-icons/fa6"
import { BiSolidOffer } from "react-icons/bi"
import { FaRegArrowAltCircleRight } from 'react-icons/fa'
import { axiosInstance } from '../../others/axiosInstances.js'
import Confetti from "react-confetti"

const PaymentSuccess = () => {
  const location = useLocation()
  const [payment, setPayment] = useState('')
  const [copan, setCopan] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        const query = new URLSearchParams(location.search)
        const session_id = query.get("session_id")
        const res = await axiosInstance.get(`/order/payment-success?session_id=${session_id}`)
        setPayment(res?.data?.amount)
        setCopan(res?.data?.newCopan)
      } catch (err) {
        console.log(err?.response?.data?.message || "err")
      }
    }
    handlePaymentSuccess()

       const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000) 

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='w-full h-[100vh] flex flex-row justify-center items-center'>
      {showConfetti && <Confetti numberOfPieces={70} />}
      <div className='border-none w-[450px] h-[450px] bg-[#0a2636] rounded-md shadow-lg shadow-black'>
        <header className='border-none w-full h-[40%]'>
          <div className='w-full h-full flex flex-col justify-around items-center'>
            <label className='w-20 h-20 rounded-full text-8xl text-green-500'>
              <IoCheckmarkDoneCircleOutline />
            </label>
            <h1 className='text-green-500 uppercase font-bold text-3xl'>
              purchase successfully
            </h1>
            <p className='text-gray-400 text-md'>
              Thank you for order. We are processing now...
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
                <FaIndianRupeeSign /> <span>{payment}</span>
              </h1>
            </div>
            <div className='w-full flex flex-row justify-center items-center text-white'>
              <span>{copan ? "Congratulations! You got a coupon" : ""}</span>
              {copan && <BiSolidOffer className='ml-2 text-yellow-400 text-2xl' />}
            </div>
          </div>
        </section>
        <footer className='border-none w-full h-[15%] flex justify-center'>
          <div className='rounded-lg shadow-sm shadow-gray-900 border-none w-[80%] h-[60%] grid place-content-center bg-gray-700'>
            <Link className='text-white flex flex-row justify-center items-center' to={"/"}>
              <span>Continue shopping</span> <FaRegArrowAltCircleRight className='mt-1 ml-2' />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default PaymentSuccess
