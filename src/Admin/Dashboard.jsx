import React from 'react'
import SideBar from './SideBar'
import { FaShoppingCart } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import { GrInProgress } from "react-icons/gr";
import { AiOutlineFileDone } from "react-icons/ai";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdCancelScheduleSend } from "react-icons/md";




const Dashboard = () => {
  return (
    <div className='flex justify-start bg-blue-100'>
        <div>
            <SideBar />
        </div>

        <div  className='md:ms-72 ms-28 mt-16 rounded-xl'>
        <div className='m-8' >

            {/* Products & Users */}
            <div className='flex justify-center w-full '>
                <div className='flex justify-center space-x-2 bg-white p-2 me-1 mt-2 border border-gray-300 rounded-lg shadow-lg'>
                    
                    <div style={{backgroundColor:'#052560'}} className=' h-40 w-48 m-2 text-center rounded-lg border shadow'>
                        <p className='font-serif font-bold text-7xl mt-5'>13</p>
                        <div className='flex justify-center mt-2 space-x-1'>
                            <MdFoodBank className='text-3xl' />
                            <p className='font-semibold text-xl'>Products</p>
                        </div>
                    </div>

                    <div style={{backgroundColor:'#052560'}} className=' h-40 w-48 m-2 text-center rounded-lg border shadow'>
                        <p className='font-serif font-bold text-7xl mt-5'>13</p>
                        <div className='flex justify-center mt-2 space-x-1'>
                            <FaUserTie className='text-2xl' />
                            <p className='font-semibold text-xl'>Users</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Order Dashboard */}
            <div className='flex flex-wrap justify-center w-ful'>
                <div className='flex justify-center space-x-2 bg-white p-2 me-1 mt-2 border border-gray-300 rounded-lg shadow-lg'>

                    <div style={{backgroundColor:'#052560'}} className=' h-40 w-52 text-center rounded-lg border shadow'>
                        <p className='font-serif font-bold text-7xl mt-5'>493</p>
                        <div className='flex justify-center mt-2 space-x-1'>
                            <GrInProgress className='text-2xl' />
                            <p className='font-semibold text-xl'>Order in Progresss</p>
                        </div>
                    </div>

                    <div style={{backgroundColor:'#052560'}} className=' -40 w-52 text-center rounded-lg border shadow'>
                        <p className='font-serif font-bold text-7xl mt-5'>895</p>
                        <div className='flex justify-center mt-2 space-x-1'>
                            <AiOutlineFileDone className='text-3xl' />
                            <p className='font-semibold text-xl'>Order Shipped</p>
                        </div>
                    </div>

                </div>

                <div className='flex justify-center space-x-2 bg-white p-2 ms-1 mt-2 border border-gray-300 rounded-lg shadow-lg'>

                    <div style={{backgroundColor:'#052560'}} className=' h-40 w-52 text-center rounded-lg border shadow'>
                        <p className='font-serif font-bold text-7xl mt-5'>2897</p>
                        <div className='flex justify-center mt-2 space-x-1'>
                            <IoCheckmarkDoneCircleSharp className='text-3xl' />
                            <p className='font-semibold text-xl'>Completed</p>
                        </div>
                    </div>

                    <div style={{backgroundColor:'#052560'}} className=' h-40 w-52 text-center rounded-lg border shadow'>
                        <p className='font-serif font-bold text-7xl mt-5'>146</p>
                        <div className='flex justify-center mt-2 space-x-1'>
                            <MdCancelScheduleSend className='text-2xl' />
                            <p className='font-semibold text-xl'>Cancelled</p>
                        </div>
                    </div>

                </div>


            </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard