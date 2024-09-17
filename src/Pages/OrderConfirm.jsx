import React, { useEffect } from 'react'
import orderplaced from '../assets/orderplaced.gif'
import { useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const OrderConfirm = () => {

   const [orderDetails, sertOrderDetails] = useState({})
   const [userAddress, setUserAddress] = useState({})
   const [items, setItems] = useState([])
   const userId = localStorage.getItem('user')


   useEffect(()=>{
      axios.get(`http://localhost:5000/users/${userId}`)
         .then((res)=>{
            // console.log(res);
            sertOrderDetails(res.data.orderDetails)
            setUserAddress(res.data.address)
            setItems(orderDetails.items)
         })
   },[])


  return (
   <div className="container mx-auto px-4 py-10 md:mt-32 mt-64">
      
   {/* Image and Success Message */}
   <div className="text-center">
     <img src={orderplaced} className="w-44 h-auto mx-auto rounded-full" alt="Order Success"/>
     <h2 style={{color:'#199B64'}} className="text-3xl font-bold font-serif mt-5">Order Placed Successfully</h2>
   </div>

   {/* Order Summary and Shipping Address */}
   <div className="flex flex-wrap justify-center gap-4 mt-10 py-8 rounded-lg">
     
     {/* Order Summary */}
     <div className='w-full md:w-max bg-blue-50 p-10 rounded-lg shadow-lg'>
       <h3 style={{color:'#052560'}} className="text-2xl font-bold mb-4">Order Summary</h3>
       <div className="text-lg pt-2 space-y-3 rounded-lg p-">
         <p>Order ID: <span style={{border:'1px solid lightgrey'}} className="px-5 font-mono bg-white">OD83756459010585534</span></p>
         <p>Order Date: <span style={{border:'1px solid lightgrey'}} className="px-5 font-mono bg-white">{orderDetails.orderDate}</span></p>
         <p>Order Time: <span style={{border:'1px solid lightgrey'}} className="px-5 font-mono bg-white">{orderDetails.orderTime}</span></p>
         <p>Payment Method: <span style={{border:'1px solid lightgrey'}} className="px-5 font-mono bg-white">{orderDetails.paymentMethod}</span></p>
         <p>Expected Delivery: <span style={{border:'1px solid lightgrey'}} className="px-5 font-mono bg-white">Before 5 Days After Order Placed </span></p>
       </div>
     </div>

     {/* Shipping Address */}
     <div className=' w-full md:w-max bg-blue-50 p-10  rounded-lg shadow-lg'>
       <h3 style={{color:'#052560'}} className="text-2xl font-bold mb-4">Shipping Address</h3>
       <div className="text-lg  pt-2 space-y-3 rounded-lg p-">
         <p>Full Name: <span style={{border:'1px solid lightgrey'}} className="px-5 font-mono bg-white">{userAddress.fullName}</span></p>
         <p>Phone Number: <span style={{border:'1px solid lightgrey'}} className="px-5 font-mono bg-white">{userAddress.phoneNumber}</span></p>
         <p>Pincode: <span style={{border:'1px solid lightgrey'}} className="px-5 font-mono bg-white">{userAddress.pincode}</span></p>
         <p>House Name: <span style={{border:'1px solid lightgrey'}} className="px-5 font-mono bg-white">{userAddress.houseName}</span></p>
         <p>Place: <span style={{border:'1px solid lightgrey'}} className="px-5 font-mono bg-white">{userAddress.place}</span></p>
         <p>Post Office: <span style={{border:'1px solid lightgrey'}} className="px-5 font-mono bg-white">{userAddress.postOffice}</span></p>
         <p>Land Mark: <span style={{border:'1px solid lightgrey'}} className="px-5 font-mono bg-white">{userAddress.landMark}</span></p>
       </div>
     </div>
   </div>


   <div className='flex justify-center'>
   <NavLink 
      to={'/'}
      className='bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition'>
      Done
   </NavLink>
   </div>
 </div>
  )
}

export default OrderConfirm