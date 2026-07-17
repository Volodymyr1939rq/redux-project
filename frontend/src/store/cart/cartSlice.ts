import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const loadCartFromLocalStorage=()=>{
    try {
        const savedCart=localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
        console.error('Помилка завантаження кошика')
        return []
    }
}
export interface BreadCrumbs{
    title:string,
    id:string
}
export interface Product{
    id:string,
    title:string,
    price:number,
    image:string,
    oldPrice?:number,
    code?:number,
    seller?:string,
    breadCrumbs?:BreadCrumbs[]
}

export interface Banner{
    id:string,
    isActive:boolean,
    imageUrl:string,
    link?:string,
    order:number
}

export interface CartItem extends Product{
    quantity:number
}

interface CartState {
items:CartItem[],
isCartOpen:boolean
}
const initialState:CartState={
items:loadCartFromLocalStorage(),
isCartOpen:false
}
export const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<Product>)=>{
            const newItem=action.payload
            const existItem=state.items.find(item=>item.id===newItem.id)

            if(existItem){
                existItem.quantity+=1
            }else{
                state.items.push({...newItem,quantity:1})
            }
        },
        removeFromCart:(state,action:PayloadAction<string>)=>{
            const idToRemove=action.payload
            state.items=state.items.filter(f=>f.id!==idToRemove)
        },
        decreaseQuantity:(state,action:PayloadAction<string>)=>{
            const idToDecrease=action.payload
            const existingItems=state.items.find(item=>item.id===idToDecrease)
            if(existingItems){
                if(existingItems.quantity>1){
                    existingItems.quantity-=1
                }else{
                    state.items=state.items.filter(f=>f.id!==idToDecrease)
                }
            }   
        },
        openCart:(state)=>{
            state.isCartOpen=true;
        },
        closeCart:(state)=>{
            state.isCartOpen=false;
        }
    },
});

export const {addToCart,removeFromCart,decreaseQuantity,openCart,closeCart}=cartSlice.actions
export default cartSlice.reducer;