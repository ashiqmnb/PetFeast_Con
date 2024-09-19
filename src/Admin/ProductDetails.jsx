import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from './SideBar';

const ProductDetails = () => {
  
  	const  [item, setItem ] = useState({})
  	const navigate = useNavigate()

  	const {id} = useParams();

    // useEffect(()=>{
    //   axios.get(`http://localhost:5000/items`)
    //       .then((res)=> setProducts(res.data))
    //       .catch((err)=>console.log("aaa",err))
    // },[])

    useEffect(()=>{
        axios.get(`http://localhost:5000/items/${id}`)
            .then((res)=> setItem(res.data))
            .catch((err)=>console.log("aaa",err))
    },[id])

  const handleRemoveProduct = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`)
      .then((res)=>{
        alert("item deleted ");
        navigate('/admin/categories');
      })
      .catch((err)=> console.error(err))
  }


        
  return (
    <div className="flex justify-center">
        <div>
            <SideBar />
        </div>

        <div className='bg-white w-full flex items-center p-10 mt-14 md:ms-40 ms-10'>
        <div  className="w-8/12 mx-auto  p-4 flex gap-2 flex-col md:flex-row shadow-lg rounded-xl border bg-white">

      {/* Product Image and Title */}
      <div className="md:w-1/2 p-4 flex flex-col items-center border rounded-xl">
        <img src={item.url} alt="item" className="md:w-full h-auto w-2/3 object-cover rounded-lg" />
        <h1 className="md:text-2xl text-lg font-semibold font-se mt-4">{item.heading}</h1>
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 p-4 flex flex-col justify-between rounded-xl border">
        <div>
          <p className="md:text-2xl text-lg mb-4">{item.discription}</p>

          <div className="flex items-center mb-4">
            <span className=" text-xl mr-2">⭐{item.rating}</span>
          </div>

          <div className="text-2xl font-bold text-gray-800 mb-4">
            ${item.price}
          </div>

        </div>

        {/* Buttons */}
        <div className="flex-col space-y-3">
          <button
              className="px-5 w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition"
              onClick={()=> handleRemoveProduct(item.id)}>
              Remove Product
          </button>
          <button
              onClick={()=> navigate(`/admin/updateproduct/${item.id}`)}
              className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
           >
            Edit Product
          </button>
          <button
              className="px-5 w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition"
              onClick={()=> navigate(-1)}>
              Back
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ProductDetails
