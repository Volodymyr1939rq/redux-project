import { Bell, FileText, LayoutGrid, Menu, Scale, ShoppingCart, User} from "lucide-react"
import { useAppDispatch, useAppSelector } from "../store/hooks/hook"
import { CartModal } from "./CartModal"
import { closeCart, openCart } from "../store/cart/cartSlice";
import { SearchBar } from "./SearchBar";
import { AuthModal } from "./AuthModal";
import { useState } from "react";
import { useGetMeQuery } from "../store/api/api";


export const Header = () => {
    const dispatch = useAppDispatch();
    const [isAuthModalOpen,setIsAuthModalOpen]=useState(false)
    const cartItems = useAppSelector((state) => state.cardItem.items) 
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
    const isCartOpen = useAppSelector((state) => state.cardItem.isCartOpen)
    const handleOpenCart = () => dispatch(openCart())
    const handleCloseCart = () => dispatch(closeCart())
    const {data:user,isLoading}=useGetMeQuery()
    
    return (
     <header className="flex justify-center items-center px-4 bg-[#221f1f] h-18 w-full sticky top-0 z-50">
        <div className="w-full max-w-310 flex items-center justify-start min-w-0 gap-4 lg:gap-8">
            
            <div className="flex items-center gap-3 md:gap-4 shrink-0">
                <button className="text-white hover:text-[#00a046] transition">
                    <Menu size={28}/>
                </button>
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 bg-[#00a046] rounded-full flex items-center justify-center text-white text-lg font-bold">P</div>
                    <span className="text-white font-bold text-xl hidden sm:block tracking-wide">ROZETKA</span>
                </div>
            </div>
            
            <button className="md:flex bg-white/10 hover:bg-white/20 transition px-4 min-w-27.5 h-10 rounded-lg flex items-center justify-center gap-2 font-medium shrink-0 text-white">
                <LayoutGrid size={20}/> Каталог
            </button>
        
           <SearchBar/>
        
            <div className="flex items-center gap-5 md:gap-6 text-white shrink-0">
                {isLoading ? (
                    <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"/>
                ) : user ? (
                    <div className="flex items-center gap-5 md:gap-6">
                        <button className="hover:text-[#00a046] transition" title="Замовлення">
                            <FileText size={24} />
                        </button>
                        <button className="hover:text-[#00a046] transition" title="Сповіщення">
                            <Bell size={24} />
                        </button>
                    </div>
                ): (
                 <div>
                <User size={24} 
                onClick={()=>setIsAuthModalOpen(true)}
                className="cursor-pointer hover:text-[#00a046] transition"/>
                </div>
                )}
                <Scale size={24} className="cursor-pointer hover:text-[#00a046] transition"/>
                <div className="relative flex items-center cursor-pointer" onClick={handleOpenCart}>
                    <ShoppingCart size={24} className="hover:text-[#00a046] transition relative" />
                    {totalItems > 0 && (
                        <div className="absolute -top-2 -right-3 bg-red-500 text-white text-[11px] font-bold flex items-center justify-center min-w-4 h-5 px-1 rounded-full border-2 border-[#221f1f]">
                            {totalItems}
                        </div>
                    )}
                </div>
            </div>
            
        </div>
        <CartModal isOpen={isCartOpen} onClose={handleCloseCart}/>
        <AuthModal onClose={()=>setIsAuthModalOpen(false)} isOpen={isAuthModalOpen}/>
    </header>
    )
}