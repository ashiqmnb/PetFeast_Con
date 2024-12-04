import React, { useEffect, useState } from 'react';
import { MdRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { fetchCart, 
        incrementQuantity, 
        decrementQuantity,
        removeFromCart } from '../Redux/Slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux';
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";



const Cart = () => {

  const cartRe = useSelector(state => state.cart.cart)

  const dispatch = useDispatch()

  const handleIncrementQuantity = (id, qty)=>{
    if(qty == 10){
      alert("Maximum quantity limit reached..!!")
    }
    else{
      dispatch(incrementQuantity(id));
    }
  }

  const handleDecrementQuantity = (id)=>{
    dispatch(decrementQuantity(id));
  }

  const handleRemoveFromCart = (id)=>{
    dispatch(removeFromCart(id));
  }

  
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  const calculateTotalPrice = () => {
    return cartRe.reduce((total, item) => total + item.price * Number(item.quantity), 0);
  };

  const calculateDiscount = () => {
    return calculateTotalPrice() * 0.1;
  };

  const calculateFinalPrice = () => {
    return calculateTotalPrice() - calculateDiscount();
  };

  const handlePlaceOrder = () => {
    if(cartRe.length > 0 ){
      navigate('/payment')
      console.log('Proceeding to checkout');
    }
    else{
      alert("Your Cart is Empty")
    }
  };

  useEffect(()=>{
    dispatch(fetchCart());
    console.log("cart from comp",cartRe)
  },[])
 
  return (
        <div className="container mx-auto mb-24 p-4 flex justify-center flex-col md:flex-row gap-5 md:mt-44 mt-72">
      {/* Cart Items */}
      <div style={{}} className="md:w-3/6 md:max-h-[400px] overflow-auto bg-white shadow-lg rounded-lg p-4 scrollbarHidden">
        <h2 style={{color:'#052560'}} className="text-2xl font-bold mb-4">Shopping Cart</h2>
        
        {cartRe.length === 0 ? (
          <div className='flex flex-col items-center text-center bg-gray-100 p-10 rounded-lg space-y-3'>
            <MdRemoveShoppingCart className='h-14 w-14'/>
            <p style={{color:'#052560'}} className='font-semibold text-xl'>Cart is Empty</p>
          </div>
          ):(null)
        }

        {cartRe.map((item) => (
          <div key={item.productId} className="flex items-center justify-between border-b py-4">
            <img onClick={()=>navigate(`/itemdetails/${item.productId}`)} src={item.image  } alt={item.productName} className="w-20 h-20 object-cover rounded-lg hover:scale-110 transition-transform" />
            <div className="flex-1 ml-4 space-y-2">
              <h3 className="text-xl font-semibold">{item.productName}</h3>

              {/* Quantity , increment and decrement buttons */}
              <span className='flex space-x-1 align-middle'>
                <span className='text-base'>Quantity:</span>
                <div className='text-lg relative top-1 hover:scale-105 transition-transform cursor-pointer' onClick={()=>handleDecrementQuantity(item.productId)} ><CiSquareMinus /></div>
                <span className='text-lg font-bold'>{item.quantity}</span>
                <div className='text-lg relative top-1 hover:scale-105 transition-transform cursor-pointer' onClick={()=>handleIncrementQuantity(item.productId, item.quantity)}><CiSquarePlus /></div>
              </span>

              <p className="text-gray-800 font-bold">Total: ₹ {(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button
              onClick={()=>handleRemoveFromCart(item.productId)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
          
        ))}
        <button
              onClick={()=> navigate('/')}
              className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
              >
              Add Products to Your Cart
            </button>
      </div>

      {/* Cart Summary */}
      {cartRe.length !== 0 ? (
        <div className="md:w-2/6 bg-white shadow-lg rounded-lg p-4">
        <h2 style={{color:'#052560'}} className="text-2xl font-bold mb-4">Cart Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Total Items:</span>
          <span>{cartRe.length}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total Price:</span>
          <span>${calculateTotalPrice().toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Discount:</span>
          <span>-${calculateDiscount().toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Final Price:</span>
          <span>${calculateFinalPrice().toFixed(2)}</span>
        </div>
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </div>
      ):(null)}
    </div>
  );
};

export default Cart;
