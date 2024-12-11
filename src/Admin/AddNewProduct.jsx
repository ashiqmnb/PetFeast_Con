import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from './SideBar';
import access from '../assets/access.png';
import { useSelector } from 'react-redux';

const AddNewProduct = () => {


    const {role} = useSelector(state => state.userData);
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState({
        name: '',
        discription: '',
        mrp:'',
        catogory: null,
        price: '',
        rating: ''
    });

    const [ image, setImage] = useState(null);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const validate = ()=>{
        const newErrors = {};
        
        if(!formData.name) newErrors.name = 'name is required';
        if(!formData.discription) newErrors.discription = 'discription is required';
        if(!formData.mrp) newErrors.mrp = 'mrp is required';
        if(!formData.catogory) newErrors.catogory = 'catogory is required';
        if(!formData.price) newErrors.price = 'price is required';
        if(!formData.rating) newErrors.rating = 'rating is required';
        if(formData.mrp < formData.price) newErrors.mrp = 'price must less than mrp'
        if(formData.rating > 5 || formData.rating < 0) newErrors.rating = 'rating should be 0 - 5';
        if(!image) newErrors.image = 'image is required';

        return newErrors;
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const validationErrors = validate();
        
        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors)
        }
        else{
            console.log("product details", formData);
            console.log("image===>", image)
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
                        name='name'
                        value={formData.name}
                        className='w-full p-1 rounded-lg placeholder:text-black'
                        type="text" />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                </div>

                <div className='p-5'>
                    <label className='text-lg font-semibold' htmlFor="">
                        Discription
                    </label><br />
                    <textarea
                        onChange={handleChange}
                        name='discription'
                        value={formData.discription}
                        className='w-full p-1 rounded-lg placeholder:text-black'
                        ></textarea>
                        {errors.discription && <span className="text-red-500 text-sm">{errors.discription}</span>}
                </div>

                <div className='p-5'>
                    <label className='text-lg font-semibold' htmlFor="">
                        Image
                    </label><br />
                    <input
                        onChange={(e)=> setImage(e.target.files[0])}
                        name='image'
                        className='w-full p-1 rounded-lg placeholder:text-black'
                        type="file" />
                        {errors.image && <span className="text-red-500 text-sm">{errors.image}</span>}
                </div>

                


                {/* Category and Rating */}
                <div className='flex '>
                    <div className='p-5 w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            Rating
                        </label><br />
                        <input
                            onChange={handleChange}
                            name='rating'
                            value={formData.rating}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            type="text" />
                        {errors.rating && <span className="text-red-500 text-sm">{errors.rating}</span>}
                    </div>

                    <div className='p-5 w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            Category
                        </label><br />
                        <select
                            onChange={handleChange}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            name='catogory'
                            value={formData.catogory}>

                            <option value={null}>Select Category</option>
                            <option value={1}>Dog Food</option>
                            <option value={2}>Dog Bed</option>
                            <option value={3}>Cat Food</option>
                            <option value={4}>Cat Treat</option>
                        </select>
                        {errors.catogory && <span className="text-red-500 text-sm">{errors.catogory}</span>}
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
                            name='price'
                            value={formData.price}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            type="text" />
                        {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
                    </div>

                    <div className='p-5 w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            MRP
                        </label><br />
                        <input
                            onChange={handleChange}
                            name='mrp'
                            value={formData.mrp}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            type="text" />
                        {errors.mrp && <span className="text-red-500 text-sm">{errors.mrp}</span>}
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