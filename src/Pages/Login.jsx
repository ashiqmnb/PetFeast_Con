import React, { useContext, useEffect, useState } from 'react';
import logoImg from '../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../Components/MyContext';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Redux/Slices/AuthSlice';
import { setUserData } from '../Redux/Slices/userDataSlice';

const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch()

  const {userId, setUserId} = useContext(MyContext)
  const adminId = localStorage.getItem("adminId")

  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {};

    // Email Validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password Validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!regex.test(password)) {
        newErrors.password = 'Password must contain at least one letter, one number, and one special character';
      }
    }

    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = await validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } 
    else{
      try{
        const response =  await dispatch(loginUser({
          email: email,
          password: password
        })).unwrap();

        const userData = response.data;
        console.log("userData",userData)
        

        if(userData.role === "Admin"){
          localStorage.setItem("token", userData.token)
          localStorage.setItem("role", userData.role)

          dispatch(setUserData(userData));

          alert("Admin Login Successfull");
          navigate('/admin/dashboard')
        }

        else{
          localStorage.setItem("token", userData.token);
          localStorage.setItem("role", userData.role);
          localStorage.setItem("name", userData.name);
          localStorage.setItem("email", userData.email);

          dispatch(setUserData(userData));

          alert("User login successfull");
          navigate('/')
        }
      }
      catch(err){
        console.error("Login Error:", err);
        alert(err?.error || "Something went wrong. Please try again later.");
      }
    }
  };

  useEffect(()=>{  
    if(adminId){
      navigate('/admin/dashboard')
    }
  },[])

  return (
    <div  className='flex justify-center py-28 shadow md:mt-20 mt-60'>
        <div className="flex flex-col md:flex-row w-5/6 h-5/6 rounded-2xl">
      {/* Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-20 rounded-2xl">
        <h2 style={{color:'#052560'}} className="mb-6 text-2xl font-bold text-center text-blue-800">User Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="username">Email</label>
            <input
              style={{width:'400px'}}
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            /> <br />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
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
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>

          {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}

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
