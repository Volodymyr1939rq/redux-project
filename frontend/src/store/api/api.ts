import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {type Banner, type Product } from "../cart/cartSlice";
export interface ProductResponse{
    data:Product[],
    page:number,
    total:number,
    lastPage:number
}
export interface ProductFiltersParam{
    page?:number,
    limit?:number,
    search?:string,
    categoryId?:string,
    minPrice?:number | string,
    maxPrice?:number | string,
    seller?:string
}
export const api=createApi({
    reducerPath:'api',
    tagTypes:['Items'],
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3000/'
    }),
    endpoints:(builder)=>({
        getAllItems:builder.query<ProductResponse,ProductFiltersParam | void>({
            query:(param)=>({url:'product',params:param || {}}),
            providesTags:['Items']
        }),
        getProductById:builder.query<Product,string>({
            query:(id)=>`product/${id}`
        }),
        getBanners:builder.query<Banner[],void>({
            query:()=>'products/banners'
        }),
        getCategories:builder.query<{id:string,title:string}[],void>({
            query:()=>'category'
        })
    })
    
})

export const {useGetAllItemsQuery,useGetProductByIdQuery,useGetBannersQuery,useGetCategoriesQuery}=api;