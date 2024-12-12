import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchAddress = createAsyncThunk(
    'address/fetchAddress', async(_, {rejectWithValue}) => {
        const response = await axios.get("https://localhost:7109/api/Address/GetAddress",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data.data;
        // console.log("response of fetching address : ",response.data.data);
    }
)


export const addAddress = createAsyncThunk(
    'address/addAddress', async (formData, {dispatch, rejectWithValue}) => {
        try{
            const response = await axios.post("https://localhost:7109/api/Address/AddAddress",
                formData,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                });
                
                // console.log("addAddress response", response.data)
                dispatch(fetchAddress());
        }
        catch(error){
            // console.log("add address error", error)
            rejectWithValue(error);
        }
    }
)

export const deleteAddress = createAsyncThunk(
    'address/deleteAddress', async(addressId, {dispatch, rejectWithValue}) => {
        try{
            const response = await axios.delete(`https://localhost:7109/api/Address/DeleteAddress?addressId=${addressId}`,
                // {},
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            // console.log("delete address res", response);
            dispatch(fetchAddress());

        }
        catch(error){
            console.log("delete address error", error)
            // return rejectWithValue(error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)


const initialState = {
    address : []
}

const AddressSlice = createSlice({
    name:'aaddress',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{

        builder
        .addCase(fetchAddress.fulfilled, (state, action) => {
            state.address = action.payload
            // console.log("payload of fetchig address",state.address)
        })


        // .addCase()
    }
})

// export const {  }
export default AddressSlice.reducer;