import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from './SideBar';
import access from '../assets/access.png';
import { FaBoxOpen } from "react-icons/fa";

const UserDetails = () => {

  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  const [ userData, setUserData ] = useState({});

  const [ orderDetails, setOrderDetails ] = useState([]);


  const {userId} = useParams()

  const handleBlock = async()=>{
    await axios.patch(`https://localhost:7109/api/User/BlockOrUnblock/${userId}`,
      {}
      ,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res)=>{
      console.log("handleBlock ress", res)
    })
    fetchUserById();
  }

  const fetchUserById = ()=>{
    axios.get(`https://localhost:7109/api/User/${userId}`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res)=>{
      // console.log("userfetch res", res)
      setUserData(res.data.data);
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    fetchUserById();

    axios.get(`https://localhost:7109/api/Order/GetOrdersByUserId?userId=${userId}`,
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res)=>{
        console.log("fetch order", res.data.data)
        setOrderDetails(res.data.data)
      })
      .catch((err)=>{
        console.log("fetch order", err)
      })
  },[])




  if(role !== "Admin"){
    return(
        <div className='flex justify-center'>
            <div className='text-center h-96 w-96 shadow-sm'>
                <img className='w-96 mt-44' src={access} alt="access denied" />
                <p className='text-red-500 font-bold text-2xl font-serif'>You don't have permission</p>
                <p className='text-red-500 font-bold text-2xl font-serif'>to access this page !!</p>
            </div>
        </div>
    )
  }

  return (
    <div>
        <div>
            <SideBar />
        </div>


        <div className="flex justify-center my-16 md:ms-44">
      <div className="w-5/6 h-[550px] lg:space-y-0 space-y-7 lg:flex gap-5 block">
      
        {/* User Details */}
        <div className='bg-slate-100 rounded-lg shadow-lg border lg:w-5/12 w-full space-y-1 p-2'>
            <h1 style={{color:'#052560'}} className="font-bold text-center text-xl mt-2">User Details</h1>
            <div className='flex justify-center'>
              <div className='bg-slate-400 h-24 w-24 text-lg text-center font-semibold rounded-full p-8 my-7'>
                {userData.userId}
              </div>
            </div>
            <div className='p-5 text-lg bg-white rounded-lg shadow-md relative'>
              <p className='font-semibold text-gray-600'>
                Full Name :{" "}
                <span className='text-black'>{userData.name}</span>
              </p>
              <p className='font-semibold text-gray-600'>
                Email :{" "}
                <span className='text-black'>{userData.email}</span></p>
                
              <button
                onClick={handleBlock}
                className={`mt-2 px-3 py-1 w-full rounded-lg text-white text-md font-semibold transition ${
                !userData.isBlocked ? 'bg-red-500' : 'bg-blue-500'
                }`}
                 >
                  {!userData.isBlocked ? 'Block User' : 'Unblock User'}
              </button>
            </div>

            
        </div>

        {/* Order Details */}
        <div className='bg-slate-100 max-h-[650px] rounded-lg shadow-lg border lg:w-6/12 w-full space-y-5 p-2 overflow-auto scrollbarHidden'>
        <h1 style={{color:'#052560'}} className="font-bold text-center text-xl mt-2">Order Details</h1>

        {orderDetails.length === 0 ? (
            <div className='flex flex-col items-center text-center p-10 rounded-lg space-y-3'>
                <FaBoxOpen className='h-20 w-20'/>
                <p style={{color:'#052560'}} className='font-semibold text-xl'>No Orders</p>
            </div>
        ):(null)}

          {/* Order Details */}
          {orderDetails.map((order, index)=>{
            return(
              <div className='bg-white p-5 rounded-lg shadow-sm border'>

                <div className='text-base space-y-1'>
                  <p>
                    <span>Order Id : </span>
                    <span className='font-semibold'>{order.orderId}</span>
                  </p>
                  <p>
                    <span>Order Date : </span>
                    <span className='font-semibold'>{order.orderDate.substring(0, 10)}</span>
                  </p>
                  <p>
                    <span>Transaction Id : </span>
                    <span className='font-semibold'>{order.transactionId}</span>
                  </p>
                </div>

                {/* Product images */}
                <div className='flex justify-start pt-4 space-x-2'>
                  {order.orderProducts.map((item, index)=>{
                    return(
                      <img 
                        onClick={()=> navigate(`/admin/productdetails/${item.productId}`)}
                        className='h-20 w-20 hover:scale-105 transition-transform shadow-lg' src={item.image} alt="product image" />
                    )
                  })}
                </div>

              </div>
            )
          })}

        </div>
      </div>
    </div>
    </div>
  )
}

export default UserDetails
