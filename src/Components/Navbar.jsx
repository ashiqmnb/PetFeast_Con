import React,{  useContext, useState, useEffect } from "react";
import axios from "axios";
import logo from '../assets/logo.png';
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "./MyContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../Redux/Slices/cartSlice";


const Navbar = () => {

  const {cart} = useSelector(state => state.cart);
  const {wishlist} = useSelector(state => state.wishlist);
  const loginStatus = localStorage.getItem("name");


  const navigate = useNavigate();
  const dispatch = useDispatch();

  // for search items
  const [query, setQuery] = useState(""); // store the search query
  const [filteredItems, setFilteredItems] = useState([]); // store the filtered items


  const itemDetails = (e,id)=>{
    navigate(`/itemdetails/${id}`);
    setQuery("");
    setFilteredItems([])
  }

  const handleCart = ()=>{
    if (loginStatus) navigate('/cart');
    else navigate('/login');
  }

  const handleWishlist = ()=>{
    if(loginStatus) navigate('/wishlist');
    else navigate('/login');
  }

  useEffect(() => {
    // Filter the items based on the search query
    if(query.length > 0){
      axios.get(`https://localhost:7109/api/Product/SearchProduct?search=${query}`)
      .then((res)=>{
        // console.log("search res", res.data.data);
       setFilteredItems(res.data.data);
      })
    }
    else{
      setFilteredItems([]);
    }
  }, [query]);

  useEffect(()=>{
    if(loginStatus){
      dispatch(fetchCart());
    }
  },[])


  return (
    <div className="fixed top-0 z-50 w-full">

      {/* Search Result Box */}
      <div className="flex justify-center">
            <div 
                style={{display:{filteredItems}? 'hidden' : 'block'}} 
                className="max-h-40 w-2/5 overflow-y-auto text-center  mt-2 scrollbarHidden absolute md:top-24 top-60 flex-col space-y-1">
                {filteredItems.length != 0 ? (
                  filteredItems.map(item => (
                    <div
                      onClick={(e)=> itemDetails(e,item.productId)} 
                      key={item.productId}
                      style={{border:'1px solid gray'}}
                      className="p-1 hover:bg-blue-100 bg-white text-black h-max flex border justify-between"
                      >
                        <img className="h-10 w-auto" src={item.image} alt="img" />
                        <p className="text-sm font-semibold">{item.name}</p>
                    </div>
                    ))
                    ) : ( null )
                }
            </div>
        </div>

      <nav style={{ backgroundColor: "#052560" }} className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-white font-bold text-xl">


            {/* {userRe.id ? <p>Logged In : {userRe.id}</p> : <p>Logged Out</p>} */}

            <img 
              onClick={()=> navigate('/')}
              className="h-12 w-auto hover:scale-105 transition-transform" 
              src={logo} alt="" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4 font-semibold">
            <NavLink to={'/'} className="text-white hover:text-gray-300">
              Home
            </NavLink>
            <NavLink to={'/dogsitem/food'} className="text-white hover:text-gray-300">
              Dogs
            </NavLink>
            <NavLink to={'/catsitem/food'} className="text-white hover:text-gray-300">
              Cats
            </NavLink>
            
          </div>

          {/* Search Bar */}
          <div className="hidden md:block">
            <input
              style={{width:'270px'}}
              value={query}
              type="text"
              placeholder="Search Items..."
              onChange={e => setQuery(e.target.value)}
              className="px-4 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* cart and profile */}
          <div className="flex flex-row justify-center items-center ">

            {/* Wishlist Icon */}
            <div onClick={handleWishlist} className="text-center rounded-2xl  hover:scale-105 transition-transform relative">
                {(loginStatus && wishlist.length != 0) ? (
                  <div className="bg-red-600 font-bold text-white rounded-full h-4 w-4 text-xs absolute bottom-9 right-1">{wishlist.length}</div>
                ):(null)
                }
                <i class="fa-solid fa-heart text-xl" style={{color:'white'}}></i>
                <p className="text-white">Wishlist</p>
            </div>

            <div onClick={handleCart} className="mx-8 text-center rounded-2xl p-2 hover:scale-105 transition-transform relative">
              {/* Cart Notification */}
                {(loginStatus && cart.length != 0) ? (
                  <div className="bg-red-600 font-bold text-white rounded-full h-4 w-4 text-xs absolute top-1 left-6">{cart.length}</div>
                ):(null)
                }
                <i class="fa-solid fa-cart-shopping" style={{color:'white'}}></i>
                <p className="text-white" >Cart</p>
            </div>

            {/* Conditional Rendering Based On User LoggedIn or Not */}
            {loginStatus ? (
              <div onClick={()=> navigate('/profile')} className="text-center rounded-2xl p-2 hover:scale-110 transition-transform">
                <i class="fa-regular fa-user" style={{color:'white'}}></i>
                <p className="text-white">Profile</p>
              </div>
              ):(
              <div onClick={()=> navigate('/login')} className="text-center rounded-2xl p-2 hover:scale-110 transition-transform">
                <i class="fa-regular fa-user" style={{color:'white'}}></i>
                <p className="text-white">LogIn</p>
              </div>
              )
          }
          </div>
        </div>

        {/* Mobile Menu Links*/}
        <div className="md:hidden mt-1 text-center font-semibold">
          <NavLink to={'/'} className="block text-white mb-2 hover:text-gray-300">
            Home
          </NavLink>
          <NavLink to={'/dogsitem'} className="block text-white mb-2 hover:text-gray-300">
            Dogs
          </NavLink>
          <NavLink to={'/catsitem'} className="block text-white mb-2 hover:text-gray-300">
            Cats
          </NavLink>
          <div>
            <input
              type="text"
              placeholder="Search Items..."
              // onChange={(e) => setQuery(e.target.value)}
              className="block w-full px-4 py-2 mt-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;