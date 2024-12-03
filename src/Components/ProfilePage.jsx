import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../Redux/Slices/userSlice';
import { setUserData } from '../Redux/Slices/userDataSlice';


const ProfilePage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const userData = useSelector(state => state.userData)
  const userId = localStorage.getItem('id')

  
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email")


  const fetchUserData = async (userId)=>{
    const response = await axios.get(`http://localhost:5000/users/${userId}`)
    dispatch(setUserData(response.data))
  }

  useEffect(()=>{
    if(userId){
      fetchUserData(userId)
      // axios.get(`http://localhost:5000/users/${userId}`)
      //   .then((res)=> setUserData(res.data))
      //   .catch((err)=>console.error("Error fetching user data:", err))
    }
 },[userId])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 md:mt-24 mt-60">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
        <h2 style={{color:'#052560'}} className="text-2xl font-bold mb-4 text-center">Profile</h2>
        {/* <div className="mb-4">
          <label className="block text-gray-700">User ID:</label>
          <p className="bg-gray-100 rounded p-2">{userData.id}</p>
        </div> */}
        {/* <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <p className="bg-gray-100 rounded p-2">{userData.username}</p>
        </div> */}
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <p className="bg-gray-100 rounded p-2">{name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <p className="bg-gray-100 rounded p-2">{email}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-evenly mt-6">
          <FaShoppingCart onClick={()=> navigate('/cart')} style={{color:'#052560'}} className='h-8 w-auto'/>
          <button
            onClick={()=>{
              localStorage.clear();
              navigate('/');
              setUserData({});
              dispatch(clearUser())
              alert("Logged Out");
            }}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ProfilePage;
