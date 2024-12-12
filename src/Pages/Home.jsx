import React,{useContext, useEffect, useState} from 'react'
import '../App.css'
import HomeMainView from '../Components/HomeMainView'
import ToLogin from '../Components/ToLogin'
import TopRatedProducts from '../Components/TopRatedProducts'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from "../Redux/Slices/cartSlice";
import { fetchWishlist } from '../Redux/Slices/WishlistSlice';
import { fetchAddress } from '../Redux/Slices/AddressSlice'


const Home = () => {
  
  const loginStatus = localStorage.getItem("name")
  const dispatch = useDispatch();

  useEffect(()=>{
    if(loginStatus){
      dispatch(fetchCart());
      dispatch(fetchWishlist());
      dispatch(fetchAddress());
    }
  })

  
  return (
    <div>
        <HomeMainView />
        { loginStatus ? <h1>{null}</h1> : <ToLogin />}
        <TopRatedProducts />
    </div>
  )
}

export default Home
