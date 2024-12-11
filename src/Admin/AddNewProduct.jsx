import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from './SideBar';
import access from '../assets/access.png';
import { useSelector } from 'react-redux';

const AddNewProduct = () => {


    // const {role} = useSelector(state => state.userData);
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState({
        Name: '',
        Description: '',
        MRP: null,
        CategoryId: null,
        Price: null,
        Rating: null,
        Stock: null
    });

    const [ Image, setImage] = useState(null);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const validate = ()=>{
        const newErrors = {};
        
        if(!formData.Name) newErrors.Name = 'name is required';
        if(!formData.Description) newErrors.Description = 'discription is required';
        if(!formData.MRP) newErrors.MRP = 'mrp is required';
        if(!formData.CategoryId) newErrors.CategoryId = 'catogory is required';
        if(!formData.Price) newErrors.Price = 'price is required';
        if(!formData.Rating) newErrors.Rating = 'rating is required';
        if(!formData.Stock) newErrors.Stock = 'stock is required';
        if(formData.Stock < 1) newErrors.Stock = 'stock must greater than 1'
        if(formData.MRP < formData.Price) newErrors.MRP = 'mrp must greater than price';
        if(formData.Rating > 5 || formData.Rating < 0) newErrors.Rating = 'rating should be 0 - 5';
        if(!Image) newErrors.Image = 'image is required';

        return newErrors;
    }

    const logFormData = (formData) => {
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        const validationErrors = validate();
        
        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors)
        }
        else{

            const itemData = new FormData();

            itemData.append("Name", formData.Name);
            itemData.append("Description", formData.Description);
            itemData.append("Price", formData.Price);
            itemData.append("Rating", formData.Rating);
            itemData.append("CategoryId", formData.CategoryId);
            itemData.append("Stock", formData.Stock);
            itemData.append("MRP", formData.MRP);

            itemData.append("Image", Image);


            // logFormData(itemData);

            axios.post('https://localhost:7109/api/Product/AddProduct',
                itemData,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then((res)=>{
                    console.log("add producft",res);
                    alert("Product added successfully");
                    navigate('/admin/categories');
                })
                .catch((err)=>{
                    console.log("add producft err",err)
                })
        }
    }


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
    <div>
        <div>
            <SideBar />
        </div>


        <div className="flex justify-center my-20  mt-20 md:ms-64  ms-24">
        <div className="md:w-3/6 w-5/6 bg-slate-200 py-5 rounded-lg shadow-lg">
            <h1  style={{color:'#052560'}} className="text-center font-bold text-xl">Add New Product</h1>
            
            <form onSubmit={handleSubmit}>
                <div className='px-5'>
                    <label className='text-lg font-semibold' htmlFor="">
                        Name
                    </label><br />
                    <input
                        onChange={handleChange}
                        name='Name'
                        value={formData.Name}
                        className='w-full p-1 rounded-lg placeholder:text-black'
                        type="text" />
                        {errors.Name && <span className="text-red-500 text-sm">{errors.Name}</span>}
                </div>

                <div className='p-5'>
                    <label className='text-lg font-semibold' htmlFor="">
                        Discription
                    </label><br />
                    <textarea
                        onChange={handleChange}
                        name='Description'
                        value={formData.Description}
                        className='w-full p-1 rounded-lg placeholder:text-black'
                        ></textarea>
                        {errors.Description && <span className="text-red-500 text-sm">{errors.Description}</span>}
                </div>


                {/* Image and stock */}
                <div className='flex '>
                    <div className='p-5 w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            Image
                        </label><br />
                        <input
                            onChange={(e)=> setImage(e.target.files[0])}
                            name='Image'
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            type="file" />
                            {errors.Image && <span className="text-red-500 text-sm">{errors.Image}</span>}
                    </div>

                    <div className='p-5 w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            Stock
                        </label><br />
                        <input
                            onChange={handleChange}
                            name='Stock'
                            value={formData.Stock}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            type="number" />
                        {errors.Stock && <span className="text-red-500 text-sm">{errors.Stock}</span>}
                    </div>

                </div>

                


                {/* Category and Rating */}
                <div className='flex '>
                    <div className='p-5 w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            Rating
                        </label><br />
                        <input
                            onChange={handleChange}
                            name='Rating'
                            value={formData.Rating}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            type="number" />
                        {errors.Rating && <span className="text-red-500 text-sm">{errors.Rating}</span>}
                    </div>

                    <div className='p-5 w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            Category
                        </label><br />
                        <select
                            onChange={handleChange}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            name='CategoryId'
                            value={formData.CategoryId}>

                            <option value={null}>Select Category</option>
                            <option value={1}>Dog Food</option>
                            <option value={2}>Dog Bed</option>
                            <option value={3}>Cat Food</option>
                            <option value={4}>Cat Treat</option>
                        </select>
                        {errors.CategoryId && <span className="text-red-500 text-sm">{errors.CategoryId}</span>}
                    </div>
                </div>

                {/* Price and MRP */}
                <div className='flex '>
                    <div className='p-5 w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            Price
                        </label><br />
                        <input
                            onChange={handleChange}
                            name='Price'
                            value={formData.Price}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            type="number" />
                        {errors.Price && <span className="text-red-500 text-sm">{errors.Price}</span>}
                    </div>

                    <div className='p-5 w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            MRP
                        </label><br />
                        <input
                            onChange={handleChange}
                            name='MRP'
                            value={formData.MRP}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            type="number" />
                        {errors.MRP && <span className="text-red-500 text-sm">{errors.MRP}</span>}
                    </div>
                </div>

                <div className='flex justify-center'>
                    <button 
                        className="bg-green-500 p-2 px-3 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                        type="submit">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default AddNewProduct