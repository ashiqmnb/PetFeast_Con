import React, { useContext, useEffect, useState } from 'react';
import logoImg from '../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../Components/MyContext';

const LoginPage = () => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')


  const {userId, setUserId} = useContext(MyContext)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.get("http://localhost:5000/users")
      const user = response.data.find((user)=> user.username === username && user.password === password );
      const isAdmin = user.isAdmin;
      
      if(isAdmin){
        localStorage.setItem("adminId",user.id)
        alert("Admin Login Successfull");
        navigate('/admin/dashboard')
      }
      else if(!user.isAllowed){
        setError('You Are Restricted Or Blocked')
      }
      else if(user && user.isAllowed){
        alert("login successfull");
        localStorage.setItem('id',user.id)
        localStorage.setItem('username',user.username)
        setUserId(localStorage.getItem('user'))
        navigate('/')
      }
      else{
        setError('Invalid username or password')
      }
    }
    catch(err){
      setError('Something went wrong. Please try again later.')
    }
  };

  return (
    <div  className='flex justify-center py-28 shadow md:mt-20 mt-60'>
        <div className="flex flex-col md:flex-row w-5/6 h-5/6 rounded-2xl">
      {/* Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-20 rounded-2xl">
        <h2 style={{color:'#052560'}} className="mb-6 text-2xl font-bold text-center text-blue-800">User Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="username">Username</label>
            <input
              style={{width:'400px'}}
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}


          <button
          style={{backgroundColor:'#052560'}}
            type="submit"
            className="w-full px-4 mt-3 py-2 font-semibold text-white bg-blue-800 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>

      {/* Logo and Text */}
      <div style={{backgroundColor:'#052560'}} className="w-full md:w-1/2 flex flex-col justify-center items-center  rounded-2xl text-white p-8 ">
        <div className="text-center">
        <img src={logoImg} alt="Logo" className="mb-6 w-64" />
        <p className="text-xl mb-4">Please login to continue.</p>
        <div className='flex space-x-2 ms-3'>
            <p> Don't have an account?</p>
            <NavLink to={'/register'} className="underline font-bold "> Sign up</NavLink>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
