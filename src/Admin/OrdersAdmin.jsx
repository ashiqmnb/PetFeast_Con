import React, { useEffect, useState } from 'react';
import access from '../assets/access.png';
import SideBar from './SideBar';
import axios from 'axios';

const OrdersAdmin = () => {

  const role = localStorage.getItem('role');

  const [ orderDetails, setOrderDetails ] = useState([]);
  
  useEffect(()=>{
    axios.get("https://localhost:7109/api/Order/GetOrderDetailsAdmin",
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res)=>{
        console.log("order res",res.data.data)
        setOrderDetails(res.data.data)
      })
      .catch((err)=>{
        console.log("order err", err)
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
        <SideBar/>
      </div>

      <div className=" my-20 mt-12 md:ms-64 ms-24">
        <h1 style={{color:'#052560'}} className='text-center font-bold text-2xl'>Recent Orders</h1>
        <div className='w-full p-10  flex gap-4 justify-center flex-wrap'>
            {orderDetails.map((order, index)=>(
              <div className='w-5/12 bg-blue-100 p-5 rounded-lg shadow-lg space-y-1'>

                <p style={{background:'#052560'}} className='text-white p-2 rounded-lg shadow-m mb-2'>
                  <span>Customer Name : </span>
                  <span className='font-serif'>{order.customerName}</span>
                </p>
                <p>
                  <span className='font-semibold'>Email : </span>
                  <span>{order.customerEmail}</span>
                </p>
                <p>
                  <span className='font-semibold'>Order Date : </span>
                  <span>{order.orderDate.substring(0, 10)}</span>
                </p>
                <p>
                  <span className='font-semibold'>Order ID : </span>
                  <span>{order.orderId}</span>
                </p>
                <p>
                  <span className='font-semibold'>Total Price : ₹ </span>
                  <span>{order.totalPrice}</span>
                </p>
                <p>
                  <span className='font-semibold'>Transactiom ID : </span>
                  <span>{order.transactionId}</span>
                </p>

              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default OrdersAdmin