import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetails = () => {
  
  	const [item, setItem] = useState({})
  	const navigate = useNavigate()

  	const {id} = useParams();

  	// const addToCart = async(product, qty)=>{

    // 	const currentCart = await getCart(userId);
    //   	const existingProd = currentCart.find((item) => item.id === product.id);
    //   	let updatedCart;

    //   	if(existingProd){
    //   	  updatedCart = currentCart.map((item)=>
    //   	    item.id === product.id ? {...item, quantity: item.quantity + qty} : item
    //   	  );
    //   	}
    //   	else{
    //   	  updatedCart = [...currentCart, {...product, quantity: qty}]
    //   	}

    //   	axios.patch(`http://localhost:5000/users/${userId}`,{cart: updatedCart})
    //   	  .then((res)=> console.log(res)
    //   	  )
    //   	alert('item added to cart')
  	// }

    	useEffect(()=>{
    	    axios.get(`http://localhost:5000/items/${id}`)
    	        .then((res)=> setItem(res.data))
    	        .catch((err)=>console.log("aaa",err))
    	},[id])



        
  return (
    <div className='bg-blue-100 w-full flex items-center p-10 md:mt-24 mt-60'>
        <div  className="w-8/12 mx-auto  p-4 flex gap-2 flex-col md:flex-row shadow-lg rounded-xl border bg-white">
      {/* Product Image and Title */}
      <div className="md:w-1/2 p-4 flex flex-col items-center border rounded-xl">
        <img src={item.url} alt="item" className="md:w-full h-auto w-2/3 object-cover rounded-lg" />
        <h1 className="md:text-2xl text-lg font-semibold font-se mt-4">{item.heading}</h1>
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 p-4 flex flex-col justify-between rounded-xl border">
        <div>
          <p className="md:text-2xl text-lg mb-4">{item.discription}</p>

          {/* Product Rating */}
          <div className="flex items-center mb-4">
            <span className=" text-xl mr-2">⭐{item.rating}</span>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-gray-800 mb-4">
            ${item.price}
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 h-12">
          <button
            className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
           >
            Edit Product
          </button>
          <button
              className="px-5 bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 transition"
              onClick={()=> navigate(-1)}>
              Back
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetails
