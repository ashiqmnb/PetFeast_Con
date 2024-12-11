import React,{useState, useEffect} from 'react'
import axios from 'axios';
import SideBar from './SideBar'
import { FaShoppingCart } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import { GrInProgress } from "react-icons/gr";
import { AiOutlineFileDone } from "react-icons/ai";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdCancelScheduleSend } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import ProductChart from './Charts/ProductChart';
import UserChart from './Charts/UserChart';
import access from '../assets/access.png';
import { useSelector } from 'react-redux';

const Dashboard = () => {

    const role = localStorage.getItem('role');

    const [totalOrder, setTotalOrder] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(null);

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        axios.get("https://localhost:7109/api/Product/TopRatedProducts")
        .then((res)=> {
            setProducts(res.data.data);
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    useEffect(()=>{
        axios.get('https://localhost:7109/api/Order/TotalRevenue',
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((res)=>{
                // console.log("totalRevenue", res.data.data);
                setTotalRevenue(res.data.data);
            })
            .catch((err)=>{
                console.log("totalRevenue error",err)
            })

            axios.get('https://localhost:7109/api/Order/TotalProductsPurchased',
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then((res)=>{
                    // console.log("totalOrder", res.data.data)
                    setTotalOrder(res.data.data);
                })
                .catch((err)=>{
                    console.log("totalOrder error",err)
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
    <div className='flex justify-start bg-blue-100'>
        <div>
            <SideBar />
        </div>

        <div  className='md:ms-72 ms-28 me-10 rounded-xl text-white bg-blue-100'>
        <div className='m-8 flex-col space-y-14 bg-blue-100' >

            {/* Order Dashboard */}
            <div className='flex flex-wrap justify-center w-ful md:mt-2 mt-96'>
                <div className='flex justify-center space-x-2  p-2 me-1 bg-white border border-gray-300 rounded-lg shadow-lg  md:mt-2 mt-80'>

                    {/* <div style={{backgroundColor:'#052560'}} className=' h-40 w-52 text-center rounded-lg border shadow'>
                        <p className='font-serif font-bold text-6xl mt-5'>247</p>
                        <div className='flex justify-center mt-2 space-x-1'>
                            <GrInProgress className='text-2xl' />
                            <p className='font-semibold text-xl'>Order in Progresss</p>
                        </div>
                    </div> */}

                    <div style={{color:'#052560'}} className=' -40 w-52 text-center rounded-lg border shadow'>
                        <p className='font-bold text-6xl mt-5'>{totalRevenue}</p>
                        <div className='flex justify-center mt-4 space-x-1'>
                            <AiOutlineFileDone className='text-3xl' />
                            <p className='font-semibold text-xl'>Total Revenue</p>
                        </div>
                    </div>
                </div>

                <div style={{color:'#052560'}} className='flex justify-center space-x-2 bg-white p-2 ms-1 mt-2 border border-gray-300 rounded-lg shadow-lg'>
                    <div className=' h-40 w-52 text-center rounded-lg border shadow'>
                        <p className='font-bold text-6xl mt-5'>{totalOrder}</p>
                        <div className='flex justify-center mt-4 space-x-1'>
                            <IoCheckmarkDoneCircleSharp className='text-3xl' />
                            <p className='font-semibold text-xl'>Total Order</p>
                        </div>
                    </div>

                    {/* <div style={{backgroundColor:'#052560'}} className=' h-40 w-52 text-center rounded-lg border shadow'>
                        <p className='font-serif font-bold text-6xl mt-5'>126</p>
                        <div className='flex justify-center mt-2 space-x-1'>
                            <MdCancelScheduleSend className='text-2xl' />
                            <p className='font-semibold text-xl'>Cancelled</p>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Charts */}
            <div className='flex justify-center w-full flex-wrap h-96 bg-blue-100'>
                <div className='h-auto w-full md:w-5/6 flex flex-col md:flex-row justify-center space-y-2 md:space-x-2 p-2 '>
                  <div className='h-96 w-full md:w-1/2 m-2 text-center rounded-lg border shadow-lg flex justify-center bg-white'>
                        <div>
                            <h1 style={{color:'#052560'}} className='text-black text-2xl font-semibold my-2'>User Chart</h1>
                            <UserChart />
                        </div>
                  </div>
                  <div className='h-96 w-full md:w-1/2 m-2 text-center rounded-lg border shadow-lg flex justify-center bg-white'>
                        <div>
                            <h1 style={{color:'#052560'}} className='text-black text-2xl font-semibold my-2'>Product Chart</h1>
                            <ProductChart />
                        </div>
                  </div>
                </div>
            </div>

            </div>

            {/* Top Sales */}
            <p style={{color:'#052560'}} className='text-center font-bold font-serif text-3xl mt-10 mb-2'>Top Sales</p>
            <div className='flex justify-center mb-16'>
                <div className='h-auto rounded-lg bg-white shadow flex justify-center flex-wrap p-3 gap-2'>
                    {products.map((item,index)=>(
                        <NavLink to={`/admin/productdetails/${item.productId}`} className='h-44 w-44 shadow-lg rounded-lg'>
                            <img className='h-44 rounded-lg p-3 hover:scale-105 transition ' src={item.image} alt="product img" />
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard