import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {},
    reducers:{
        setUserData:( state, action)=>{
            console.log(action.payload);
            return action.payload
        }
    }
})

export const { setUserData } = userDataSlice.actions
export default userDataSlice.reducer