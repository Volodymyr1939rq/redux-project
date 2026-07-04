import { LayoutGrid, Menu, Mic, Scale, Search, ShoppingCart, User, X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../store/hooks/hook"
import { CartModal } from "./CartModal"
import { closeCart, openCart } from "../store/cart/cartSlice";
import { useDebaunce } from "../store/hooks/debaunce";
import { useState } from "react";
import { useGetAllItemsQuery } from "../store/api/api";
import { useNavigate } from "react-router-dom";

const POPULAR_QUERIES = [
    "playstation 5", "сонцезахисний крем", "мультипіч", "гамак",
    "вентилятор на акумуляторі", "sup-дошка", "шампунь", "ecoflow",
    "каркасний басейн", "міні-вентилятор", "садові меблі", "iphone 17"
];

export const Header = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [history, setHistory] = useState<string[]>(() => {
        const saveHistory = localStorage.getItem('rozetka_search_history')
        return saveHistory ? JSON.parse(saveHistory) : []
    })
    
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cardItem.items) 
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
    const isCartOpen = useAppSelector((state) => state.cardItem.isCartOpen)
    
    const debauncedSearch = useDebaunce(value, 500)
    const { data: searchResults, isFetching } = useGetAllItemsQuery(
        debauncedSearch,
        { skip: debauncedSearch.length < 2 }
    )

    const handleOpenCart = () => dispatch(openCart())
    const handleCloseCart = () => dispatch(closeCart())

    const handleSearchSubmit = (searchTerm: string = value) => {
        const trimmed = searchTerm.trim()
        if (!trimmed) return

        const newHistory = [trimmed, ...history.filter(f => f !== trimmed)].slice(0, 10)
        setHistory(newHistory)
        localStorage.setItem('rozetka_search_history', JSON.stringify(newHistory))

        setIsFocused(false)
        navigate(`/search?text=${encodeURIComponent(trimmed)}`)
    }

    const removeHistoryItem = (termToRemove: string) => {
        const newHistory = history.filter(f => f !== termToRemove)
        setHistory(newHistory)
        localStorage.setItem('rozetka_search_history', JSON.stringify(newHistory))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearchSubmit()
    }


    const popularQueriesBlock = (
        <div style={{transform:'translateX(-15px)'}}>
            <h3 className="text-[16px] font-bold text-[#221f1f]" style={{ marginBottom: '16px'}}>
                Популярні запити
            </h3>
            <div className="flex flex-wrap" style={{ gap: '12px' }}>
                {POPULAR_QUERIES.map((query, index) => (
                    <button
                        key={index}
                        onMouseDown={(e) => {
                            e.preventDefault(); 
                            setValue(query);
                            handleSearchSubmit(query);
                        }}
                        className="border border-[#e5e5e5] text-[14px] text-[#221f1f] hover:border-[#00a046] hover:text-[#00a046] transition-colors bg-white"
                        style={{ padding: '8px 16px', borderRadius: '8px' }}
                    >
                        {query}
                    </button>
                ))}
            </div>
        </div>
    );
    
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
        
            <div className="relative flex h-10 min-w-0 flex-1 max-w-125 xl:max-w-175 items-center bg-white rounded-md">
                <div className="flex-1 flex items-center rounded-l-md h-full pl-6 pr-2 min-w-0">
                    <div className="text-gray-400 shrink-0" style={{marginLeft:'10px'}}>
                        <Search size={22} strokeWidth={2} />
                    </div>
                    <input
                        id="main-search-input"
                        type="text"
                        placeholder="Я шукаю..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 h-full text-[15px] text-gray-900 placeholder-gray-500 outline-none bg-transparent min-w-0" 
                        style={{marginLeft:'10px'}}
                    />
                    {isFetching && (
                       <span className="text-[12px] mr-2 text-gray-400 whitespace-nowrap animate-pulse">Шукаю...</span>
                    )}
                    <button 
                        onClick={() => {
                            setValue('');
                            setIsFocused(false);
                        }}
                        className={`text-gray-400 hover:text-[#f84147] transition shrink-0 ${value ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                        style={{marginRight:'7px'}}
                    >
                        <X size={20} />
                    </button>
                    <button className="text-gray-500 hover:text-[#a00000] transition ml-2 shrink-0" style={{marginRight:'7px'}}>
                        <Mic size={22} strokeWidth={2} />
                    </button>
                </div>
                <button 
                    onClick={() => handleSearchSubmit()}
                    className="bg-[#00a046] hover:bg-[#008d3d] text-white px-8 min-w-22.5 h-full font-bold text-[16px] rounded-md shrink-0 transition whitespace-nowrap flex items-center justify-center"
                >
                    Знайти
                </button>

                {isFocused && (
                    <div 
                        className="absolute left-0 w-full bg-white shadow-xl border border-gray-100 z-50 overflow-y-auto cursor-default"
                        style={{ 
                            top: 'calc(100% + 8px)', 
                            padding: '30px 25px', 
                            borderRadius: '8px',
                            maxHeight: '600px'
                        }}
                    >
                        {value.length === 0 ? (
                            
                            <>
                               
                                <div style={{ marginBottom: history.length > 0 ? '32px' : '0' }}>
                                    {popularQueriesBlock}
                                </div>

                                {history.length > 0 && (
                                    <div>
                                        <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
                                            <h3 className="text-[16px] font-bold text-[#221f1f]" style={{transform:'translateX(-15px)'}}>Історія пошуку</h3>
                                            <button 
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    setHistory([]);
                                                    localStorage.removeItem('rozetka_search_history');
                                                }}
                                                className="text-[14px] text-[#3e77aa] hover:text-[#f84147] transition"
                                            >
                                                Очистити
                                            </button>
                                        </div>
                                        <ul className="flex flex-col">
                                            {history.map((term, index) => (
                                                <li 
                                                    key={index}
                                                    className="flex justify-between items-center transition-colors group"
                                                    style={{ padding: '12px 25px 12px 8px', margin: '0 -25px' }}
                                                >
                                                    <div 
                                                        className="flex items-center cursor-pointer flex-1"
                                                        style={{ gap: '12px' }}
                                                        onMouseDown={(e) => {
                                                            e.preventDefault();
                                                            setValue(term);
                                                            handleSearchSubmit(term);
                                                        }}
                                                    >
                                                        <Search size={20} className="text-gray-400" />
                                                        <span className="text-[15px] text-[#221f1f] group-hover:text-[#00a046] group-hover:underline">{term}</span>
                                                    </div>
                                                    <button
                                                        onMouseDown={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            removeHistoryItem(term);
                                                        }}
                                                        className="text-gray-400 hover:text-[#f84147]"
                                                        style={{ padding: '4px' }}
                                                    >
                                                        <X size={20} />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                           
                            <>
                                
                                <div className="flex flex-col" style={{ marginBottom: 0 ,marginTop:'-28px' }}>
                                    {debauncedSearch.length >= 1 && searchResults && searchResults.length > 0 ? (
                                        <ul className="flex flex-col">
                                            {searchResults.map((item) => (
                                                <li 
                                                    key={item.id}
                                                    className="flex justify-between items-center cursor-pointer transition-colors group"
                                                    style={{ padding: '12px 25px 12px 10px', margin: '0 -25px' }}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        setValue('');
                                                        navigate(`product/${item.id}`);
                                                    }}
                                                >
                                                    <div className="flex items-center" style={{ gap: '12px' }}>
                                                        {/* <Search size={20} className="text-gray-400" /> */}
                                                     
                                                        <span className="text-[15px] text-[#221f1f] group-hover:text-[#00a046] group-hover:underline">{item.title}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : !isFetching ? (
                                        <div className="text-center text-gray-500 text-[15px]" style={{ padding: '12px 0' }}>
                                            За запитом <span className="font-bold">"{value}"</span> нічого не знайдено
                                        </div>
                                    ) : null}
                                </div>
                                <div>
                                    {popularQueriesBlock}
                                </div>
                            </>
                        )}
                    </div>
                )}
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