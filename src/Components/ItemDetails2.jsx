import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../Redux/Slices/cartSlice';
import { useDispatch } from 'react-redux';
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { addRemoveWishlist } from '../Redux/Slices/WishlistSlice';


const ItemDetails2 = () => {
  
    const [isLiked, setIsLiked] = useState(false);
    

  	const [item, setItem] = useState({});
    const loginStatus = localStorage.getItem("name");
    const dispatch = useDispatch();

    const handleAddWishlist = (id)=>{
      dispatch(addRemoveWishlist(id));
      setIsLiked(true);
    }

    const handleRemoveWishlist = ()=>{
      dispatch(addRemoveWishlist(id));
      setIsLiked(false);
    }


  	const navigate = useNavigate()

  	const {id} = useParams();

    useEffect( ()=>{
         axios.get(`https://localhost:7109/api/Product/${id}`)
            .then((res)=> {
              // console.log(res.data)
              setItem(res.data.data)
            })
            .catch((err)=>console.log(err))
    },[id])

    useEffect(()=>{
        if(loginStatus){
          axios.get(`https://localhost:7109/api/WishList/checkInWishlist?productId=${id}`,{
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          })
            .then((res)=>{
              // console.log("isLiked",res.data.data)
              setIsLiked(res.data.data)
            })
        }
    },[])


  return (
    <div className='bg-blue-100 w-full flex items-center p-10 md:mt-24 mt-60'>
        <div  className="w-8/12 mx-auto  p-4 flex gap-2 flex-col md:flex-row shadow-lg rounded-xl border bg-white">
      {/* Product Image and Title */}
      <div className="md:w-1/2 p-8 flex flex-col items-center border rounded-xl relative">
        <img src={item.image} alt="item" className="md:w-full h-auto w-2/3 object-cover rounded-lg" />
        {isLiked ? (
          <FcLike onClick={()=>handleRemoveWishlist(item.productId)} className='text-3xl absolute top-4 left-4 cursor-pointer'/>
        ):(
          <FaRegHeart onClick={()=>handleAddWishlist(item.productId)} className='text-3xl absolute top-4 left-4 cursor-pointer'/>
        )}

      </div>

      {/* Product Details */}
      <div className="md:w-1/2 p-4 flex flex-col justify-between rounded-xl border">
        <div>

        <h1 className="md:text-2xl text-lg font-semibold font-se mt-4">{item.name}</h1>

          <p className="md:text-2xl text-lg mb-4">{item.description}</p>

          {/* Product Rating */}
          <div className="flex items-center mb-4">
            <span className=" text-xl mr-2">⭐{item.rating}</span>
          </div>


          {/* Old Price*/}
          <div >
            <span className='text-base font-semibold'>Old Price</span>
            <span className="text-xl font-bold mb-4 "> ₹ 
              <strike className=" text-red-600 ml-2">{item.mrp}</strike>
            </span>
          </div>

          {/* Offer Price */}
          <div >
            <span className='text-lg font-semibold'>Offer Price</span>
            <span className="text-2xl font-bold mb-4"> ₹ 
              <span className='text-green-800 ml-2'>{item.price}</span>
            </span>
          </div>

          {/* COD */}
          <p className="text-lg mb-4 font-serif text-green-600">Cash On Delivery Available</p>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 h-12">
            <button
              onClick={()=> {
                loginStatus ? (
                  dispatch(addToCart(item.productId))
                ):(
                  navigate('/login')
                )
              }}
              className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
            >
              Add to Cart
            </button>
          <button
             className="px-5 bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition"
            onClick={()=> navigate(-1)}>
              Back
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ItemDetails2
