import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { IoBag, IoBagAdd } from "react-icons/io5";
import { FaUserCircle, FaUser } from "react-icons/fa";

const SideNew = () => {
  const [showLogout, setShowLogout] = useState(false); // State to control logout confirmation div visibility

    const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear();
    alert("Admin Logged out successfully!");
    setShowLogout(false);
    navigate('/')
  };

  return (
    <div className='flex'>
      <div style={{ backgroundColor: '#052560' }} className='text-white md:w-64 w-20 h-lvh flex-col fixed'>
        <div className='flex-col pt-10 text-center hidden md:block'>
          <FaUserCircle className='text-9xl ms-16' />
          <p className=' text-2xl font-serif mt-2'>Admin Panel</p>
        </div>

        {/* Navigation Links */}
        <div className=' space-y-2 md:mt-10 mt-40'>
          <NavLink to={'/admin/dashboard'} className='flex space-x-2 p-2 ps-5 mx-3 bg-blue-900 hover:bg-blue-700 rounded-md'>
            <MdDashboard className='text-3xl' />
            <p className='font-semibold text-xl hidden md:block'>Dashboard</p>
          </NavLink>

          <NavLink to={'/admin/home'} className='flex space-x-2 p-2 ps-5 mx-3 bg-blue-900 hover:bg-blue-700 rounded-md'>
            <IoMdHome className='text-3xl' />
            <p className='font-semibold text-xl hidden md:block'>Home</p>
          </NavLink>

          <NavLink to={'/admin/categories'} className='flex space-x-2 p-2 ps-5 mx-3 bg-blue-900 hover:bg-blue-700 rounded-md'>
            <IoBag className='text-3xl' />
            <p className='font-semibold text-xl hidden md:block'>Categories</p>
          </NavLink>

          <NavLink to={'/admin/addnewproduct'} className='flex space-x-2 p-2 ps-5 mx-3 bg-blue-900 hover:bg-blue-700 rounded-md'>
            <IoBagAdd className='text-3xl' />
            <p className='font-semibold text-xl hidden md:block'>Add New Product</p>
          </NavLink>

          {/* Log Out Button */}
          <NavLink
            className='flex space-x-2 p-2 ps-5 mx-3  bg-blue-900 hover:bg-blue-700 rounded-md'
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUser className='text-3xl' />
            <p className='font-semibold text-xl hidden md:block'>Log Out</p>
          </NavLink>

          {/* Logout Div */}
          {showLogout ? (
            <div style={{ backgroundColor: '#052560' }} className='absolute top-5 left-24 md:left-72 w-40 text-black p-5 rounded-md shadow-lg'>
              <FaUserCircle className='text-6xl text-white mx-auto' />
              <p className='text-center font-bold text-xl mt-2 text-white'>Admin Panel</p>
              <button
                className='bg-red-600 text-white px-4 py-2 mt-4 rounded-md block mx-auto'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ):(null)}

          <div className='flex justify-center'>
            <img
              className='h-12 m-4 hidden md:block'
              src={logo} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideNew;