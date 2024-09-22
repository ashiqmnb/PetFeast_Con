import React,{useContext, useState, useEffect, useRef} from "react";
import axios from "axios";
import logo from '../assets/logo.png';
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "./MyContext";

const Navbar = () => {

  const {userId, setUserId} = useContext(MyContext)
  const {userName, setUserName} = useContext(MyContext)
  const navigate = useNavigate()

  // for search items
  const [query, setQuery] = useState(""); // store the search query
  const [items, setItems] = useState([]); // store the items
  const [filteredItems, setFilteredItems] = useState([]); // store the filtered items

  const [cart, setCart] = useState([])



  
  const itemDetails = (e,id)=>{
    navigate(`/itemdetails/${id}`)
    setQuery("")
    
  }

  const handleCart = ()=>{
    if (userId) {
      navigate('/cart')
    }
    else{
      navigate('/login')
    }
  }

  useEffect(()=>{
    setUserId(localStorage.getItem("id"))
    setUserName(localStorage.getItem("username"))
    if(userId){
      axios.get(`http://localhost:5000/users/${userId}`)
      .then((res)=> {
        setCart(res.data.cart);
        // console.log(res.data.cart);
     })
     .catch((err)=>console.error("Error fetching cart:", err))
    }
 },[cart, userId])


  useEffect(() => {
    axios.get("http://localhost:5000/items")
      .then(response => setItems(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Filter the items based on the search query
      setFilteredItems(
        items.filter((item) => item.heading.toLowerCase().includes(query.toLowerCase()))
      );
  }, [query, items]);


  return (
    <div className="fixed top-0 z-50 w-full">

      {/* Search Result Box */}
      <div className="flex justify-center">
            <div 
                style={{display:{filteredItems}? 'hidden' : 'block'}} 
                className="max-h-40 w-2/5 overflow-y-auto text-center  mt-2 scrollbarHidden absolute md:top-24 top-60 flex-col space-y-1">
                {filteredItems.length !== items.length ? (
                  filteredItems.map(item => (
                    <div
                      onClick={(e)=> itemDetails(e,item.id)} 
                      key={item.id}
                      style={{border:'1px solid gray'}}
                      className="p-1 hover:bg-slate-100 bg-white text-black h-max  flex border justify-between"
                      >
                        <img className="h-10 w-auto" src={item.url} alt="img" />
                        <p className="text-sm font-semibold">{item.heading}</p>
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
            <NavLink to={'/dogsitem'} className="text-white hover:text-gray-300">
              Dogs
            </NavLink>
            <NavLink to={'/catsitem'} className="text-white hover:text-gray-300">
              Cats
            </NavLink>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block">
            <input
              style={{width:'270px'}}
              type="text"
              placeholder="Search Items..."
              onChange={e => setQuery(e.target.value)}
              className="px-4 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {/* cart and profile */}
          <div className="flex flex-row justify-center items-center ">
            <div onClick={handleCart} className="mx-8 text-center rounded-2xl p-2 hover:scale-105 transition-transform relative">

              {/* Cart Notification */}
                {(userId && cart.length != 0) ? (
                  <div className="bg-red-600 font-bold text-white rounded-full h-4 w-4 text-xs absolute top-1 left-6">{cart.length}</div>
                ):(null)
                }
                <i class="fa-solid fa-cart-shopping" style={{color:'white'}}></i>
                <p className="text-white">Cart</p>
            </div>

            {/* Conditional Rendering Based On User LoggedIn or Not */}
            {userId ? (
              <div onClick={()=> navigate('/profile')} className="text-center rounded-2xl p-2 hover:scale-110 transition-transform">
                <i class="fa-regular fa-user" style={{color:'white'}}></i>
                <p className="text-white">{userName}</p>
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
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full px-4 py-2 mt-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;