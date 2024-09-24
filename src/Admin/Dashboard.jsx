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

const Dashboard = () => {

    const [products, setProducts] = useState([]);
    const [admin, setAdmin] = useState(false);
    const id = localStorage.getItem('adminId')

    useEffect(()=>{
		axios.get("http://localhost:5000/items")
			.then((res)=> setProducts(res.data))
			.catch((err)=> console.error(err))
	},[])

    useEffect(()=>{
        axios.get(`http://localhost:5000/users/${id}`)
            .then((res)=>{
                if(res.data?.isAdmin){
                    setAdmin(true)
                }
            })
            .catch((err)=> console.error(err))
    },[id])

    const mostSales = products.filter((item)=> item.rating > 4)

    if(!id && !admin){
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

            {/* Order Dashboard */}
            {/* <div className='flex flex-wrap justify-center w-ful md:mt-2 mt-96'>
                <div className='flex justify-center space-x-2  p-2 me-1 bg-white border border-gray-300 rounded-lg shadow-lg  md:mt-2 mt-96'>

                    <div style={{backgroundColor:'#052560'}} className=' h-40 w-52 text-center rounded-lg border shadow'>
                        <p className='font-serif font-bold text-6xl mt-5'>247</p>
                        <div className='flex justify-center mt-2 space-x-1'>
                            <GrInProgress className='text-2xl' />
                            <p className='font-semibold text-xl'>Order in Progresss</p>
                        </div>
                    </div>

                    <div style={{backgroundColor:'#052560'}} className=' -40 w-52 text-center rounded-lg border shadow'>
                        <p className='font-serif font-bold text-6xl mt-5'>581</p>
                        <div className='flex justify-center mt-2 space-x-1'>
                            <AiOutlineFileDone className='text-3xl' />
                            <p className='font-semibold text-xl'>Order Shipped</p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center space-x-2 bg-white p-2 ms-1 mt-2 border border-gray-300 rounded-lg shadow-lg'>
                    <div style={{backgroundColor:'#052560'}} className=' h-40 w-52 text-center rounded-lg border shadow'>
                        <p className='font-serif font-bold text-6xl mt-5'>2897</p>
                        <div className='flex justify-center mt-2 space-x-1'>
                            <IoCheckmarkDoneCircleSharp className='text-3xl' />
                            <p className='font-semibold text-xl'>Completed</p>
                        </div>
                    </div>

                    <div style={{backgroundColor:'#052560'}} className=' h-40 w-52 text-center rounded-lg border shadow'>
                        <p className='font-serif font-bold text-6xl mt-5'>126</p>
                        <div className='flex justify-center mt-2 space-x-1'>
                            <MdCancelScheduleSend className='text-2xl' />
                            <p className='font-semibold text-xl'>Cancelled</p>
                        </div>
                    </div>
                </div>
            </div> */}

            </div>

            {/* Top Sales */}
            <p style={{color:'#052560'}} className='text-center font-serif text-3xl mb-2'>Top Sales</p>
            <div className='flex justify-center mb-16'>
                <div style={{backgroundColor:'#052560'}} className='h-auto rounded-lg shadow flex justify-center flex-wrap p-3 gap-2'>
                    {mostSales.map((item,index)=>(
                        <NavLink to={`/admin/productdetails/${item.id}`} className='h-40 w-40 bg-white rounded-lg'>
                            <img className='h-40 rounded-lg p-3 hover:scale-105 transition' src={item.url} alt="product img" />
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard