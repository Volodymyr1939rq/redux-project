import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {type Banner, type Product } from "../cart/cartSlice";

export interface ProductResponse{
    data:Product[],
    page:number,
    total:number,
    lastPage:number
}
export interface ProductFiltersParam{
    page?:string | number,
    limit?:number,
    search?:string,
    categoryId?:string,
    minPrice?:number | string,
    maxPrice?:number | string,
    seller?:string,
    brand?:string,
    sort?:string,
}
export interface Brand{
    id:string,
    name:string,
    count:number
}

export interface Seller{
    id:string,
    name:string,
    count:number
}

export interface ICategory{
    id:string,
    title:string,
    image?:string,
    parentId?:string | null,
    children?:ICategory[]
}
export const api=createApi({
    reducerPath:'api',
    tagTypes:['Items','Brands'],
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
        getCategories:builder.query<ICategory[],void>({
            query:()=>'category'
        }),
        getCategoryById:builder.query<ICategory,string>({
            query:(id)=>`category/${id}`
        }),
        getAllBrands:builder.query<Brand[],void>({
            query:()=>({url:'brand'}),
            providesTags:['Brands']
        }),
        getUniqSellers:builder.query<Seller[],void>({
            query:()=>('seller/sellers')
        })
    })
    
})

export const {useGetAllItemsQuery,
    useGetProductByIdQuery,
    useGetBannersQuery,
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useGetAllBrandsQuery,
    useGetUniqSellersQuery}=api;