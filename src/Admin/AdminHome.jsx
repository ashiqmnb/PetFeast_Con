import axios from "axios";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {

	const [products, setProducts] = useState([]);
	const [users, setUsers] = useState([]);

	const navigate = useNavigate();

	// const toUserDetails = (id)=>{
	// 	navigate(`/userdetails/${id}`)
	// }


	useEffect(()=>{
		axios.get("http://localhost:5000/items")
			.then((res)=> setProducts(res.data))
			.catch((err)=> console.error(err))

		axios.get("http://localhost:5000/users")
			.then((res)=> setUsers(res.data))
			.catch((err)=> console.error("aaaa",err))


	},[users,products])

  return (
    <div className="flex justify-center my-20">
      <div className="w-5/6 space-y-10 md:space-y-0 md:flex block space-x-2">

	    {/* Product Details */}
        <div className=" md:w-1/2 w-full space-y-4 bg-slate-100  border rounded-lg shadow-lg p-2">
			<h1 style={{color:'#052560'}} className="text-center font-bold text-xl">Product Details</h1>
			<div className="space-y-5  max-h-[500px] overflow-auto bg-slate-100 scrollbarHidden">
			{products.map((item, index)=>(
				<div
					onClick={()=> navigate(`/productdetails/${item.id}`)}
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
			<div className="flex justify-center space-x-3">
				<button 
					onClick={()=> navigate("/addnewproduct")}
					className="bg-green-500 p-2 px-3 text-white font-semibold rounded-lg hover:bg-green-700 transition">
					Add New Product
				</button>
				<button 
					onClick={()=> navigate('/productcategory')}
					className="bg-blue-500 p-2 px-3 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
					View By Category
				</button>
			</div>
		</div>




		{/* User Details */}
        <div className="bg-slate-100 rounded-lg shadow-lg border md:w-1/2 w-full space-y-5 p-2">			
			<h1 style={{color:'#052560'}} className="font-bold text-center text-xl">User Details</h1>
			<div className="space-y-5  max-h-[500px] overflow-auto bg-slate-100 scrollbarHidden">
			{users.map((user,index)=>(
				<div 
					key={user.id}
					onClick={()=> navigate(`/userdetails/${user.id}`)}
					className="bg-white flex justify-start items-center p-3 border rounded-lg shadow space-x-3 hover:bg-slate-200">
					<div 
						className=" rounded-full bg-slate-300 py-4 text-center h-14 w-14 font-semibold">
						{user.id}
					</div>
					<div>
						<h1 className="font-semibold text-lg">Full name : {user.fullName}</h1>
						<p className="font-semibold">Email : {user.email}</p>
						<p className="font-semibold text-sm text-gray-600">User Name : {user.username}</p>
					</div>
				</div>
			))}

			</div>
			
		</div>
      </div>
    </div>
  );
};

export default AdminHome;
