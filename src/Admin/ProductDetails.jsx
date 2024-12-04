import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from './SideBar';
import access from '../assets/access.png';
import { useSelector } from 'react-redux';
import { PiClockAfternoon } from 'react-icons/pi';

const ProductDetails = () => {
  
    const admin = useSelector(state => state.userData);

  	const [item, setItem ] = useState({})

  	const navigate = useNavigate()

  	const {itemId} = useParams();

  useEffect(()=>{
    axios.get(`https://localhost:7109/api/Product/${itemId}`)
    .then((res)=>{
      console.log("fetch product res", res.data.data)
      setItem(res.data.data)
    })
    .catch((err)=>{
      console.log("fetch product res", err)
    })
  },[])



  const handleRemoveProduct = async (itemId) => {
    await axios.delete(`http://localhost:5000/items/${itemId}`)
      .then((res)=>{
        console.log(res);
        alert("item deleted ");
        navigate('/admin/categories');
      })
      .catch((err)=> console.error(err))
  }


  
  if(admin.role === "Admin"){
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
    <div className="flex justify-center">
        <div>
            <SideBar />
        </div>

        <div className='bg-white w-full flex items-center p-10 mt-14 md:ms-40 ms-10'>
        <div  className="w-8/12 mx-auto  p-4 flex gap-2 flex-col md:flex-row shadow-lg rounded-xl border bg-white">

      {/* Product Image and Title */}
      <div className="md:w-1/2 p-4 flex flex-col items-center border rounded-xl">
        <img src={item.image} alt="item" className="md:w-full h-auto w-2/3 object-cover rounded-lg" />
        <h1 className="md:text-2xl text-lg font-semibold font-se mt-4">{item.name}</h1>
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 p-4 flex flex-col justify-between rounded-xl border">
        <div>
          <p className="md:text-2xl text-lg mb-4">{item.description}</p>
          
          <p className='text-xl font-semibold'>Category : 
            <span span> {item.categoryName}</span>
          </p>

          <div className="flex items-center my-3">
            <span className=" text-xl mr-2">⭐{item.rating}</span>
          </div>

          {/* Old Price*/}
          <div >
            <span className='text-xl font-semibold'>Old Price</span>
            <span className="text-xl font-bold mb-4 "> ₹ 
              <strike className=" text-red-600 ml-2">{item.mrp}</strike>
            </span>
          </div>

          {/* Offer Price */}
          <div >
            <span className='text-xl font-semibold'>Offer Price</span>
            <span className="text-xl font-bold mb-4"> ₹ 
              <span className='text-green-800 ml-2'>{item.price}</span>
            </span>
          </div>
          <p className='text-xl font-semibold'>Remaining Stock : 
            <span className='text-xl font-bold'> {item.stock}</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex-col space-y-3 mt-5">
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
