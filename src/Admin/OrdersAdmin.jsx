import React, { useEffect, useState } from 'react';
import access from '../assets/access.png';
import SideBar from './SideBar';
import axios from 'axios';
import { TbTruckDelivery } from "react-icons/tb";
import { MdPending } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import { useNavigate } from 'react-router-dom';



const OrdersAdmin = () => {

  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const [ orderDetails, setOrderDetails ] = useState([]);
  const [ updateStatus, setUpdateStatus ] = useState(false);
  const [ currentOrder, setCurrentOrder ] = useState({});
  const [ orderStatus, setOrderStatus] = useState("");
  
  useEffect(()=>{
    axios.get("https://localhost:7109/api/Order/GetOrderDetailsAdmin",
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res)=>{
        // console.log("order res",res.data.data)
        setOrderDetails(res.data.data)
      })
      .catch((err)=>{
        console.log("order err", err)
      })
  },[])

  const showUpdateModal = (id)=>{
    setUpdateStatus(true);
    const selectedOrder = orderDetails.find(o => o.id == id);
    setCurrentOrder(selectedOrder);
    setOrderStatus(selectedOrder.orderstatus);
    console.log("orderstatus", selectedOrder.orderstatus);
  }

  const handleUpdateStatus = (id, status)=>{
    axios.patch(`https://localhost:7109/api/Order/UpdateOrderStatus?orderId=${id}&newStatus=${status}`,
      {},
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res)=>{
        // console.log("order update res", res);

        // Reset the all order details
        axios.get("https://localhost:7109/api/Order/GetOrderDetailsAdmin",
          {
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then((res)=>{
            // console.log("order res",res.data.data)
            setOrderDetails(res.data.data)
          })
          .catch((err)=>{
            console.log("order err", err)
          })

        
        setUpdateStatus(false)
      })
      .catch((err)=>{
        console.log("order update err", err)
      })
  }



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
    <div className='relative'>

      <div className={`${
            updateStatus ? 'filter blur-md' : ''
        }`}>
        <SideBar/>
      </div>

      {/* Update Order Status Modal */}
      {updateStatus ? (
        <div className='absolute text-lg bg-blue-200 h-[350px] p-5 w-[600px] top-40 left-1/3 z-10 rounded-lg shadow-lg space-y-1'>
          <p style={{background:'#052560'}} className='text-white p-2 rounded-lg shadow-m mb-2'>
            <span>Customer Name : </span>
            <span className='font-serif'>{currentOrder.customerName}</span>
          </p>
          <p>
            <span className='font-semibold'>Email : </span>
            <span>{currentOrder.customerEmail}</span>
          </p>
          <p>
            <span className='font-semibold'>Order Date : </span>
            <span>{currentOrder.orderDate.substring(0, 10)}</span>
          </p>
          <p>
            <span className='font-semibold'>Order ID : </span>
            <span>{currentOrder.orderId}</span>
          </p>
          <p>
            <span className='font-semibold'>Total Price : ₹ </span>
            <span>{currentOrder.totalPrice}</span>
          </p>
          <p>
            <span className='font-semibold'>Transactiom ID : </span>
            <span>{currentOrder.transactionId}</span>
          </p>

          <h1 className='pt-3 font-semibold'>Select Order Status :</h1>
          <div className='flex justify-between gap-2'>
            <select
              // onChange={handleDropdownChange}
              className="w-72 border border-gray-300 rounded-lg"
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option value="Pending" >Pending</option>
              <option value="Shipped" >Shipped</option>
              <option value="Delivered" >Delivered</option>
              <option value="Cancelled" >Cancelled</option>
            </select>
            <button 
              onClick={()=>handleUpdateStatus(currentOrder.id, orderStatus)}
              className='w-auto px-4 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition'>
              Update Status
            </button>
            <button 
              onClick={()=> setUpdateStatus(false)}
              className='w-auto px-4 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition'>
              Cancel
            </button>
          </div>
        </div>
      ):null}

      <div className={`my-20 mt-12 md:ms-64 ms-24 ${
            updateStatus ? 'filter blur-md' : ''
        }`}>
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

                {/* Order Status */}
                <div className='flex justify-center gap-2 text-white pt-3'>
                  <p className={`w-3/7 rounded-lg font-semibold px-5 pt-2 ${
                      order.orderstatus === 'Pending'
                        ? 'bg-gray-500'
                        : order.orderstatus === 'Shipped'
                        ? 'bg-blue-500'
                        : order.orderstatus === 'Delivered'
                        ? 'bg-green-500'
                        : order.orderstatus === 'Cancelled'
                        ? 'bg-red-500'
                        : ''
                        } text-white`}>
                    Order {order.orderstatus}
                  </p>

                  <div className='w-3/7 flex justify-center'>
                    <button 
                      onClick={()=>showUpdateModal(order.id)}
                      className='w-full px-5  bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition'>
                      Update Status
                    </button>
                  </div>
                </div>


              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default OrdersAdmin