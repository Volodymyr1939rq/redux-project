import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cart/cartSlice";
import { api } from "./api/api";
import authReducer from './auth/authSlice'

export const store=configureStore({
    reducer:{
        cardItem:cardReducer,
        [api.reducerPath]:api.reducer,
        auth:authReducer,

    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(api.middleware)

});

store.subscribe(()=>{
    try {
        const cartItems=store.getState().cardItem.items
        localStorage.setItem('cart',JSON.stringify(cartItems))
    } catch (error) {
       
    }
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch