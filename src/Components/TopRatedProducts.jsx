import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const TopRatedProducts = () => {

  const navigate = useNavigate()

  const [products, setProducts] = useState([]);
  // console.log("productss", products)

  useEffect(()=>{
    axios.get('https://localhost:7109/api/Product/TopRatedProducts')
    .then((res) => {
      setProducts(res.data.data)
      // console.log("top rated products", res.data.data)
    })
      .catch((err) => console.log(err))
  },[])
  
  return (
    <div  className='text-center py-14 h-max'>
            <h1 style={{color:'#052560'}} className='font-serif text-3xl font-bold'>Top Rated Products</h1>
            <div className='flex gap-4 flex-wrap justify-center mt-7 px-6'>
                {products.map((item)=>{
                  return(
                    <div key={item.productId} onClick={()=> navigate(`/itemdetails/${item.productId}`)} className='sm:w-72 w-44 rounded-2xl bg-white p-3 shadow-lg text-start '>
                      <img src={item.image} alt={item.name} className='rounded-2xl hover:scale-105 transition-transform'/>
                      <h1 className='font-sans text-lg pt-5'>{item.name}</h1>
                      <h1 className='font-sans text-lg font-bold text-blue-950'>₹ {item.price}</h1>
                    </div>
                  )
                })}
            </div>
    </div>
  )
}

export default TopRatedProducts