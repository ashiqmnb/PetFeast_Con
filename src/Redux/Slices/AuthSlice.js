import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const registerUser = createAsyncThunk(
    'auth/registerUser', async(userData, {rejectWithValue}) => {
        try{
            const res = await axios.post("https://localhost:7109/api/Auth/Register", userData);
            return res.data;
        }
        catch(error){
            // console.log("____", error.response.data);
            return rejectWithValue(error.response.data);
        }
})

export const loginUser = createAsyncThunk(
    'auth/loginUser', async(credentials, {rejectWithValue})=>{
        try{
            const res = await axios.post("https://localhost:7109/api/Auth/Login", credentials)
            // console.log("---",res.data)
            return res.data;
        }
        catch(error){
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data); // Use the backend-provided error message.
            } else {
                return rejectWithValue({ error: 'Network error or no response from server' }); // Handle other errors.
            }
        }
    }
)




const initialState = {
    registerData: null,
    loginStatus: false,
    error: null,
  };


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logout: (state) => {
            state.loginStatus = false;
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.registerData = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "Failed";
                console.log("!!!!!",action)
            })


            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "Success";
                state.loginStatus = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log("Rejected Action Payload:", action.payload);
                console.log("Rejected Action Error:", action.error);
                state.status = "Failed";
                state.error = action.payload?.error || "Something went wrong";
            })
    }
})


export const { logout } = authSlice.actions;
export default authSlice.reducer;