import { createSlice } from "@reduxjs/toolkit";


const initialState = {};


const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers:{
        setUserData:( state, action)=>{
            console.log(action.payload);
            return action.payload
        },
        // for perform logout
        resetUserData: () => {
            return initialState;
        },
    }
})

export const { setUserData, resetUserData } = userDataSlice.actions
export default userDataSlice.reducer