import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import access from '../assets/access.png';
import { useSelector } from 'react-redux';


const Categories = () => {

    // const {role} = useSelector(state => state.userData);
    const role = localStorage.getItem('role');

    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [dogFiltered, setDogFiltered] = useState([])
    const [catFiltered, setCatFiltered] = useState([])




    const handleDogCategory = (category)=>{
        setDogFiltered(items.filter((item, index)=> item.categoryName === category))
    }

    const handleCatCategory = (category)=>{
        setCatFiltered(items.filter((item, index)=> item.categoryName === category))
    }


    useEffect(()=>{
        axios.get("https://localhost:7109/api/Product")
        .then((res)=> {
            // console.log("product fetch",res.data.data);
            setItems(res.data.data);
            // handleDogCategory("dog-food");
            // handleCatCategory("cat-food");

            // console.log("dogFiltered",dogFiltered);
            // console.log("catFiltered", catFiltered);
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    useEffect(()=>{
        handleDogCategory("dog-food");
        handleCatCategory("cat-food");

        // console.log("dogFiltered",dogFiltered);
        // console.log("catFiltered", catFiltered);
    },[items])




  if(role !== "Admin"){
      return(
          <div className='flex justify-center'>
              <div className='text-center h-96 w-96 shadow-sm'>
                  <img className='w-96 mt-44' src={access} alt="access denied" />
                  <p className='text-red-500 font-bold text-2xl font-serif'>You don't have permission</p>
                  <p className='text-red-500 font-bold text-2xl font-serif'>to access this page !!</p>
              </div>
          </div>
      )
  }

  return (
    <div className="flex justify-start">
        <div>
            <SideBar />
        </div>


        <div className="flex justify-center my-20 mt-20 md:ms-64  ms-24">
      <div className="w-5/6 space-y-10 md:space-y-0 md:flex block space-x-2">

	    {/* Products for Dogs */}
        <div className="md:w-1/2 w-full space-y-4 bg-slate-100 border rounded-lg shadow-lg p-2">
			<h1 style={{color:'#052560'}} className="text-center font-bold text-xl">Products for Dogs</h1>
            
            {/* Navigation Buttons */}
            <div className='flex justify-center space-x-3'>
                <button
                    onClick={()=> handleDogCategory('dog-food')}
                    className='bg-blue-500 p-2 px-3 text-white font-semibold rounded-lg hover:bg-blue-700 transition'>
                        Food
                </button>
                <button 
                    onClick={()=> handleDogCategory('dog-beds')}
                    className='bg-blue-500 p-2 px-3 text-white font-semibold rounded-lg hover:bg-blue-700 transition'>
                        Bed
                </button>
            </div>

			<div className="space-y-5 min-w-[500] max-h-[500px] overflow-auto bg-slate-100 scrollbarHidden">
			{dogFiltered.map((item)=>(
				<div
					onClick={()=> navigate(`/admin/productdetails/${item.productId}`)}
					key={item.productId}
					className="bg-white min-w-[490] flex justify-start items-center p-3 border rounded-lg shadow space-x-2 hover:bg-slate-200">
					<img 
						className="h-20 w-auto" 
						src={item.image} alt="img" />
					<div>
						<h1 className="font-semibold">{item.name}</h1>
						<p className="font-semibold">Price: $ <span className="font-bold text-green-600">{item.price}</span></p>
						<p className="font-semibold">⭐ {item.rating}</p>

                        {item.stock <= 5 && (
                            <span className="text-red-500 text-base font-semibold">Only few stock left...!!</span>
                        )}

					</div>
				</div>
			))}
			</div>
		</div>




		{/* Products for Cats */}
        <div className="md:w-1/2 w-full space-y-4 bg-slate-100 border rounded-lg shadow-lg p-2">
			<h1 style={{color:'#052560'}} className="font-bold text-center text-xl">Products for Cats</h1>

            {/* Navigation Buttons */}
            <div className='flex justify-center space-x-3'>

                <button
                    onClick={()=> handleCatCategory('cat-food')}
                    className='bg-blue-500 p-2 px-3 text-white font-semibold rounded-lg hover:bg-blue-700 transition'>
                        Food
                </button>
                <button 
                    onClick={()=> handleCatCategory('cat-treat')}
                    className='bg-blue-500 p-2 px-3 text-white font-semibold rounded-lg hover:bg-blue-700 transition'>
                        Treat
                </button>
            </div>

			<div className="space-y-5 min-w-[500]  max-h-[500px] max-w-[510] overflow-auto bg-slate-100 scrollbarHidden">
			{catFiltered.map((item)=>(
				<div
					onClick={()=> navigate(`/admin/productdetails/${item.productId}`)}
					key={item.productId}
					className="bg-white min-w-[490] flex justify-start items-center p-3 border rounded-lg shadow space-x-2 hover:bg-slate-200">
					<img 
						className="h-20 w-auto" 
						src={item.image} alt="img" />
					<div>
						<h1 className="font-semibold max-w-[380] min-w-[380]">{item.name}</h1>
						<p className="font-semibold">Price: $ <span className="font-bold text-green-600">{item.price}</span></p>
						<p className="font-semibold">⭐ {item.rating}</p>

                        {item.stock <= 5 && (
                            <span className="text-red-500 text-base font-semibold">Only few stock left</span>
                        )}



					</div>
				</div>
			))}
			</div>
		</div>
        
      </div>
    </div>
    </div>
  )
}

export default Categories
