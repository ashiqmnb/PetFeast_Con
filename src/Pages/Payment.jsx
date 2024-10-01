import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../Redux/userDataSlice";


const Payment = () => {


  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const userId = useSelector(state => state.user.id)
  const currentAdress = useSelector(state => state.userData.address)

  const fetchUserData = async (userId)=>{
    const response = await axios.get(`http://localhost:5000/users/${userId}`)
    dispatch(setUserData(response.data))
  }

  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery")
  const [errors, setErrors] = useState({});
  const [delAddress, setDelAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    houseName: "",
    place: "",
    postOffice: "",
    landMark: "",
  });

  const navigate = useNavigate();
  const date = new Date();

  const handleAddrss = (e) => {
    const { name, value } = e.target;
    setDelAddress({ ...delAddress, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!delAddress.fullName) newErrors.fullName = "Full Name is required";
    if (!delAddress.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (delAddress.phoneNumber.length != 10)
      newErrors.phoneNumber = "Phone number must contails 10 digits";
    if (!delAddress.pincode) newErrors.pincode = "Pincode is required";
    if (!delAddress.houseName) newErrors.houseName = "House Name is required";
    if (!delAddress.place) newErrors.place = "Place is required";
    if (!delAddress.postOffice)
      newErrors.postOffice = "Post Office is required";
    if (!delAddress.landMark) newErrors.landMark = "Land Mark is required";
    return newErrors;
  };

  const handleAddrssSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      await axios
        .patch(`http://localhost:5000/users/${userId}`, { address: delAddress })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  };

  const handleConfirmPayment = async () => {
    await axios
      .patch(`http://localhost:5000/users/${userId}`, {
        orderDetails: {
          items: cart,
          paymentMethod: paymentMethod,
          totalPrice: calculateFinalPrice().toFixed(2),
          orderDate: date.toDateString(),
          orderTime: date.toLocaleTimeString(),
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    await axios
      .patch(`http://localhost:5000/users/${userId}`, { cart: [] })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    alert("Payment Successfull");
    navigate("/orderConfirm");
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  //   functions for price calculation
  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * Number(item.quantity),
      0
    );
  };
  const calculateDiscount = () => {
    return calculateTotalPrice() * 0.1;
  };
  const calculateFinalPrice = () => {
    return calculateTotalPrice() - calculateDiscount();
  };

  
  useEffect(() => {
    fetchUserData(userId)
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-4 justify-between max-w-7xl mx-5 md:mt-32 mt-64">
      {/* Delivery Details Form */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <h2 style={{ color: "#052560" }} className="text-2xl font-bold mb-6">
          Delivery Details
        </h2>

        {/* conditional rendering */}
        {currentAdress ? (
          <div className="text-lg  pt-5 space-y-3 bg-blue-50 rounded-lg p-5">
            <p>
              Full Name :{" "}
              <span
                style={{ border: "1px solid lightgrey" }}
                className="px-5 font-mono bg-white"
              >
                {currentAdress.fullName}
              </span>
            </p>
            <p>
              Phone Number :{" "}
              <span
                style={{ border: "1px solid lightgrey" }}
                className="px-5 font-mono bg-white"
              >
                {currentAdress.phoneNumber}
              </span>
            </p>
            <p>
              House Name :{" "}
              <span
                style={{ border: "1px solid lightgrey" }}
                className="px-5 font-mono bg-white"
              >
                {currentAdress.houseName}
              </span>
            </p>
            <p>
              Pincode :{" "}
              <span
                style={{ border: "1px solid lightgrey" }}
                className="px-5 font-mono bg-white"
              >
                {currentAdress.pincode}
              </span>
            </p>
            <p>
              Place :{" "}
              <span
                style={{ border: "1px solid lightgrey" }}
                className="px-5 font-mono bg-white"
              >
                {currentAdress.place}
              </span>
            </p>
            <p>
              Post Office :{" "}
              <span
                style={{ border: "1px solid lightgrey" }}
                className="px-5 font-mono bg-white"
              >
                {currentAdress.postOffice}
              </span>
            </p>
            <p>
              Land Mark :{" "}
              <span
                style={{ border: "1px solid lightgrey" }}
                className="px-5 font-mono bg-white"
              >
                {currentAdress.landMark}
              </span>
            </p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleAddrssSubmit}>
            <div>
              <label htmlFor="" className="font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={delAddress.fullName}
                className="border p-1 rounded-lg w-full placeholder:text-gray placeholder:text-sm"
                placeholder="Full Name"
                onChange={handleAddrss}
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">{errors.fullName}</span>
              )}
            </div>

            <div>
              <label htmlFor="" className="font-semibold">
                Phone Number
              </label>
              <input
                type="number"
                name="phoneNumber"
                value={delAddress.phoneNumber}
                className="border p-2 rounded-lg w-full placeholder:text-gray placeholder:text-sm"
                placeholder="Phone Number"
                onChange={handleAddrss}
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">
                  {errors.phoneNumber}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="" className="font-semibold">
                Pincode
              </label>
              <input
                type="number"
                name="pincode"
                value={delAddress.pincode}
                className="border p-2 rounded-lg w-full placeholder:text-gray placeholder:text-sm"
                placeholder="Pincode"
                onChange={handleAddrss}
              />
              {errors.pincode && (
                <span className="text-red-500 text-sm">{errors.pincode}</span>
              )}
            </div>

            <div>
              <label htmlFor="" className="font-semibold">
                House Name
              </label>
              <input
                type="text"
                name="houseName"
                value={delAddress.houseName}
                className="border p-2 rounded-lg w-full placeholder:text-gray placeholder:text-sm"
                placeholder="House Name"
                onChange={handleAddrss}
              />
              {errors.houseName && (
                <span className="text-red-500 text-sm">{errors.houseName}</span>
              )}
            </div>

            <div>
              <label htmlFor="" className="font-semibold">
                Place
              </label>
              <input
                type="text"
                name="place"
                value={delAddress.place}
                className="border p-2 rounded-lg w-full placeholder:text-gray placeholder:text-sm"
                placeholder="Place"
                onChange={handleAddrss}
              />
              {errors.place && (
                <span className="text-red-500 text-sm">{errors.place}</span>
              )}
            </div>

            <div>
              <label htmlFor="" className="font-semibold">
                Post Office
              </label>
              <input
                type="text"
                name="postOffice"
                value={delAddress.post}
                className="border p-2 rounded-lg w-full placeholder:text-gray placeholder:text-sm"
                placeholder="Post Office"
                onChange={handleAddrss}
              />
              {errors.postOffice && (
                <span className="text-red-500 text-sm">
                  {errors.postOffice}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="" className="font-semibold">
                Land Mark
              </label>
              <input
                type="text"
                name="landMark"
                value={delAddress.landMark}
                className="border p-2 rounded-lg w-full placeholder:text-gray placeholder:text-sm"
                placeholder="Land Mark"
                onChange={handleAddrss}
              />
              {errors.landMark && (
                <span className="text-red-500 text-sm">{errors.landMark}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Confirm Address
            </button>
          </form>
        )}
      </div>

      {/* Right Side: Payment Section */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg mt-8 md:mt-0 md:ml-4">
        <h2 style={{ color: "#052560" }} className="text-2xl font-bold mb-6">
          Order Summary
        </h2>
        <p className="text-lg font-semibold mb-4 bg-slate-100 p-2 rounded-lg">
          Total Price: $ {calculateTotalPrice().toFixed(2)}
        </p>
        <p className="text-lg font-semibold mb-4 bg-slate-100 p-2 rounded-lg">
          Discount: $ {calculateDiscount().toFixed(2)}
        </p>
        <p className="text-lg font-semibold mb-4 bg-slate-300 p-2 rounded-lg">
          Final Price: $ {calculateFinalPrice().toFixed(2)}
        </p>

        <h3 style={{ color: "#052560" }} className="text-2xl font-bold mb-4">
          Select Payment Method
        </h3>
        <div className="space-y-2 bg-blue-100 rounded-lg p-5">
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
        </div>

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
