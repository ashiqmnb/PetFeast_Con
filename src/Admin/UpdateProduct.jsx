import React,{useState, useEffect} from 'react'
import axios from 'axios';
import SideBar from './SideBar';
import { useNavigate, useParams } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const UpdateProduct = () => {

    const {id} = useParams()
 
    const [product, setProduct] = useState({
        heading: "",
        discription: "",
        url: "",
        catogory: "",
        price: 0,
        rating: 0,
    });

    const navigate = useNavigate()
    const [error, setError] = useState("");

    useEffect(() => {
        axios
          .get(`http://localhost:5000/items/${id}`) // Fetch product from JSON server
          .then((res) => {
            setProduct(res.data); // Set the fetched product data
            console.log(res.data);
            
        })
          .catch((err) => {
            console.error("Error fetching product", err);
            setError("Failed to fetch product");
          });
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };


    const validate = ()=>{
        const newErrors = {};
        
        if(!product.heading) newErrors.heading = 'heading is required';
        if(!product.discription) newErrors.discription = 'discription is required';
        if(!product.url) newErrors.url = 'image url is required';
        if(!product.catogory) newErrors.catogory = 'catogory is required';
        if(!product.price) newErrors.price = 'price is required';
        if(!product.rating) newErrors.rating = 'rating is required';
        if(product.rating > 5 || product.rating < 0) newErrors.rating = 'rating should be 0 - 5';

        return newErrors;
    }


//   Handle form submission for updating the product
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if(Object.keys(validationErrors).length > 0){
            setError(validationErrors)
        }
        else{
            axios.put(`http://localhost:5000/items/${id}`, product) // Send the updated data to the server
            .then((res) => {
                alert("Product updated successfully");
                // toast.success("Product Updated")
                console.log(id);
                
                navigate(`/admin/productdetails/${id}`,{ replace: true }); // Redirect after update
                // navigate(`/admin/home`);
            })
            .catch((err) => {
                console.error("Error updating product", err);
                setError("Failed to update product");
            });
        }
    };


  return (
    <div>
        <div>
            <SideBar />
        </div>

        <div className="flex justify-center my-20  mt-20 md:ms-64  ms-24">
        <div className="md:w-3/6 w-5/6 bg-slate-200 py-5 rounded-lg shadow-lg">
            <h1  style={{color:'#052560'}} className="text-center font-bold text-xl">Update Product</h1>
            
            <form onSubmit={handleSubmit}>
                <div className='px-5'>
                    <label className='text-lg font-semibold' htmlFor="">
                        Heading
                    </label><br />
                    <input
                        onChange={handleChange}
                        name='heading'
                        value={product.heading}
                        className='w-full p-1 rounded-lg placeholder:text-black'
                        type="text" />
                        {error.heading && <span className="text-red-500 text-sm">{error.heading}</span>}
                </div>

                <div className='p-5'>
                    <label className='text-lg font-semibold' htmlFor="">
                        Discription
                    </label><br />
                    <textarea
                        onChange={handleChange}
                        name='discription'
                        value={product.discription}
                        className='w-full p-1 rounded-lg placeholder:text-black'
                        ></textarea>
                        {error.discription && <span className="text-red-500 text-sm">{error.discription}</span>}
                </div>

                <div className='p-5'>
                    <label className='text-lg font-semibold' htmlFor="">
                        Image Url
                    </label><br />
                    <input
                        onChange={handleChange}
                        name='url'
                        value={product.url}
                        className='w-full p-1 rounded-lg placeholder:text-black'
                        type="text" />
                        {error.url && <span className="text-red-500 text-sm">{error.url}</span>}
                </div>

                {/* Image and Category */}
                <div className='flex justify-between p-5'>
                    <div className='w-1/2'>
                        <img className='h-20 rounded-lg' src={product.url} alt="" />
                    </div>
                    <div className='w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            Category
                        </label><br />
                        <select
                            onChange={handleChange}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            name='catogory'
                            value={product.catogory}>

                            <option value={''}>Select Category</option>
                            <option value={'dog-food'}>Dog Food</option>
                            <option value={'dog-beds'}>Dog Bed</option>
                            <option value={'cat-food'}>Cat Food</option>
                            <option value={'cat-treat'}>Cat Treat</option>
                        </select>
                        {error.catogory && <span className="text-red-500 text-sm">{error.catogory}</span>}
                    </div>
                </div>

                {/* Price and Rating */}
                <div className='flex '>
                    <div className='p-5 w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            Price
                        </label><br />
                        <input
                            onChange={handleChange}
                            name='price'
                            value={product.price}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            type="text" />
                        {error.price && <span className="text-red-500 text-sm">{error.price}</span>}
                    </div>

                    <div className='p-5 w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            Rating
                        </label><br />
                        <input
                            onChange={handleChange}
                            name='rating'
                            value={product.rating}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            type="text" />
                        {error.rating && <span className="text-red-500 text-sm">{error.rating}</span>}
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
    {/* <ToastContainer /> */}  
    </div>
  )
}

export default UpdateProduct
