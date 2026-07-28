import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {type Banner, type Product } from "../cart/cartSlice";



export interface IUser{
    id:string,
    email:string | null,
    name:string | null,
    phone:string | null,
    picture:string | null,
    isVerified:boolean,
    role:string,
}
export interface EmailLoginAuth{
    email:string,
    password:string
}
export interface AuthResponse{
    user:IUser,
    message:string
}
export interface ProductResponse{
    data:Product[],
    page:number,
    total:number,
    lastPage:number
}
export interface BreadCrumbs{
    title:string,
    id:string
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
    children?:ICategory[],
    breadcrumbs?:BreadCrumbs[]
}
export const api=createApi({
    reducerPath:'api',
    tagTypes:['Items','Brands','User'],
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3000/',
        credentials:'include'
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
        }),

        sendPhoneCode:builder.mutation<{message:string},{phone:string}>({
            query:(body)=>({
                url:'phoneauth/send',
                method:'POST',
                body
            })
        }),
        verifyPhoneCode:builder.mutation<AuthResponse,{phone:string,code:string}>({
            query:(body)=>({
                url:'phoneauth/verify',
                method:'POST',
                body
            })
        }),
        loginWithEmail:builder.mutation<AuthResponse,EmailLoginAuth>({
            query:(body)=>({
                url:'auth/login',
                method:'POST',
                body
            }),
            invalidatesTags:['User']
        }),
        loginWithGoogle:builder.mutation<{url:string},string>({
            query:(provider)=>({
                url:`auth/oauth/connect/${provider}`,
                method:'GET'
            })
        }),
        getMe:builder.query<IUser,void>({
          query:()=>({
             url:'auth/me',
             method:'GET',
          }),
          providesTags:['User']
        })
    })
    
})

export const {useGetAllItemsQuery,
    useGetProductByIdQuery,
    useGetBannersQuery,
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useGetAllBrandsQuery,
    useGetUniqSellersQuery,
    useSendPhoneCodeMutation,
    useVerifyPhoneCodeMutation,
    useLoginWithEmailMutation,
    useLoginWithGoogleMutation,
    useGetMeQuery}=api;