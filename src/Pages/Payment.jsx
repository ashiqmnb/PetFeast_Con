import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../Redux/Slices/AddressSlice";
import { fetchCart } from "../Redux/Slices/cartSlice";
import { fetchWishlist } from "../Redux/Slices/WishlistSlice";



const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


const Payment = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate();

  const {totalPrice} = useSelector(state => state.cart);
  const {address} = useSelector(state => state.address);
  
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleDropdownChange = (event) => {
    const selectedId = Number(event.target.value);
    const selectedAddr = address.find((addr) => addr.addressId === selectedId);
    setSelectedAddress(selectedAddr);
  };


  const calculateDiscount = () => {
    return totalPrice* 0.1;
  };
  const calculateFinalPrice = () => {
    return totalPrice - calculateDiscount();
  };

  const [raz, setRaz] = useState(null);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  // handleConfirmPayment
  const handleConfirmPayment = async (values)=>{

    // check razorpay script is loaded
    if(!isRazorpayLoaded){
      const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      setIsRazorpayLoaded(scriptLoaded);

      if(!scriptLoaded){
        alert("Failed to load payment gateway. Please try again later");
        return;
      }
    }

    // check address is selected
    if (!selectedAddress) {
      alert("Select an address ");
      return;
    }

    try{
      // create order id
      const res = await axios.post(`https://localhost:7109/api/Order/CreateOrder?price=${totalPrice}`,
        {},
        {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      
      const orderId = res.data.data;
      console.log("order id", orderId);

      // add razorpay options
      const options = {
        key: "rzp_test_5ePU4l3xfvzrx2", // Razorpay API key
        amount: totalPrice * 100, // amount in paise
        currency: "INR",
        name: "PetFeast",
        description: "Order Payment",
        order_id: orderId,
        handler: async function (response) {
          console.log("options==>",response);

          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          };

          setRaz(paymentData);

          try{
            // console.log("111111111111");
            await axios.post("https://localhost:7109/api/Order/Payment",
              paymentData,
              {
                headers:{
                  Authorization: `Bearer ${localStorage.getItem("token")}`
                }
              });
              
            // console.log("222222222222");
            await axios.post("https://localhost:7109/api/Order/PlaceOrder",
              {
                addressId: selectedAddress.addressId,
                totalPrice: totalPrice,
                orderString: response.razorpay_order_id,
                transactionId: response.razorpay_payment_id
              },
              {
                headers:{
                  Authorization: `Bearer ${localStorage.getItem("token")}`
                }
              });

                alert("Order placed successfully!");
                dispatch(fetchCart());
                navigate('/');
          }
          catch(error){
            console.log("==>",error.response)
            alert(error.response.data.error)
          }
        },
        // prefill:{
        //   name: values.CustomerName,
        //   email: values.CustomerEmail,
        //   contact: values.CustomerPhone
        // },
        theme: {
          // color: "#3399cc"
          color: "#052560"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    }
    catch(error){
      console.log("===>",error);
      alert("Error creating order. Please try again.");
    }
  }

  

  useEffect(()=>{
    dispatch(fetchAddress());
    dispatch(fetchWishlist());
  },[])

  return (
    <div className={`flex flex-col md:flex-row p-4 justify-between max-w-7xl mx-5 md:mt-32 mt-64 `}>


      {/* Delivery Address */}
      <div className={`w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg `}>
        <h2 style={{ color: "#052560" }} className="text-2xl font-bold mb-6">
          Delivery Address
        </h2>


        <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg space-y-4">
          <h2 style={{ color: "#052560" }} className="text-lg font-semibold text-gray-700">Select an Address</h2>
            <div className="space-y-3">
              <select
                onChange={handleDropdownChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                defaultValue=""
                >
                <option value="" disabled>
                  Choose an address
                </option>
                {address.map((address, index) => (
                  <option key={address.addressId} value={address.addressId}>
                    Address : {index+1}
                  </option>
                ))}
              </select>

              <button
                onClick={()=> navigate('/address')}
                className="w-full bg-blue-500 text-white py-2 mt-6 rounded-lg hover:bg-blue-600">
                Add New Address
              </button>
            </div>

            {selectedAddress && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                <h3 className="font-bold text-gray-700">Selected Address Details</h3>
                <p>
                  <span className="font-medium">Full Name:</span>{" "}
                  {selectedAddress.fullName}
                </p>
                <p>
                  <span className="font-medium">House Name:</span>{" "}
                  {selectedAddress.houseName}
                </p>
                <p>
                  <span className="font-medium">Landmark:</span>{" "}
                  {selectedAddress.landMark}
                </p>
                <p>
                  <span className="font-medium">Phone Number:</span>{" "}
                  {selectedAddress.phoneNumber}
                </p>
                <p>
                  <span className="font-medium">Pincode:</span>{" "}
                  {selectedAddress.pincode}
                </p>
                <p>
                  <span className="font-medium">Place:</span>{" "}
                  {selectedAddress.place}
                </p>
                <p>
                  <span className="font-medium">Post Office:</span>{" "}
                  {selectedAddress.postOffice}
                </p>
              </div>
            )}
        </div>


        
      </div>

      {/* Right Side: Payment Section */}
      <div className={`w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg mt-8 md:mt-0 md:ml-4`}>
        <h2 style={{ color: "#052560" }} className="text-2xl font-bold mb-6">
          Order Summary
        </h2>
        <p className="text-lg font-semibold mb-4 bg-slate-100 p-2 rounded-lg">
          Total Price: ₹ {totalPrice}
        </p>
        <p className="text-lg font-semibold mb-4 bg-slate-100 p-2 rounded-lg">
          Discount: ₹ {calculateDiscount()}
        </p>
        <p className="text-lg font-semibold mb-4 bg-green-300 p-2 rounded-lg">
          Final Price: ₹ {calculateFinalPrice()}
        </p>

        {/* <h3 style={{ color: "#052560" }} className="text-2xl font-bold mb-4">
          Select Payment Method
        </h3> */}

        {/* <div className="space-y-2 bg-blue-100 rounded-lg p-5">
          <div>
            <input
              type="radio"
              id="netBanking"
              value="Net Banking"
              name="paymentMethod"
              onChange={handlePaymentChange}
              className="mr-2"
            />
            <label htmlFor="netBanking">Net Banking</label>
          </div>

          <div>
            <input
              type="radio"
              id="upi"
              value="UPI"
              name="paymentMethod"
              onChange={handlePaymentChange}
              className="mr-2"
            />
            <label htmlFor="upi">UPI</label>
          </div>

          <div>
            <input
              type="radio"
              id="cod"
              value="Cash On Delivery"
              name="paymentMethod"
              onChange={handlePaymentChange}
              className="mr-2"
            />
            <label htmlFor="cod">Cash on Delivery (COD)</label>
          </div>

          <div>
            <input
              type="radio"
              id="card"
              value="Debit/Credit Card"
              name="paymentMethod"
              onChange={handlePaymentChange}
              className="mr-2"
            />
            <label htmlFor="card">Debit/Credit Card</label>
          </div>
          
        </div> */}

        <button
          onClick={handleConfirmPayment}
          type="button"
          className="w-full bg-green-500 text-white py-2 mt-6 rounded-lg hover:bg-green-600"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default React.memo(Payment);
