import { Bell, FileText, Heart, LayoutGrid, Menu, Scale, ShoppingCart, User} from "lucide-react"
import { useAppDispatch, useAppSelector } from "../store/hooks/hook"
import { CartModal } from "./CartModal"
import { closeCart, openCart } from "../store/cart/cartSlice";
import { SearchBar } from "./SearchBar";
import { AuthModal } from "./AuthModal";
import { useGetFavoritesQuery, useGetMeQuery } from "../store/api/api";
import { closeAuthModal, openAuthModal } from "../store/auth/authSlice";
import { Link } from "react-router-dom";


export const Header = () => {
    const dispatch = useAppDispatch();
    const isAuthModalOpen=useAppSelector((state)=>state.auth.isAuthModalOpen)
    const cartItems = useAppSelector((state) => state.cardItem.items) 
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
    const isCartOpen = useAppSelector((state) => state.cardItem.isCartOpen)
    const handleOpenCart = () => dispatch(openCart())
    const handleCloseCart = () => dispatch(closeCart())
    const {data:user,isLoading}=useGetMeQuery()
    const {data:favorites=[]}=useGetFavoritesQuery(undefined,{skip:!user})
    const totalFavorites=favorites.length
    
    return (
     <header className="flex justify-center items-center px-4 bg-[#221f1f] h-18 w-full sticky top-0 z-50">
        <div className="w-full max-w-310 flex items-center justify-start min-w-0 gap-4 lg:gap-8">
            
            <div className="flex items-center gap-3 md:gap-4 shrink-0">
                <button className="flex items-center justify-center rounded-lg w-10 h-10 text-white hover:bg-white/20 transition-colors cursor-pointer">
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
            <div className="flex-1 mix-w-0">

           <SearchBar/>
            </div>
        
            <div className="flex items-center gap-5 md:gap-6 text-white shrink-0">
                {isLoading ? (
                    <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"/>
                ) : user ? (
                    <div className="flex items-center gap-5 md:gap-6">
                        <button className="flex items-center justify-center rounded-lg w-10 h-10 hover:bg-white/20 transition-colors cursor-pointer" title="Замовлення">
                            <FileText size={24} />
                        </button>
                        <button className="cursor-pointer" title="Сповіщення">
                            <Bell size={24} />
                        </button>
                        {totalFavorites>0 && (

                        <Link 
                        to='/wishlist'
                        title="Списки бажань"
                        className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-lg hover:bg-white/20 transition-colors  ">
                            <div className="relative flex items-center justify-center">
                            <Heart size={24}/>
                                <div className="absolute -top-3 -right-[14px] bg-gray-500 text-white text-[11px] font-semibold flex items-center justify-center w-5 h-5 rounded-full">
                                    {totalFavorites}
                                </div>
                            </div>
                        </Link>
                        )}
                    </div>
                ): (
                 <div className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                <User size={24} 
                onClick={()=>dispatch(openAuthModal())}
                />
                </div>
                )}
                <div className="flex items-center justify-center w-10 h-10 rounded-lg  cursor-pointer hover:bg-white/20 transition-colors">
                <Scale size={24} />
                </div>

                <div className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer" onClick={handleOpenCart}>
                   <div className="relative flex items-center justify-center">
                    <ShoppingCart size={24} />
                {totalItems>0 && (
                        <div className="absolute -top-3 -right-3 bg-green-600 text-white text-[11px] font-bold flex items-center justify-center w-5 h-5 rounded-full">
                            {totalItems}
                        </div>
                        )}
                </div>
            </div>
                
                </div>
        </div>
        <CartModal isOpen={isCartOpen} onClose={handleCloseCart}/>
        <AuthModal onClose={()=>dispatch(closeAuthModal())} isOpen={isAuthModalOpen}/>
    </header>
    )
}