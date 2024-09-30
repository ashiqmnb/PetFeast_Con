import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import userDataReducer from './userDataSlice';



const store = configureStore({
    reducer:{
        user: userReducer,
        cart: cartReducer,
        userData: userDataReducer
    }
})
export default store