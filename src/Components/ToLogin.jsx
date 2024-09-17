import React from 'react'
import logoBlue from '../assets/logo_blue.png'
import { useNavigate } from 'react-router-dom'

const ToLogin = () => {

  const navigate = useNavigate()

  return (
    <div className='flex justify-center'>
      <div className='text-center bg-white w-5/6 rounded-2xl shadow-xl'>
        <div className=' py-14 flex-colum items-center'>
          <h1 style={{color:'#052560', fontWeight:'700'}} className='font-serif text-3xl'>Login for Better Experience</h1>
          <button style={{backgroundColor:'#052560'}} onClick={()=> navigate('/login')} className='my-6 px-5 py-1 text-xl text-white rounded-full font-serif'>Login</button>
          <div className='flex justify-center'>
            <img className='h-24 w-auto' src={logoBlue} alt="logoBlue" />
          </div>
        </div>
    </div>
    </div>
  )
}

export default ToLogin