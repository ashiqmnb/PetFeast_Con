import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { FaBoxOpen } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



const Order = () => {

  const [ orders, setOrders ] = useState([]);
  const navigate = useNavigate();



  const fetchOrder = ()=>{
    axios.get('https://localhost:7109/api/Order/GetOrderDetails',
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res)=>{
        // console.log(res.data.data)
        const reversedOrders = [...res.data.data].reverse();
        setOrders(reversedOrders)
      })
      .catch((err)=>{
        console.log("get order error", err)
      })
  }


  const handleCancelOrder = (id)=>{
    axios.patch(`https://localhost:7109/api/Order/CancelOrder?orderId=${id}`,
      {},
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res)=>{
        // console.log("order cancel res", res)
        fetchOrder();
      })
      .catch((err)=>{
        console.log("order cancel err", err)
      })
  }


  useEffect(()=>{
    fetchOrder();
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
              {orders.map((order, index)=>{
                return(
                  <div key={index} className='w-2/5 flex p-5 h-[350px] border bg-white shadow-md rounded-lg'>
                        {/* Order details */}
                        <div className='font- space-y-1'>
                          {/* <p className='text-base font-bold'>{item.productName}</p> */}
                          <p>
                            <span>Order ID : </span>
                            <span className='font-semibold'>{order.orderId}</span>
                          </p>
                          <p>
                            <span>Transaction ID : </span>
                            <span className='font-semibold'>{order.transactionId}</span>
                          </p>
                          <p>
                            <span>Order Date : </span>
                            <span className='font-semibold'>{order.orderDate.substring(0, 10)}</span>
                          </p>
                          <p>
                            <span>Total Price : </span>
                            <span className='font-semibold'>{order.orderProducts.reduce((acc, cur) => acc + cur.totalPrice, 0)}</span>
                          </p>

                          {/* Product details */}
                          <div className=' flex  rounded-lg gap-2'>
                            {order.orderProducts.map((item, index)=>(
                              <div key={index} className='bg-blue-100 p-3 rounded-lg'>
                                <img 
                                  onClick={()=>navigate(`/itemdetails/${item.productId}`)}
                                  className='h-20 w-20 rounded-lg hover:scale-105 transition-transform' src={item.image} alt="" />
                                <p className='text-xs font-semibold mt-1'>
                                  <span>Qty : </span>
                                  <span>{item.quantity}</span>
                                </p>
                                <p className='text-xs font-semibold'>
                                  <span>Price : </span>
                                  <span>{item.totalPrice}</span>
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className='flex justify-center gap-2 text-white pt-4'>
                            <p className={`w-3/7 rounded-lg font-semibold px-5 py-2 ${
                                order.orderStatus === 'Pending'
                                  ? 'bg-gray-500'
                                  : order.orderStatus === 'Shipped'
                                  ? 'bg-blue-500'
                                  : order.orderStatus === 'Delivered'
                                  ? 'bg-green-500'
                                  : order.orderStatus === 'Cancelled'
                                  ? 'bg-red-500'
                                  : ''
                                  } text-white`}>
                              Order {order.orderStatus}
                            </p>
                                
                            {order.orderStatus === 'Shipped' || order.orderStatus === 'Pending'  ? (
                              <div className='w-3/7 flex justify-center'>
                                <button 
                                  onClick={()=>handleCancelOrder(order.id)}
                                  className='w-full px-5  bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition'>
                                  Cancel Order
                                </button>
                                </div>
                            ):null}
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