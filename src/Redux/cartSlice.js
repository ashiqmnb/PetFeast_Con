import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
    const response = await axios.get(`http://localhost:5000/users/${userId}`);
    const cart = response.data.cart;
    return cart;
});



const cartSlice = createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        removeCart:( state, action )=>{
            console.log("from redux====>",action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state, action) => {
            // console.log("---- pending");
        });
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            // console.log("---- fulfilled");
            return action.payload;
        });
        builder.addCase(fetchCart.rejected, (state, action) => {
            // console.log("---- rejected");
        });
    }
})


export const { removeCart } = cartSlice.actions
export default cartSlice.reducer