import { LayoutGrid, Menu, Mic, Scale, Search, ShoppingCart, User } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../store/hooks/hook"
import { CartModal } from "./CartModal"
import { closeCart, openCart } from "../store/cart/cartSlice";

export const Header = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cardItem.items) 
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
    const isCartOpen = useAppSelector((state) => state.cardItem.isCartOpen)
    
    const handleOpenCart = () => {
        dispatch(openCart())
    }
    const handleCloseCart = () => {
        dispatch(closeCart())
    }
    
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
            
            <button className=" md:flex bg-white/10 hover:bg-white/20 transition px-4 min-w-27.5 h-10 rounded-lg flex items-center justify-center gap-2 font-medium shrink-0 text-white">
                <LayoutGrid size={20}/> Каталог
            </button>
        
            <div className="flex h-10 min-w-0 flex-1 max-w-125 xl:max-w-175 items-center bg-white rounded-md">
                <div className="flex-1 flex items-center  rounded-l-md h-full pl-6 pr-2 min-w-0">
                    <div className="text-gray-400 shrink-0 " style={{marginLeft:'10px'}}>
                        <Search size={22} strokeWidth={2} />
                    </div>
                    <input
                        type="text"
                        placeholder="Я шукаю..."
                        className="flex-1 h-full text-[15px] text-gray-900 placeholder-gray-500 outline-none bg-transparent min-w-0" style={{marginLeft:'10px'}}
                    />
                    <button className="text-gray-500 hover:text-[#a00000] transition ml-2 shrink-0" style={{marginRight:'7px'}}>
                        <Mic size={22} strokeWidth={2} />
                    </button>
                </div>
                <button className="bg-[#00a046] hover:bg-[#008d3d] text-white px-8 min-w-22.5 h-full font-bold text-[16px] rounded-md shrink-0 transition whitespace-nowrap flex items-center justify-center">
                    Знайти
                </button>
            </div>
        
            <div className="flex items-center gap-5 md:gap-6 text-white shrink-0">
                <User size={24} className="cursor-pointer hover:text-[#00a046] transition"/>
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
    </header>
    )
}