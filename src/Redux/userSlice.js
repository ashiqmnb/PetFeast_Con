import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: localStorage.getItem('id'),
        name: localStorage.getItem('username'),
    },
    reducers:{
        clearUser:(state,action)=>{
            return {
                id: '',
                name: ''
            }
        },
        setUser:(state,action)=>{
            const {id, name} = action.payload;
            state.id = id;
            state.name = name;
        }
    }
})

export const { clearUser, setUser } = userSlice.actions
export default userSlice.reducer