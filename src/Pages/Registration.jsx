import React, { useState } from 'react';
import logoImg from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../Redux/Slices/AuthSlice';



const Registration = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const validate = () => {
    const newErrors = {};

    // Full Name Validation
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';

    // Email Validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!regex.test(formData.password)) {
        newErrors.password = 'Password must contain at least one letter, one number, and one special character';
      }
    }

    // Confirm Password Validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } 
    else {
      try{
        await dispatch(registerUser({
          name: formData.fullName,
          email: formData.email,
          password: formData.password
        })).unwrap();

        alert("User Registered Successfully...")
        navigate('/login')

      }
      catch(error){
        alert(error.error);
        console.log("////",error)
      }
    }
  };

  return (
    <div className='flex justify-center py-16 shadow md:mt-20 mt-60'>
        <div className="flex flex-col md:flex-row w-5/6 h-5/6 rounded-2xl">
      {/* Left Part - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-8 rounded-2xl">
        <h2 style={{color:'#052560'}} className="text-2xl font-bold mb-6">User Registeration</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">

          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
              
          </div>

          {/* <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
          </div> */}

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
          </div>

          <button 
            style={{backgroundColor:'#052560'}}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>

      {/* Right Part - Info */}
      <div style={{backgroundColor:'#052560'}} className="w-full md:w-1/2 flex flex-col justify-center items-center  rounded-2xl text-white p-8 ">
        <img src={logoImg} alt="Logo" className="mb-6 w-64" />
        <p className="text-3xl font-bold mb-4">Welcome!</p>
        <p className="text-xl mb-4">Please create an account to continue.</p>
        <div className='flex space-x-2'>
            <p>Already have an account ?</p>
            <a onClick={()=>navigate('/login')} className="underline font-bold"> Log in</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Registration;
