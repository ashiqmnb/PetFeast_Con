import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist', async (_, {rejectWithValue}) =>{
        try{
            const response = await axios.get("https://localhost:7109/api/WishList/GetWishList",{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            return response.data.data;
            // console.log("fetchWishlist response", response.data.data)
        }
        catch(error){
            console.log("fetchWishlist error",error)
            return rejectWithValue("error occured while fetching wishlist");
        }
    }
)


export const addRemoveWishlist = createAsyncThunk(
    'wishlist/addRemoveWishlist', async(id, {dispatch})=>{
        try{
            const response = await axios.post(`https://localhost:7109/api/WishList/AddOrRemove?productId=${id}`,
                {}, // Empty body
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
            })
            dispatch(fetchWishlist())
            // console.log("addRemoveWishlist response", response);
        }
        catch(error){
            console.log("addRemoveWishlist error", error);
        }
    }
)




const initialState = {
    wishlist:[],
    error: null
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                // console.log("fetchWishlist payload",action.payload)
                state.wishlist = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})


export default wishlistSlice.reducer;