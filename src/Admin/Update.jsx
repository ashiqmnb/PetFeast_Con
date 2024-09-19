import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
//   const { id } = useParams(); // Get the product ID from the URL

//   const id = 'e21d';
  const navigate = useNavigate(); // To navigate after the update

  // Initialize the product state with the existing structure
  const [product, setProduct] = useState({
    heading: "",
    description: "",
    url: "",
    category: "",
    price: 0,
    rating: 0,
  });

  const [error, setError] = useState("");

  // Fetch the product data by ID on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:5000/items/2`) // Fetch product from JSON server
      .then((res) => {
        setProduct(res.data); // Set the fetched product data
        console.log(res.data);
        
    })
      .catch((err) => {
        console.error("Error fetching product", err);
        setError("Failed to fetch product");
      });
  }, []);

  // Handle input changes for the form
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission for updating the product
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .put(`http://localhost:5000/products/${id}`, product) // Send the updated data to the server
//       .then((res) => {
//         alert("Product updated successfully");
//         navigate("/products"); // Redirect after update
//       })
//       .catch((err) => {
//         console.error("Error updating product", err);
//         setError("Failed to update product");
//       });
//   };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Update Product</h1>
      {error && <p className="text-red-600">{error}</p>}

      {/* Product Update Form */}
      <form 
        // onSubmit={handleSubmit} 
        className="space-y-4">
        <div>
          <label className="block font-semibold">Product Name</label>
          <input
            type="text"
            name="heading"
            value={product.heading}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Image URL</label>
          <input
            type="text"
            name="url"
            value={product.url}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Rating</label>
          <input
            type="number"
            name="rating"
            max="5"
            min="0"
            value={product.rating}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default Update;
