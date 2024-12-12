import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { FaBoxOpen } from "react-icons/fa";



const Order = () => {

  const [ orders, setOrders ] = useState([])

  useEffect(()=>{
    axios.get('https://localhost:7109/api/Order/GetOrderDetails',
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res)=>{
        console.log(res.data.data)
        const reversedOrders = [...res.data.data].reverse();
        setOrders(reversedOrders)
      })
      .catch((err)=>{
        console.log("get order error", err)
      })
  },[])

  return (
    <div className='mx-auto pb-24 p-5 bg-blue-50 px-20 justify-center md:flex-row gap-5 md:mt-20 mt-72'>
        <h2 style={{color:'#052560'}} className="text-2xl font-bold mt-6 mb-6 text-center">Orders</h2>

        {orders.length === 0 ? (
            <div className='flex flex-col items-center text-center p-10 rounded-lg space-y-3'>
                <FaBoxOpen className='h-28 w-28 '/>
                <p style={{color:'#052560'}} className='font-semibold text-xl'>No Orders</p>
            </div>
        ):(null)}

        <div className='flex items-center justify-center'>
          <div className=' w-5/6 flex flex-wrap items-center justify-center gap-3'>
              {orders.map((item, index)=>{
                return(
                  <div className='w-2/5 h-52 border bg-white shadow-md rounded-lg'>
                      <div className='flex px-2 py-4'>
                        {/* Product image */}
                        <img className='h-40 w-40 hover:scale-95 transition-transform' src={item.productImage} alt="" />

                        {/* Other details */}
                        <div className='font-semibold space-y-1'>
                          <p className='text-base font-bold'>{item.productName}</p>
                          <p>Order id : {item.orderId}</p>
                          <p>Order Date : {item.orderDate.substring(0, 10)}</p>
                          <p>Quantity : {item.quantity}</p>
                          <p>Total Price : {item.totalPrice}</p>
                        </div>


                      </div>
                  </div>
                )
              })}
          </div>
        </div>
    </div>
  )
}

export default Order