import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import DogHead from './DogHead';
import { useNavigate } from 'react-router-dom';

const DogBeds = () => {

  const navigate = useNavigate()
    
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    axios.get('https://localhost:7109/api/Product/productByCategory?categoryId=2')
    .then((res)=>{
      setProducts(res.data.data)
    })
      .catch((err)=>console.log(err))
  },[])


  const itemDetails = (id)=>{
    navigate(`/itemdetails/${id}`)
  }


  return (
    <div  className='text-center py-5 h-max md:mt-32 mt-64'>
      <DogHead />
      <div className='flex justify-center mb-8'>
        <hr style={{border: '1px solid rgba(5, 37, 96, 0.3)'}} className=' w-4/5'/>
      </div>
            <h1 style={{color:'#052560'}} className='font-serif text-3xl font-bold'>Beds For Dogs</h1>
            <div className='flex gap-4 flex-wrap justify-center mt-7 px-6'>
                {products.map((item)=>{
                  return(
                    <div key={item.productId} onClick={()=> itemDetails(item.productId)} className='sm:w-72 w-44 rounded-2xl bg-white p-3 shadow-lg text-start '>
                      <img src={item.image} alt="item" className='rounded-2xl hover:scale-105 transition-transform'/>
                      <h1 className='font-sans text-lg '>{item.name}</h1>
                      <h1 className='font-sans text-lg font-bold text-blue-950'>₹ {item.price}</h1>
                    </div>
                  )
                })}
            </div>
    </div>
  )
}

export default DogBeds