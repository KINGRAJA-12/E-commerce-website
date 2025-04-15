import React from 'react'

const Aside = () => {
  return (
    <div className='absolute'>
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
      
    </div>
  )
}

export default Aside
