import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SideBar from './SideBar';
import access from '../assets/access.png';
import { useSelector } from 'react-redux';

const UserDetails = () => {

  const {role} = useSelector(state => state.userData);

  const [ userData, setUserData ] = useState({});

  const [ orderDetails, setOrderDetails ] = useState({});
  const [ orderItems, setOrderItems ] = useState([]);
  const [ address, setAddress ] = useState({})


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
      console.log("userfetch res", res)
      setUserData(res.data.data);
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    fetchUserById();
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
      <div className="w-4/6 lg:space-y-0 space-y-7 lg:flex block">
        
        {/* User Details */}
        <div className='bg-slate-100 rounded-lg shadow-lg border lg:w-1/2 w-full space-y-1 p-2'>
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
              {/* <p className='font-semibold text-gray-600'>
                Username :{" "}
                <span className='text-black'>{userData.username}</span></p> */}


              <button
                onClick={handleBlock}
                className={`mt-2 px-3 py-1 w-full rounded-lg text-white text-md font-semibold transition ${
                !userData.isBlocked ? 'bg-red-500' : 'bg-blue-500'
                }`}
                 >
                  {!userData.isBlocked ? 'Block User' : 'Unblock User'}
              </button>
            </div>

            {/* Shipping Address */}
            {Object.keys(address).length > 0 ? (
              <div>
              <h1 style={{color:'#052560'}} className="font-bold text-center text-xl py-2" >Shipping Address</h1>
              <div className='p-5 text-lg bg-white rounded-lg shadow-md'>
                <p className='font-semibold text-gray-600'>
                  Full Name :{" "}
                  <span className='text-black'>{address.fullName}</span>
                </p>
                <p className='font-semibold text-gray-600'>
                  Phone Number :{" "}
                  <span className='text-black'>{address.phoneNumber}</span></p>
                <p className='font-semibold text-gray-600'>
                  Pincode :{" "}
                  <span className='text-black'>{address.pincode}</span></p>
                <p className='font-semibold text-gray-600'>
                  House Name :{" "}
                  <span className='text-black'>{address.houseName}</span></p>
                <p className='font-semibold text-gray-600'>
                  Place :{" "}
                  <span className='text-black'>{address.place}</span></p>
                <p className='font-semibold text-gray-600'>
                  Post Office :{" "}
                  <span className='text-black'>{address.postOffice}</span></p>
                <p className='font-semibold text-gray-600'>
                  Land Mark :{" "}
                  <span className='text-black'>{address.landMark}</span></p>
              </div>
            </div>
            ) : (null)}
        </div>

        {/* Order Details */}
        <div className='bg-slate-100 max-h-[650px] rounded-lg shadow-lg border lg:w-1/2 w-full space-y-5 p-2 overflow-auto scrollbarHidden'>
        <h1 style={{color:'#052560'}} className="font-bold text-center text-xl mt-2">Order Details</h1>
          {/* Order Details */}
          {orderDetails ? (
            <div className='p-5 text-lg bg-white rounded-lg shadow-md'>
            <p className='font-semibold text-gray-600'>
                  Payment Method :{" "}
                  <span className='text-black'>{orderDetails.paymentMethod}</span></p>
            <p className='font-semibold text-gray-600'>
                  Total Price :{" "}
                  <span className='text-black'>{orderDetails.totalPrice}</span></p>
            <p className='font-semibold text-gray-600'>
                  Number of Items :{" "}
                  <span className='text-black'>{orderItems.length}</span></p>
            <p className='font-semibold text-gray-600'>
                  Order Date :{" "}
                  <span className='text-black'>{orderDetails.orderDate}</span></p>
            <p className='font-semibold text-gray-600'>
                  Order Time :{" "}
                  <span className='text-black'>{orderDetails.orderTime}</span></p>
          </div>
          ) : (
            <h1 className='text-center text-red-600 font-bold text-xl'>
              No Orders</h1>
          )}

          {/* Order Items Details */}
          <div className='p-2 text-lg bg-white rounded-lg shadow-lg space-y-2'>
            {orderItems.map((item)=>(
              <div
                key={item.id}
                className="bg-white flex justify-start items-center p-3 border rounded-lg shadow-md space-x-2">
                <img 
                  className="h-16 w-auto" 
                  src={item.url} alt="img" />
                <div>
                  <h1 className="font-semibold">{item.heading}</h1>
                  <p className="font-semibold">Price: $ <span className="font-bold text-green-600">{item.price}</span></p>
              </div>
            </div>
            ))}
          </div>
        </div>

      </div>
    </div>
    </div>
  )
}

export default UserDetails
