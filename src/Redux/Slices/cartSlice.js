import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import isEqual from "lodash.isequal";


export const fetchCart = createAsyncThunk(
    'cart/fetchCart', async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get("https://localhost:7109/api/Cart/GetCartItems",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data.data;
        // console.log("response of fetching cart : ",response.data.data);
    }
    catch(error){
        return rejectWithValue("error occured while fetching cart")
    }
});

export const addToCart = createAsyncThunk(
    'cart/addToCart', async (id, {dispatch, rejectWithValue}) => {
        try{
            const response = await axios.post(`https://localhost:7109/api/Cart/AddToCart?productId=${id}`,
                {}, // Empty body
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
            });
            dispatch(fetchCart());
            console.log("response",response);
            alert("Product added to cart")
        }
            catch (error) {
                console.log("Error adding to cart:", error);
                return rejectWithValue(error)
                // return rejectWithValue(error.response?.data || "Something went wrong");
            }
    }
)

export const incrementQuantity = createAsyncThunk(
    "cart/incrementQuantity", async (id, {dispatch, rejectWithValue}) => {
        try{
            const response = await axios.put(`https://localhost:7109/api/Cart/IncreaseQuantity?productId=${id}`,
                {}, // Empty body
                {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            dispatch(fetchCart());
            console.log("incrementQuantity response",response)
        }
        catch(error){
            console.log("incrementQuantity error",error)
        }
    }
)


export const decrementQuantity = createAsyncThunk(
    "cart/incrementQuantity", async (id, {dispatch, rejectWithValue}) => {
        try{
            const response = await axios.put(`https://localhost:7109/api/Cart/DecreaseQuantity?productId=${id}`,
                {}, // Empty body
                {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            dispatch(fetchCart());
            console.log("incrementQuantity response",response)
        }
        catch(error){
            console.log("incrementQuantity error",error)
        }
    }
)


export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart', async (id, {dispatch, rejectWithValue})=>{
        try{
            const response = await axios.delete(`https://localhost:7109/api/Cart/RemoveFromCart?productId=${id}`,
                // {}, // Empty body
                {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            dispatch(fetchCart());
            console.log("removeFromCart response",response)
        }
        catch(error){
            console.log("removeFromCart error",error)
        }
    }
)


const initialState = {
    cart: [],
    totalPrice: null,
    totalItems: null,
    error: null
}


const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        // for perform logout
        resetCart: (state)=>{
            state.cart = initialState.cart;
            state.error = initialState.error;
        }
    },
    extraReducers: (builder) => {

        builder
        .addCase(fetchCart.fulfilled, (state, action) => {
            if(!isEqual(state.cart, action.payload)){
                // console.log("cart==", action.payload.cartProducts);
                // console.log("totalCount==", action.payload.totalCount);
                // console.log("totalPrice==", action.payload.totalPrice);
                state.cart = action.payload.cartProducts;
                state.totalPrice = action.payload.totalPrice;
                state.totalItems = action.payload.totalCount
            }
        })
        .addCase(fetchCart.rejected, (state, action) => {
            if(!isEqual(state.cart, action.payload)){
                state.cart = [];
                state.error = action.payload; 
            }
        })

        // .addCase(addToCart.fulfilled, (state, action) => {
        //     console.log("addToCart.fulfilled", action)
        // })
        // .addCase(addToCart.rejected, (state, action) => {
        //     console.log("addToCart.rejected",action)
        // })
    }
})

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;