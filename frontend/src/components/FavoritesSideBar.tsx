import { Bell, Heart, List, MessagesSquare, Scale, ShoppingCart, User } from "lucide-react"
import { useGetFavoritesQuery, useGetMeQuery } from "../store/api/api"
import { useAppDispatch, useAppSelector } from "../store/hooks/hook"
import { PromoCards } from "./PromoCards"
import { Link, useLocation } from "react-router-dom"
import { closeCart, openCart } from "../store/cart/cartSlice"
import { CartModal } from "./CartModal"


export const FavoritesSideBar = () => {
    const dispatch = useAppDispatch()
    const { data: user } = useGetMeQuery()
    const { data: favorites = [] } = useGetFavoritesQuery(undefined, { skip: !user })
    const cartItems = useAppSelector((state) => state.cardItem.items)
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
    const { pathname } = useLocation()
    const isCartOpen = useAppSelector((state) => state.cardItem.isCartOpen)
    
    const handleOpenCart = () => dispatch(openCart())
    const handleCloseCart = () => dispatch(closeCart())

    return (
        <aside style={{ width: '350px', flexShrink: 0, borderRight: '1px solid #e5e7eb', paddingTop: '20px', paddingLeft: '30px' }} 
            className="hidden lg:block">
                
                <PromoCards/>
                
                <div className="flex items-center gap-4 py-4 px-2">
                    <div className="flex items-center justify-center shrink-0">
                        <User size={28} className="text-gray-400"/>
                    </div>
                    <div className="min-w-0">
                        <div className="font-semibold text-[15px] truncate">
                            {user?.name || 'Користувач'}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                            {user?.email}
                        </div>
                    </div>
                </div>
                
                <div className="h-px bg-gray-200 my-2"></div>
                
                <nav className="flex flex-col gap-0.5 mt-2">
                    <MenuButton to="/orders" icon={<List size={23} strokeWidth={2} />} label="Замовлення" currentPath={pathname} />
                    <MenuButton to="/messages" icon={<MessagesSquare size={23} strokeWidth={2} />} label="Листування з продавцями" count={4} currentPath={pathname} />
                    <MenuButton to="/offers" icon={<Bell size={23} strokeWidth={2} />} label="Персональні пропозиції" currentPath={pathname} />
                    
                    
                    <MenuButton 
                        onClick={handleOpenCart} 
                        icon={<ShoppingCart size={23} strokeWidth={2} />} 
                        label="Кошик" 
                        count={totalItems} 
                        currentPath={pathname} 
                    />
                    
                    <MenuButton 
                        to="/wishlist"
                        icon={<Heart size={22} strokeWidth={2}/>}
                        label="Список бажань"
                        count={favorites.length}
                        currentPath={pathname}
                        plainCount
                    />
                    
                    <MenuButton to="/compare" icon={<Scale size={23} strokeWidth={2} />} label="Списки порівнянь" currentPath={pathname} />
                </nav>
                
                <CartModal isOpen={isCartOpen} onClose={handleCloseCart} />
        </aside>
    )
};

interface MenuButtonProps {
    to?: string;
    currentPath: string;
    icon: React.ReactNode;
    label: string;
    count?: number;
    plainCount?: boolean;
    onClick?: () => void; 
}

const MenuButton = ({ to, currentPath, icon, label, count, plainCount, onClick }: MenuButtonProps) => {
    const isActive = to ? currentPath === to : false

   
    const content = (
        <>
            <div className="flex items-center gap-3">
                <div className={`${isActive ? 'text-[#00a046]' : 'text-gray-500 group-hover:text-green-600 transition-colors'}`}>
                    {icon}
                </div>
                <span className={`text-[15px] ${isActive ? 'text-[#00a046]' : 'text-gray-800 group-hover:text-green-600 transition-colors'}`}>
                    {label}
                </span>
            </div>
            {count !== undefined && count > 0 && (
                plainCount ? (
                    <span className="text-[14px] text-gray-800 pr-1">{count}</span>
                ):(
                    <span className="text-[12px] font-bold min-w-6 h-6 flex items-center justify-center px-1.5 rounded-full bg-[#00a046] text-white">
                        {count}
                    </span>
                )
            )}
        </>
    )

    const baseClasses = `group w-full flex items-center justify-between px-3 py-3.5 rounded-md transition cursor-pointer text-left ${isActive ? 'bg-transparent' : ''}`

    if (to) {
        return (
            <Link to={to} className={baseClasses} onClick={onClick}>
                {content}
            </Link>
        )
    }

    return (
        <button type="button" onClick={onClick} className={baseClasses}>
            {content}
        </button>
    )
}