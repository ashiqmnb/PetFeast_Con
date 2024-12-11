import React from 'react'

export const payTest = () => {
  return (
    <div>

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
          <form className="space-y-4" 
            // onSubmit={handleAddrssSubmit}
            >
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
  )
}
