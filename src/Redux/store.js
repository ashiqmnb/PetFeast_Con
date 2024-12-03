import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import cartReducer from './Slices/cartSlice';
import userDataReducer from './Slices/userDataSlice';
import authReducer from './Slices/AuthSlice';
import wishlistReducer from './Slices/WishlistSlice';



const store = configureStore({
    reducer:{
        user: userReducer,
        cart: cartReducer,
        userData: userDataReducer,
        auth: authReducer,
        wishlist: wishlistReducer
    }
})
export default store