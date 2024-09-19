import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const TopRatedProducts = () => {

  const navigate = useNavigate()

  const [data, setData] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/items')
    .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  },[])

  const topRatedProducts = data.filter((item)=> item.rating > 4)
  
  return (
    <div  className='text-center py-14 h-max'>
            <h1 style={{color:'#052560'}} className='font-serif text-3xl font-bold'>Top Rated Products</h1>
            <div className='flex gap-4 flex-wrap justify-center mt-7 px-6'>
                {topRatedProducts.map((item)=>{
                  return(
                    <div key={item.id} onClick={()=> navigate(`/itemdetails/${item.id}`)} className='sm:w-72 w-44 rounded-2xl bg-white p-3 shadow-lg text-start '>
                      <img src={item.url} alt="item" className='rounded-2xl hover:scale-105 transition-transform'/>
                      <h1 className='font-sans text-lg pt-5'>{item.heading}</h1>
                      <h1 className='font-sans text-lg font-bold text-blue-950'>$ {item.price}</h1>
                    </div>
                  )
                })}
            </div>
    </div>
  )
}

export default TopRatedProducts