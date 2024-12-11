import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Slices/cartSlice';
import userDataReducer from './Slices/userDataSlice';
import authReducer from './Slices/AuthSlice';
import wishlistReducer from './Slices/WishlistSlice';
import addressReducer from './Slices/AddressSlice'



const store = configureStore({
    reducer:{
        cart: cartReducer,
        userData: userDataReducer,
        auth: authReducer,
        wishlist: wishlistReducer,
        address: addressReducer
    }
})
export default store