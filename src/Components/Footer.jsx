import React from "react";
import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate()
  
  return (
    <footer className="bg-gray-800 text-white pb-5">
      <div className="container mx-auto flex flex-col md:flex-row justify-evenly items-center p-5">
        {/* Logo or Brand Name */}
        <div className="mb-4 md:mb-0 text-center space-y-3 ">
          <img className="h-24" src={logo} alt="logo" />
          <p className="text-center font-serif font-semibold">Fuel Their Play, Feed Their Love</p>
        </div>

        {/* linkss main div */}
        <div className="flex">
          {/* Shortcut Links */}
        <div className="px-5 text-center mt-5">
          <h1 className="font-semibold text-xl">Shortcut Links</h1>
          <a
            onClick={()=>navigate('/')}
            className="hover:underline font-mono text-blue-300">
            Home
          </a><br />
          <a
            onClick={()=>navigate('/catsitem')}
           className="hover:underline font-mono text-blue-300">
            Cats
          </a><br />
          <a 
            onClick={()=>navigate('/dogsitem')}
            className="hover:underline font-mono text-blue-300">
            Dogs
          </a>
        </div>

        {/* About Your Pets */}
        <div className="px-5 text-center mt-5">
          <h1 className="font-semibold text-xl">About Your Pets</h1>
          <a
            className="hover:underline font-mono text-blue-300">
            Pets Grooming
          </a><br />
          <a
           className="hover:underline font-mono text-blue-300">
            Pet insurance
          </a><br />
          <a 
            className="hover:underline font-mono text-blue-300">
            Veterinary surgeries
          </a><br />
          <a 
            className="hover:underline font-mono text-blue-300">
            Free kids workshops
          </a>

        </div>
        </div>
        {/* Email js */}
         
      </div>

      <div className="container mx-auto text-center mt-8 text-sm text-blue-300">
        <p>&copy; 2024 PetFeast. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;



// flex-col items-center gap-4 mb-4 md:mb-0