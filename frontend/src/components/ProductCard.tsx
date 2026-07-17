import { Check, Heart, ShoppingCart } from "lucide-react"
import { addToCart, type Product } from "../store/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks/hook"
import { Link } from "react-router-dom"

interface ProductProps {
    product: Product
}

export const ProductCard = ({ product }: ProductProps) => {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector((state) => state.cardItem.items)
    const currentItems = cartItems.find((f) => f.id == product.id)
    const oldPrice = (product.price * 1.2).toFixed(0)
    
    return (
      
     <div 
    className="bg-white border-b border-r border-gray-200 hover:shadow-[0_0_12px_rgba(0,0,0,0.12)] transition-shadow flex flex-col group relative h-full z-0 hover:z-10 cursor-pointer"
    style={{ padding: '16px' }}
>
        
        <button className="absolute right-4 top-4 text-orange-500 hover:text-orange-600 transition z-10">
            <Heart size={24} strokeWidth={1.5} />
        </button>
        
        <div className="p-4 flex flex-col h-full">
            
            <Link to={`/product/${product.id}`} className="h-40 w-full flex items-center justify-center mb-4">
                <img
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                    src={product.image}
                    alt={product.title}
                />
            </Link>
            <Link to={`/product/${product.id}`}>
            <h3 className="text-[14px] text-[#221f1f] group-hover:text-[#00a046] transition-colors cursor-pointer mb-4 line-clamp-2 min-h-10 font-normal hover:underline" title={product.title}>
                {product.title}
            </h3>
            </Link>
            
            <div className="mt-auto flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-[13px] text-gray-400 line-through mb-0.5">
                        {oldPrice} ₴
                    </span>
                    <span className="text-[24px] font-bold text-[#f84147] leading-none">
                        {product.price.toFixed(0)}<span className="text-[18px]">₴</span>
                    </span>
                </div>
                
                {currentItems ? (
                        <button 
                            className="relative text-[#00a046] shrink-0 flex items-center justify-center " style={{paddingLeft:"6px",paddingRight:"6px"}}
                            title="Вже в кошику"
                        >
                            <ShoppingCart size={28} strokeWidth={2} fill="currentColor"/>
                            <div className="absolute top-0 right-0 bg-[#00a046] rounded-full w-4 h-4 flex items-center justify-center border border-white ">
                                <Check size={10} strokeWidth={3} color="white"/>
                            </div>
                        </button>
                ):(
                    <button 
                        onClick={() => dispatch(addToCart(product))}
                        className="text-[#00a046] hover:text-[#008d3d] transition active:scale-95"
                    >
                      <ShoppingCart size={28} strokeWidth={2} />
                    </button>
                )}
            </div>
        </div>
      </div>
    )
}