import React,{useState, useEffect} from 'react'
import axios from 'axios';
import SideBar from './SideBar';
import { useNavigate, useParams } from 'react-router-dom';
import access from '../assets/access.png';


const UpdateProduct = () => {

    const {itemId} = useParams();
    const role = localStorage.getItem('role');
 
    const [product, setProduct] = useState({
        Name: '',
        Description: '',
        MRP: null,
        CategoryId: null,
        Price: null,
        Rating: null,
        Stock: null
    });

    const [ Image, setImage] = useState(null);

    const navigate = useNavigate()
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`https://localhost:7109/api/Product/${itemId}`) 
          .then((res) => {
            console.log("____", res.data.data)
            // setProduct(res.data.data);

            let categoryId
            if(res.data.data.categoryName === "dog-food") categoryId = 1;
            else if(res.data.data.categoryName === "dog-beds") categoryId = 2;
            else if(res.data.data.categoryName === "cat-food") categoryId = 3;
            else if(res.data.data.categoryName === "cat-treat") categoryId = 4;

            setProduct({
                Name: res.data.data.name,
                Description: res.data.data.description,
                MRP: res.data.data.mrp,
                CategoryId: categoryId,
                Price: res.data.data.price,
                Rating: res.data.data.rating,
                Stock: res.data.data.stock
            })
            
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
        
        if(!product.Name) newErrors.Name = 'name is required';
        if(!product.Description) newErrors.Description = 'discription is required';
        if(!product.MRP) newErrors.MRP = 'mrp is required';
        if(!product.CategoryId) newErrors.CategoryId = 'catogory is required';
        if(!product.Price) newErrors.Price = 'price is required';
        if(!product.Rating) newErrors.Rating = 'rating is required';
        if(!product.Stock) newErrors.Stock = 'stock is required';
        if(product.Stock < 1) newErrors.Stock = 'stock must greater than 1'
        if(product.MRP < product.Price) newErrors.MRP = 'mrp must greater than price';
        if(product.Rating > 5 || product.Rating < 0) newErrors.Rating = 'rating should be 0 - 5';


        return newErrors;
    }


    // const logFormData = (formData) => {
    //     for (let [key, value] of formData.entries()) {
    //         console.log(`${key}:`, value);
    //     }
    // };


    const HandleUpdateProduct = (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if(Object.keys(validationErrors).length > 0){
            setError(validationErrors)
        }
        else{
            const itemData = new FormData();

            itemData.append("Name", product.Name);
            itemData.append("Description", product.Description);
            itemData.append("Price", product.Price);
            itemData.append("Rating", product.Rating);
            itemData.append("CategoryId", product.CategoryId);
            itemData.append("Stock", product.Stock);
            itemData.append("MRP", product.MRP);

            itemData.append("Image", Image);


            // logFormData(itemData);
            axios.put(`https://localhost:7109/api/Product/UpdateProduct2/${itemId}`,
                itemData,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then((res)=>{
                    console.log("update product",res);
                    alert("Product Updated successfully");
                    navigate(`/admin/productdetails/${itemId}`)
                })
                .catch((err)=>{
                    console.log("add producft err",err)
                }
            );
        }
    };


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
            <h1  style={{color:'#052560'}} className="text-center font-bold text-xl">Update Product</h1>
            
            <form onSubmit={HandleUpdateProduct}>
                <div className='px-5'>
                    <label className='text-lg font-semibold' htmlFor="">
                        Name
                    </label><br />
                    <input
                        onChange={handleChange}
                        name='Name'
                        value={product.Name}
                        className='w-full p-1 rounded-lg placeholder:text-black'
                        type="text" />
                        {error.Name && <span className="text-red-500 text-sm">{error.Name}</span>}
                </div>

                <div className='p-5'>
                    <label className='text-lg font-semibold' htmlFor="">
                        Description
                    </label><br />
                    <textarea
                        onChange={handleChange}
                        name='Description'
                        value={product.Description}
                        className='w-full p-1 rounded-lg placeholder:text-black'
                        ></textarea>
                        {error.Description && <span className="text-red-500 text-sm">{error.Description}</span>}
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
                            {error.Image && <span className="text-red-500 text-sm">{error.Image}</span>}
                    </div>

                    <div className='p-5 w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            Stock
                        </label><br />
                        <input
                            onChange={handleChange}
                            name='Stock'
                            value={product.Stock}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            type="number" />
                        {error.Stock && <span className="text-red-500 text-sm">{error.Stock}</span>}
                    </div>

                </div>


                {/* Category and Rating */}
                <div className='flex '>
                    <div className='p-5 w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            Category
                        </label><br />
                        <select
                            onChange={handleChange}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            name='CategoryId'
                            value={product.CategoryId}>

                            <option value={null}>Select Category</option>
                            <option value={1}>Dog Food</option>
                            <option value={2}>Dog Bed</option>
                            <option value={3}>Cat Food</option>
                            <option value={4}>Cat Treat</option>
                        </select>
                        {error.CategoryId && <span className="text-red-500 text-sm">{error.CategoryId}</span>}
                    </div>

                    <div className='p-5 w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            Rating
                        </label><br />
                        <input
                            onChange={handleChange}
                            name='Rating'
                            value={product.Rating}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            type="number" />
                        {error.Rating && <span className="text-red-500 text-sm">{error.Rating}</span>}
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
                            value={product.Price}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            type="number" />
                        {error.Price && <span className="text-red-500 text-sm">{error.Price}</span>}
                    </div>

                    <div className='p-5 w-1/2'>
                        <label className='text-lg font-semibold' htmlFor="">
                            MRP
                        </label><br />
                        <input
                            onChange={handleChange}
                            name='MRP'
                            value={product.MRP}
                            className='w-full p-1 rounded-lg placeholder:text-black'
                            type="number" />
                        {error.MRP && <span className="text-red-500 text-sm">{error.MRP}</span>}
                    </div>
                </div>

                <div className='flex justify-center'>
                    <button 
                        className="bg-blue-500 p-2 px-3 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        type="submit">
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default UpdateProduct
