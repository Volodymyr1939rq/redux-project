import { Heart, ShoppingCart } from "lucide-react"
import { addToCart, decreaseQuantity, type Product } from "../store/cart/cartSlice"
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
            <h3 className="text-[14px] text-[#3e77aa] group-hover:text-[#f84147] transition-colors cursor-pointer mb-4 line-clamp-2 min-h-10 font-medium" title={product.title}>
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
                    <div className="flex items-center justify-between border-2 border-[#00a046] rounded-lg overflow-hidden h-9 w-22.5">
                        <button 
                            onClick={() => dispatch(decreaseQuantity(product.id))}
                            className="w-8 h-full bg-[#f5f5f5] hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition"
                        >
                            -
                        </button>
                        <span className="font-bold text-[14px] w-full text-center">
                            {currentItems.quantity}
                        </span>
                        <button 
                            onClick={() => dispatch(addToCart(product))}
                            className="w-8 h-full bg-[#f5f5f5] hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 transition"
                        >
                            +
                        </button>
                    </div>
                ) : (
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