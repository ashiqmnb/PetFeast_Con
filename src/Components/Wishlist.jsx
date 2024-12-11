import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from '../Redux/Slices/WishlistSlice';
import { RiDislikeFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { addRemoveWishlist } from '../Redux/Slices/WishlistSlice';
import { FcLike } from "react-icons/fc";


const Wishlist = () => {

    const {wishlist} = useSelector(state => state.wishlist);
    // console.log("from comp", wishlist)
    const navigate = useNavigate();

    const itemDetails = (id)=>{
        navigate(`/itemdetails/${id}`)
    }

    const dispatch = useDispatch();

    const handleAddRemove = (id)=>{
        dispatch(addRemoveWishlist(id))
    }

    useEffect(()=>{
        dispatch(fetchWishlist());
    },[])


  return (
    <div className='mx-auto pb-24 p-5 bg-blue-50 px-20 justify-center md:flex-row gap-5 md:mt-20 mt-72'>
        
        <h2 style={{color:'#052560'}} className="text-2xl font-bold mt-6 text-center">Wishlist</h2>

        {wishlist.length === 0 ? (
            <div className='flex flex-col items-center text-center bg-gray-100 p-10 rounded-lg space-y-3'>
                <RiDislikeFill className='h-28 w-28'/>
                <p style={{color:'#052560'}} className='font-semibold text-xl'>No Liked Products</p>
            </div>
        ):(null)}

        <div className='flex gap-4 flex-wrap justify-center p-16 '>
            {wishlist.map((item)=>{
                return(
                    <div key={item.productId} className='sm:w-72 w-44 rounded-2xl bg-white p-8 shadow-lg text-start relative'>
                      <img src={item.image} alt="item" onClick={()=> itemDetails(item.productId)} className='rounded-2xl hover:scale-105 transition-transform'/>
                      <h1 className='font-sans text-lg mt-5 '>{item.name}</h1>
                      <h1 className='font-sans text-lg font-bold text-blue-950'>₹ {item.price}</h1>
                      <FcLike onClick={()=> handleAddRemove(item.productId)} className='text-2xl absolute top-3 right-3 cursor-pointer' />
                    </div>
                  )
                })}
            </div>
    </div>
  )
}

export default Wishlist