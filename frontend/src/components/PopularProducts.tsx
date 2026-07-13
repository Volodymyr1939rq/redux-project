import { useEffect, useRef, useState } from "react";
import type { Product } from "../store/cart/cartSlice";
import { ChevronLeft } from "lucide-react";
import { ProductCard } from "./ProductCard";

interface PopularProductProps{
    products:Product[]
}

export const PopularProducts=({products}:PopularProductProps)=>{
    const scrollRef=useRef<HTMLDivElement>(null)
    const [showLeftArrow,setShowLeftArrow]=useState(true)
    const [showRightArrow,setShowRightArrow]=useState(true)

    const handleScroll=()=>{
        if(!scrollRef.current) return 
        const {scrollLeft,scrollWidth,clientWidth}=scrollRef.current
        setShowLeftArrow(scrollLeft>0)
        setShowRightArrow(Math.ceil(scrollLeft+clientWidth)<scrollWidth-1)
    }
    useEffect(()=>{
        handleScroll()
        window.addEventListener('resize',handleScroll)
        return ()=>window.removeEventListener('resize',handleScroll)
    },[products])

    const scroll=(direction:'left' | 'right')=>{
        if(scrollRef.current){
            const ammount=600
            scrollRef.current.scrollBy({
                left:direction==='left' ? -ammount : ammount,
                behavior:'smooth'
            })
        }
    }
    if(!products || products.length===0) return null

    return (
        <div style={{position:'relative',width:'100%',backgroundColor:'#fff',marginBottom:'16px',marginTop:'50px'}}>
            <h2 className="text-[22px] font-bold text-[#221f1f] "style={{padding:'16px 0 0',marginBottom:'24px' }}>
                Популярні товари
            </h2>
            {showLeftArrow && (
                <button onClick={()=>scroll('left')}
                className="absolute left-2 top-1/2 w-10 h-10 bg-white/95 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center text-gray-800 hover:text-[#00a046] transition-colors z-10"
                >
                    <ChevronLeft size={24}/>
                </button>
            )}
            <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="rozetka-scrollbar scroll-smooth"
            style={{display:'flex',
                overflowX:'auto',
                padding:'0 0 16px 0'
            }}>
                {products.map((product)=>(
                    <div key={product.id}
                    style={{flexShrink:0,
                        width:'220px',
                        display:'flex'

                    }}>
                        <ProductCard product={product}/>
                    </div>
                ))}
            </div>
            {showRightArrow && (
              <button onClick={()=>scroll('right')}
              className="absolute right-2 top-1/2 w-10 h-10 bg-white/95 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center text-gray-800 hover:text-[#00a046] transition-colors z-10"
              ></button>
            )}
        </div>
    )
}