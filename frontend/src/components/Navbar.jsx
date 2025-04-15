import React, { useState } from 'react';
import { CiLogout, CiMenuBurger } from "react-icons/ci";
import { MdOutlineDashboard } from "react-icons/md";
import { FaHome, FaStore, FaCartArrowDown } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../others/useAuth.jsx';
import toast from 'react-hot-toast';
import { IoIosCloseCircleOutline } from "react-icons/io";
const Navbar = ({ role }) => {
  const { isLogout, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className='relative text-white w-full h-[60px] bg-[#0a2636] rounded-md shadow-sm shadow-black flex flex-row justify-between items-center'>
      <div className='text-green-500 font-bold text-2xl p-2 uppercase flex flex-1 h-full justify-start items-center'>
        <FaStore />
        <span className='ml-1'>SKR shop</span>
      </div>
      <div className='border-none h-full w-[35%] hidden flex-row justify-around items-center lg:flex'>
        <Link to={"/"} className='xl:text-md text-sm flex w-28 flex-row justify-center py-1 px-2 rounded-md items-center hover:shadow-sm shadow-green-500 transition-all duration-300 hover:text-green-500'>
          <FaHome /><span className='ml-1'>Home</span>
        </Link>
        <Link to={"/cart"} className='xl:text-md text-sm flex flex-row w-28 justify-center py-1 px-2 rounded-md items-center hover:shadow-sm shadow-green-500 transition-all duration-300 hover:text-green-500'>
          <FaCartArrowDown /><span className='ml-1'>Cart</span>
        </Link>
        {role === "admin" && (
          <Link to={"/admin"} className='xl:text-md text-sm flex flex-row w-28 justify-around py-1 px-2 rounded-md items-center hover:shadow-sm shadow-green-500 transition-all duration-300 hover:text-green-500'>
            <MdOutlineDashboard /><span className='ml-1'>Dashboard</span>
          </Link>
        )}
        <Link to={"/order"} className='xl:text-md text-sm flex flex-row w-28 justify-around py-1 px-2 rounded-md items-center hover:shadow-sm shadow-green-500 transition-all duration-300 hover:text-green-500'>
          <FaClock /><span className='ml-1'>Orders</span>
        </Link>
        <button disabled={isLogout} onClick={handleLogout} className='flex w-28 flex-row justify-center py-1 px-2 rounded-md items-center hover:shadow-sm shadow-green-500 transition-all duration-300 hover:text-green-500'>
          <CiLogout /><span className='ml-1'>{isLogout ? "Processing..." : "Logout"}</span>
        </button>
      </div>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className='text-white absolute top-1/3 right-5 text-2xl font-bold lg:hidden'
      >
       {isMenuOpen?<IoIosCloseCircleOutline/>:<CiMenuBurger />}
      </button>
      {isMenuOpen && (
        <div className='w-full bg-[#0a2636] lg:hidden flex flex-col items-center absolute top-[60px] left-0 shadow-md z-50'>
          <Link to={"/"} onClick={() => setIsMenuOpen(false)} className='w-full text-center py-2 hover:text-green-500'>
            <FaHome className="inline mr-2" /> Home
          </Link>
          <Link to={"/cart"} onClick={() => setIsMenuOpen(false)} className='w-full text-center py-2 hover:text-green-500'>
            <FaCartArrowDown className="inline mr-2" /> Cart
          </Link>
          {role === "admin" && (
            <Link to={"/admin"} onClick={() => setIsMenuOpen(false)} className='w-full text-center py-2 hover:text-green-500'>
              <MdOutlineDashboard className="inline mr-2" /> Dashboard
            </Link>
          )}
          <Link to={"/order"} onClick={() => setIsMenuOpen(false)} className='w-full text-center py-2 hover:text-green-500'>
            <FaClock className="inline mr-2" /> Orders
          </Link>
          <button
            disabled={isLogout}
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
            className='w-full text-center py-2 hover:text-green-500'
          >
            <CiLogout className="inline mr-2" />
            {isLogout ? "Processing..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
