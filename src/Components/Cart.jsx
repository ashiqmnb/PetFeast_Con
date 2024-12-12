import React, { useEffect, useState } from 'react';
import { MdRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { fetchCart, 
        incrementQuantity, 
        decrementQuantity,
        removeFromCart, 
        removeAllItems} from '../Redux/Slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux';
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import axios from 'axios';
import { fetchWishlist } from '../Redux/Slices/WishlistSlice';



const Cart = () => {

  const {cart} = useSelector(state => state.cart);
  const {totalItems} = useSelector(state => state.cart);
  const {totalPrice} = useSelector(state => state.cart);

  // handle out of stock indicaters
  const [ items, setItems ] = useState([]);
  const [errors, setErrors] = useState([]);
  //

  const chechStock = ()=>{
    let updatedErrors = [...errors];
    cart.forEach((cartItem, index) => {
      const product = items.find(p => p.productId === cartItem.productId);

      if(product){
        updatedErrors[index] = cartItem.quantity <= product.stock;
      }
    });
    setErrors(updatedErrors);
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleIncrementQuantity = async (id, qty)=>{
    if(qty == 10){
      alert("Maximum quantity limit reached..!!")
    }
    else{
      await dispatch(incrementQuantity(id));
      await chechStock();
    }
  }

  const handleDecrementQuantity = async (id)=>{
    await dispatch(decrementQuantity(id));
    await chechStock();
  }

  const handleRemoveFromCart = async (id)=>{
    await dispatch(removeFromCart(id));
    await chechStock();
  }

  const calculateDiscount = () => {
    return totalPrice * 0.1;
  };

  const calculateFinalPrice = () => {
    return totalPrice - calculateDiscount();
  };

  const handlePlaceOrder = () => {
    if(cart.length > 0){

      const allInStock = errors.every(error => error === true);

      if(allInStock){
        navigate('/payment')
      }
      else{
        alert("Product is out of stock")
      }
    }
    else{
      alert("Your Cart is Empty")
    }
  };

  useEffect(()=>{
    dispatch(fetchWishlist());
    dispatch(fetchCart());
  },[])

  useEffect(()=>{
    axios.get("https://localhost:7109/api/Product")
      .then((res)=>{
        // console.log("ress",res.data.data);
        setItems(res.data.data)
        console.log("itemsss", items)
      })
    chechStock();
  },[])

  useEffect(()=>{
    chechStock();
    console.log("checck stock",errors)
  },[cart, items])
 
  return (
        <div className="container mx-auto mb-24 p-4 flex justify-center flex-col md:flex-row gap-5 md:mt-44 mt-72">
      {/* Cart Items */}
      <div style={{}} className="md:w-3/6 md:max-h-[400px] overflow-auto bg-white shadow-lg rounded-lg p-4 scrollbarHidden">
        <h2 style={{color:'#052560'}} className="text-2xl font-bold mb-4">Shopping Cart</h2>
        
        {cart.length === 0 ? (
          <div className='flex flex-col items-center text-center bg-gray-100 p-10 rounded-lg space-y-3'>
            <MdRemoveShoppingCart className='h-14 w-14'/>
            <p style={{color:'#052560'}} className='font-semibold text-xl'>Cart is Empty</p>
          </div>
          ):(null)
        }

        {cart.map((item, index) => (
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

              {/* out of stock indcator */}
              {!errors[index] && (
                  <span className="text-red-500 text-base font-semibold">Out Of Stock</span>
              )}
              
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


        {/* Buttons */}
        <div className='flex space-x-2'>
          <button
            onClick={()=> navigate('/')}
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-800 transition"
            >
            Add Products to Your Cart
          </button>
        
          {cart.length !== 0 ? (
            <button
              onClick={()=> dispatch(removeAllItems())}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Remove All Items
            </button>
          ):(null)}
          
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length !== 0 ? (
        <div className="md:w-2/6 bg-white shadow-lg rounded-lg p-4">
        <h2 style={{color:'#052560'}} className="text-2xl font-bold mb-4">Cart Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total Price:</span>
          <span>₹ {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Discount:</span>
          <span>₹ -{calculateDiscount().toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Final Price:</span>
          <span>₹ {calculateFinalPrice().toFixed(2)}</span>
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
