import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SideBar from './SideBar';

const UserDetails = () => {

  const [ userData, setUserData ] = useState({});
  const [ orderDetails, setOrderDetails ] = useState({});
  const [ orderItems, setOrderItems ] = useState([]);
  const [ address, setAddress ] = useState({})

  const {id} = useParams()


  useEffect(()=>{
    axios.get(`http://localhost:5000/users/${id}`)
			.then((res)=> {
        setUserData(res.data);
        setOrderDetails(res.data.orderDetails)
        setOrderItems(res.data.orderDetails.items)
        setAddress(res.data.address)
        console.log(address);
        
      })
			.catch((err)=> console.error("aaaa",err))
  },[userData])
console.log(userData);


  return (
    <div>
        <div>
            <SideBar />
        </div>


        <div className="flex justify-center my-20 md:ms-44">
      <div className="w-4/6 lg:space-y-0 space-y-7 lg:flex block">
        
        {/* User Details */}
        <div className='bg-slate-100 rounded-lg shadow-lg border lg:w-1/2 w-full space-y-1 p-2'>
            <h1 style={{color:'#052560'}} className="font-bold text-center text-xl mt-2">User Details</h1>
            <div className='flex justify-center'>
              <div className='bg-slate-400 h-24 w-24 text-lg text-center font-semibold rounded-full p-8 my-7'>
                {userData.id}
              </div>
            </div>
            <div className='p-5 text-lg bg-white rounded-lg shadow-md'>
              <p className='font-semibold text-gray-600'>
                Full Name :{" "}
                <span className='text-black'>{userData.fullName}</span>
              </p>
              <p className='font-semibold text-gray-600'>
                Email :{" "}
                <span className='text-black'>{userData.email}</span></p>
              <p className='font-semibold text-gray-600'>
                Username :{" "}
                <span className='text-black'>{userData.username}</span></p>
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
