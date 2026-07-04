import { useEffect, useState } from "react";

export function useDebaunce<T>(value:T,delay:number):T {
    const [debaunceValue,setDebaunceValue]=useState<T>(value)

    useEffect(()=>{
        const handler=setTimeout(()=>{
            setDebaunceValue(value)
        },delay)

        return ()=>{
            clearTimeout(handler)
        } 
            
    },[value,delay])
    return debaunceValue
}