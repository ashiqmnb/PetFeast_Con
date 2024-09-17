import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ItemDetails2 = () => {
  
  	const [item, setItem] = useState({})
  	const [quantity, setQuantity] = useState(1)
  	const userId = localStorage.getItem('user')
  	const navigate = useNavigate()

  	const getCart = async(userId)=>{
  	  const response = await axios.get(`http://localhost:5000/users/${userId}`)
  	  return response.data.cart
  	}

  	const {id} = useParams();

  	const addToCart = async(product, qty)=>{

    	const currentCart = await getCart(userId);
      	const existingProd = currentCart.find((item) => item.id === product.id);
      	let updatedCart;

      	if(existingProd){
      	  updatedCart = currentCart.map((item)=>
      	    item.id === product.id ? {...item, quantity: item.quantity + qty} : item
      	  );
      	}
      	else{
      	  updatedCart = [...currentCart, {...product, quantity: qty}]
      	}

      	axios.patch(`http://localhost:5000/users/${userId}`,{cart: updatedCart})
      	  .then((res)=> console.log(res)
      	  )
      	alert('item added to cart')
  	}

    	useEffect(()=>{
    	    axios.get(`http://localhost:5000/items/${id}`)
    	        .then((res)=> setItem(res.data))
    	        .catch((err)=>console.log(err))
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

          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2 text-lg">Quantity :</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e)=> setQuantity(Number(e.target.value))}
              className="p-2 px-5 border rounded"
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
            </select>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-gray-800 mb-4">
            ${item.price}
          </div>

          {/* COD */}
          <p className="text-lg mb-4 font-semibold text-green-600">Cash On Delivery Available</p>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 h-12">
          <button
            onClick={()=> {
              userId ? (
                addToCart(item,quantity)
              ):(
                navigate('/login')
              )
            }}
            className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
           >
            Add to Cart
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

export default ItemDetails2
