import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import access from '../assets/access.png';

const Categories = () => {

    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [dogFiltered, setDogFiltered] = useState([])
    const [catFiltered, setCatFiltered] = useState([])
    const [admin, setAdmin] = useState(false);
    const id = localStorage.getItem('adminId')


    useEffect(()=>{
        axios.get(`http://localhost:5000/items`)
            .then((res)=> setItems(res.data))
            .catch((err)=> console.log("aaa",err))
    },[])

    useEffect(()=>{
        setDogFiltered(items.filter((item, index)=> item.catogory === 'dog-food' || item.catogory === 'dog-beds'))
        setCatFiltered(items.filter((item, index)=> item.catogory === 'cat-food' || item.catogory === 'cat-treat'))
    },[items])

    useEffect(()=>{
        axios.get(`http://localhost:5000/users/${id}`)
            .then((res)=>{
                if(res.data?.isAdmin){
                    setAdmin(true)
                }
            })
            .catch((err)=> console.error(err))
    },[id])


    const handleDogCategory = (category)=>{
        setDogFiltered(items.filter((item, index)=> item.catogory === category))
    }

    const setDogFilteredAll = (category1, category2)=>{
        setDogFiltered(items.filter((item, index)=> item.catogory === category1 || item.catogory === category2))
    }

    const handleCatCategory = (category)=>{
        setCatFiltered(items.filter((item, index)=> item.catogory === category))
    }

    const setCatFilteredAll = (category1, category2)=>{
        setCatFiltered(items.filter((item, index)=> item.catogory === category1 || item.catogory === category2))
    }


  if(!id && !admin){
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
                    onClick={()=>setDogFilteredAll('dog-food','dog-beds')}
                    className='bg-blue-500 p-2 px-3 text-white font-semibold rounded-lg hover:bg-blue-700 transition'>
                        All
                </button>
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

			<div className="space-y-5  max-h-[500px] overflow-auto bg-slate-100 scrollbarHidden">
			{dogFiltered.map((item)=>(
				<div
					onClick={()=> navigate(`/admin/productdetails/${item.id}`)}
					key={item.id}
					className="bg-white flex justify-start items-center p-3 border rounded-lg shadow space-x-2 hover:bg-slate-200">
					<img 
						className="h-20 w-auto" 
						src={item.url} alt="img" />
					<div>
						<h1 className="font-semibold">{item.heading}</h1>
						<p className="font-semibold">Price: $ <span className="font-bold text-green-600">{item.price}</span></p>
						<p className="font-semibold">⭐ {item.rating}</p>
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
                    onClick={()=>setCatFilteredAll('cat-food', 'cat-treat')}
                    className='bg-blue-500 p-2 px-3 text-white font-semibold rounded-lg hover:bg-blue-700 transition'>
                        All
                </button>
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

			<div className="space-y-5  max-h-[500px] overflow-auto bg-slate-100 scrollbarHidden">
			{catFiltered.map((item)=>(
				<div
					onClick={()=> navigate(`/admin/productdetails/${item.id}`)}
					key={item.id}
					className="bg-white flex justify-start items-center p-3 border rounded-lg shadow space-x-2 hover:bg-slate-200">
					<img 
						className="h-20 w-auto" 
						src={item.url} alt="img" />
					<div>
						<h1 className="font-semibold">{item.heading}</h1>
						<p className="font-semibold">Price: $ <span className="font-bold text-green-600">{item.price}</span></p>
						<p className="font-semibold">⭐ {item.rating}</p>
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
