import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../cart/cartSlice";

export const api=createApi({
    reducerPath:'api',
    tagTypes:['Items'],
    baseQuery:fetchBaseQuery({
        baseUrl:'https://fakestoreapi.com/'
    }),
    endpoints:(builder)=>({
        getAllItems:builder.query<Product[],void>({
            query:()=>'products'
        })
    })
})

export const {useGetAllItemsQuery}=api;