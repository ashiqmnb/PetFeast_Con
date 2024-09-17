import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import CatHead from './CatHead';
import { useNavigate } from 'react-router-dom';

const CatTrats = () => {

  const navigate = useNavigate()
  
  const [data, setData] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/items')
    .then((res)=>{
      setData(res.data)
    })
      .catch((err)=>console.log(err))
  },[])

//   console.log(data);
  const CatFood = data.filter((item)=> item.catogory == "cat-treat")

  const itemDetails = (id)=>{
    navigate(`/itemdetails/${id}`)
  }

  return (
    <div  className='text-center py-5 h-max md:mt-32 mt-64'>
      <CatHead />
      <div className='flex justify-center mb-8'>
        <hr style={{border: '1px solid rgba(5, 37, 96, 0.3)'}} className=' w-4/5'/>
      </div>
            <h1 style={{color:'#052560'}} className='font-serif text-3xl font-bold'>Treats For Dogs</h1>
            <div className='flex gap-4 flex-wrap justify-center mt-7 px-6'>
                {CatFood.map((item)=>{
                  return(
                    <div key={item.id} onClick={()=> itemDetails(item.id)}  className='sm:w-72 w-44 rounded-2xl bg-white p-3 shadow-lg text-start'>
                      <img src={item.url} alt="item" className='rounded-2xl hover:scale-105 transition-transform'/>
                      <h1 className='font-sans text-lg mt-5 '>{item.heading}</h1>
                      <h1 className='font-sans text-lg font-bold text-blue-950'>$ {item.price}</h1>
                    </div>
                  )
                })}
            </div>
    </div>
  )
}

export default CatTrats