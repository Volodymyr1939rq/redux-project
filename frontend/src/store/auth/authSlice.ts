import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { api, type IUser } from "../api/api";

interface AuthState{
    user:IUser | null
    isAuth:boolean,
    isAuthModalOpen:boolean
}

const initialState:AuthState={
    user:null,
    isAuth:false,
    isAuthModalOpen:false
}

export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.user=null
            state.isAuth=false
        },
        setUser:(state,action:PayloadAction<IUser>)=>{
            state.user=action.payload
            state.isAuth=true
        },
        openAuthModal:(state)=>{
            state.isAuthModalOpen=true;
        },
        closeAuthModal:(state)=>{
            state.isAuthModalOpen=false;
        }
    },
    extraReducers:(builder)=>{
        builder.addMatcher(
            api.endpoints.verifyPhoneCode.matchFulfilled,
            (state,{payload})=>{
                state.user=payload.user
                state.isAuth=true
            }
        )
    }
})

export const {logout,setUser,openAuthModal,closeAuthModal}=authSlice.actions
export default authSlice.reducer