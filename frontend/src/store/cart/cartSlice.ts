import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Product{
    id:number,
    title:string,
    price:number,
    image:string,
}

export interface CardItem extends Product{
    quantity:number
}

interface CardState {
items:CardItem[]
}
const initialState:CardState={
items:[]
}
export const cardSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCard:(state,action:PayloadAction<Product>)=>{
            const newItem=action.payload
            const existItem=state.items.find(item=>item.id===newItem.id)

            if(existItem){
                existItem.quantity+=1
            }else{
                state.items.push({...newItem,quantity:1})
            }
        },
        removeFromCard:(state,action:PayloadAction<number>)=>{
            const idToRemove=action.payload
            state.items=state.items.filter(f=>f.id!==idToRemove)
        },
        decreaseQuantity:(state,action:PayloadAction<number>)=>{
            const idToDecrease=action.payload
            const existingItems=state.items.find(item=>item.id===idToDecrease)
            if(existingItems){
                if(existingItems.quantity>1){
                    existingItems.quantity-=1
                }else{
                    state.items=state.items.filter(f=>f.id!==idToDecrease)
                }
            }   
        }
    },
});

export const {addToCard,removeFromCard,decreaseQuantity}=cardSlice.actions
export default cardSlice.reducer;