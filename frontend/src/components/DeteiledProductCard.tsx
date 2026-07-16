import { Check, Cpu, HardDrive, Heart, MessageSquare, Scale, ShoppingCart, Star } from "lucide-react";
import { addToCart, type Product } from "../store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks/hook";
import { Link } from "react-router-dom";

interface ProductProps {
    products: Product
}

export const DeteiledProductCard = ({ products }: ProductProps) => {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector((state) => state.cardItem.items)
    const currentItems = cartItems.find((f) => f.id == products.id)
    
    return (
        <div className="relative h-full min-h-[500px] border-r border-[#e5e5e5] hover:border-transparent transition-colors duration-200 z-0">
            
            <div className="absolute top-0 left-0 w-full min-h-full bg-white p-3 z-10 border border-transparent border-b-[#e5e5e5] transition-all duration-200 group flex flex-col 
        hover:z-50 hover:-top-2 hover:-left-2 hover:w-[calc(100%+16px)] hover:p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:border-[#e5e5e5] hover:rounded-md">
                
                <div className="flex justify-between items-start mb-2">
                    <span className="bg-[#f84147] text-white text-[14px] font-bold px-2 py-1 rounded-full">
                        Акція
                    </span>
                    <div className="flex flex-col gap-1 relative z-20">
                        <button className="text-[#ffa900] hover:bg-[#fff6e6] p-1.5 rounded transition-colors">
                            <Heart size={24} strokeWidth={1.5}/>
                        </button>
                        <button className="text-[#a6a5a5] hover:bg-[#fff6e6] p-1.5 rounded transition-colors">
                            <Scale size={24} strokeWidth={1.5}/>
                        </button>
                    </div>
                </div>

                <Link 
                    to={`/product/${products.id}`}
                    className="h-40 w-full flex items-center justify-center mb-2 shrink-0"
                >
                    <img 
                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                        src={products.image || 'https://placehold.co/200x200/transparent/3e77aa?text=No+Image'}
                        alt={products.title}
                    />
                </Link>

                <Link to={`/product/${products.id}`} className="mt-auto mb-1.5 flex flex-col">
                    <h3 className="text-[14px] text-[#333] group-hover:text-[#f84147] group-hover:underline transition-colors cursor-pointer mb-2 line-clamp-2 leading-[1.3] min-h-[36px]">
                        {products.title}
                    </h3>
                </Link>

                <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex text-[#ffa900]">
                        <Star size={16} strokeWidth={0} fill="currentColor"/>
                        <Star size={16} strokeWidth={0} fill="currentColor"/>
                        <Star size={16} strokeWidth={0} fill="currentColor"/>
                        <Star size={16} strokeWidth={0} fill="currentColor"/>
                        <Star size={16} strokeWidth={0}/>
                    </div>
                    <div className="flex items-center text-[#a6a5a5] text-[12px] hover:cursor-pointer pr-3">
                        <MessageSquare size={14}/>
                    </div>
                </div>

         
                <div className="flex flex-col">
                    <div className="flex items-end justify-between mb-2">
                        <div className="flex flex-col">
                            <span className="text-[13px] text-[#a6a5a5] line-through mb-0.5">
                                {products.oldPrice} ₴
                            </span>
                            <span className="text-[24px] text-[#f84147] leading-none">
                                {products.price.toFixed(0)} <span className="text-[18px]">₴</span>
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
                        ) : (
                            <button 
                                onClick={() => dispatch(addToCart(products))}
                                className="text-[#00a046] hover:text-[#008d3d] transition active:scale-95 z-20 relative"
                            >
                                <ShoppingCart size={28} strokeWidth={2} />
                            </button>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-1 mb-3">
                        <span className="text-[12px] text-[#00a046]">Безкоштовна доставка</span>
                        <div className="bg-[#ffdf00] text-[#221f1f] text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">SMART</div>
                    </div>
                    <div className="text-[12px] text-[#221f1f] mb-2">Відправимо <span className="font-bold">сьогодні</span></div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#ffdf00] flex items-center justify-center font-bold text-[12px] text-[#221f1f]">Б</div>
                        <span className="text-[13px] text-[#221f1f]">+{Math.round(products.price*0.01)} бонусних ₴</span>
                    </div>
                </div>

                <div className="hidden group-hover:block mt-4 pt-3">
                    <div className="flex items-center gap-4 mb-3 text-[#333]">
                        <div className="flex items-center gap-1 border border-[#333] px-2 py-1 rounded">
                            <Cpu size={18}/>
                            <div className="flex flex-col leading-none">
                                <span className="text-[10px] font-bold">RAM</span>
                                <span className="text-[12px] font-bold">24 ГБ</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 border border-[#333] px-2 py-1 rounded">
                            <HardDrive size={18}/>
                            <div className="flex flex-col leading-none">
                                <span className="text-[10px] font-bold">SSD</span>
                                <span className="text-[12px] font-bold">1 ТБ</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mb-3">
                        <div>
                            <div className="text-[12px] text-[#333] mb-1">Діагональ екрану, </div>
                            <div className="flex gap-2">
                                <span className="border border-[#e5e5e5] hover:border-[#a6a5a5] text-[#333] text-[12px] px-2 py-0.5 rounded cursor-pointer">14.2</span>
                                <span className="border border-[#e5e5e5] text-[#00a046] text-[12px] px-2 py-0.5 rounded cursor-pointer">16.2</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-[12px] text-[#333] mb-1">Обсяг SSD</div>
                            <div className="flex gap-2">
                                <span className="border border-[#e5e5e5] hover:border-[#a6a5a5] text-[#333] text-[12px] px-2 py-0.5 rounded cursor-pointer">1 ТБ</span>
                                <span className="border border-[#e5e5e5] text-[#00a046] text-[12px] px-2 py-0.5 rounded cursor-pointer">2 ТБ</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-[12px] text-[#333] leading-relaxed line-clamp-3">
                        16.2" Liquid Retina XDR (3456x2234) 120 Гц, глянцевий / Apple M5 Pro / RAM 24 ГБ / SSD 1 ТБ / Apple M5 Pro Graphics (20 ядер) / macOS Tahoe / 2.14 кг
                    </div>
                </div>
            </div>
        </div>
    )
}