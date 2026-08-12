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

export interface Favorites{
    id:string,
    userId:string,
    wishlistId:string
    productId:string,
    product:Product
}

export interface WishListResponse{
    id:string
    name:string,
    userId:string,
    isDefault:boolean
    items:Favorites[]
}

export interface toggleFavorites{
    message:string,
    isFavorite:boolean
}

export type MakeDefaultWishListResponse=[
    {count:number},
    {id:string,name:string,isDefault:boolean,userId:string}
]

export interface MoveItemResponse{
      id:string,
      userId:string,
      wishlistId:string,
      productId:string
}

export const api=createApi({
    reducerPath:'api',
    tagTypes:['Items','Brands','User','Favorite','WishList'],
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
            }),
            invalidatesTags:['User']
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
        }),

        getFavorites:builder.query<Favorites[],void>({
            query:()=>'favorite',
            providesTags:['Favorite']
        }),

        toggleFavorites:builder.mutation<toggleFavorites,string>({
            query:(productId)=>({
                url:`favorite/${productId}`,
                method:'POST'
            }),
            invalidatesTags:['Favorite','WishList']
        }),
        clearFromWishList:builder.mutation<{message:string},string>({
            query:(wishlistId)=>({
                url:`/favorite/list/${wishlistId}`,
                method:'DELETE'
            }),
            invalidatesTags:['Favorite','WishList']
        }),
        getWishList:builder.query<WishListResponse[],void>({
            query:()=>({
                url:'favorite/list',
            }),
            providesTags:['WishList'] 
        }),
        createWishList:builder.mutation<WishListResponse,string>({
            query:(name)=>({
                url:'favorite/wishlist',
                method:'POST',
                body:{name}
            }),
            invalidatesTags:['WishList']
        }),
        updateWishList:builder.mutation<WishListResponse,{wishlistId:string,name:string}>({
            query:({wishlistId,name})=>({
                url:`favorite/list/${wishlistId}`,
                method:'PATCH',
                body:{name}
            }),
            invalidatesTags:['WishList']
        }),
        getWishListById:builder.query<WishListResponse,{id:string,sort:string}>({
            query:({id,sort})=>({
                url:`favorite/list/${id}`,
                params:{sort}
            }),
            providesTags:['WishList']
        }),
        makeDefaultwishList:builder.mutation<MakeDefaultWishListResponse,{wishlistId:string}>({
            query:({wishlistId})=>({
                url:`favorite/list/${wishlistId}/default`,
                method:'PATCH',
            }),
            invalidatesTags:['WishList']
        }),
        moveItems:builder.mutation<MoveItemResponse,{favoriteId:string,targetWishListId:string}>({
            query:({favoriteId,targetWishListId})=>({
                url:`favorite/item/${favoriteId}/move`,
                method:'PATCH',
                body:{targetWishListId}
            }),
            invalidatesTags:['WishList']
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
    useGetMeQuery,
    useGetFavoritesQuery,
    useToggleFavoritesMutation,
    useClearFromWishListMutation,
    useGetWishListQuery,
    useCreateWishListMutation,
    useUpdateWishListMutation,
    useGetWishListByIdQuery,
    useMakeDefaultwishListMutation,
    useMoveItemsMutation}=api;