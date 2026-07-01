import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {type Banner, type Product } from "../cart/cartSlice";

export const api=createApi({
    reducerPath:'api',
    tagTypes:['Items'],
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3000/'
    }),
    endpoints:(builder)=>({
        getAllItems:builder.query<Product[],void>({
            query:()=>'products'
        }),
        getProductById:builder.query<Product,string>({
            query:(id)=>`products/${id}`
        }),
        getBanners:builder.query<Banner[],void>({
            query:()=>'products/banners'
        })
    })
    
})

export const {useGetAllItemsQuery,useGetProductByIdQuery,useGetBannersQuery}=api;