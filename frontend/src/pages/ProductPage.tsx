import { ArrowRight, Calculator, Check, ChevronLeft, ChevronRight, Heart, Scale, ShoppingCart, Star } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../store/hooks/hook"
import { useParams } from "react-router-dom"
import { addToCart, openCart} from "../store/cart/cartSlice"
import { useGetProductByIdQuery } from "../store/api/api"

export const ProductPage = () => {
    const { id } = useParams()
    console.log('ID обраного товару', id)
    const dispatch = useAppDispatch()
    const cartItems=useAppSelector((state)=>state.cardItem.items)
    
    const {data:currentProduct,isLoading,isError}=useGetProductByIdQuery(id as string)

    if(isLoading){
        return <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">Завантаження товару...</div>;
    }

    if(isError || !currentProduct){
        return <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] text-red-500">Товар не знайдено!</div>;
    }

    const itemIsAlreadyExists=cartItems.some((item)=>item.id===currentProduct.id)
    const handleAddToCart=()=>{
        dispatch(addToCart(currentProduct))
        dispatch(openCart())
    }
    return (
        <div className="min-h-screen bg-[#f5f5f5] font-sans text-gray-900" style={{ paddingBottom: '60px' }}>
            <div style={{ maxWidth: '1240px', margin: '0 auto', paddingTop: '20px', paddingLeft: '16px', paddingRight: '16px' }}>
                
                <div className="sticky z-40 top-18 bg-white rounded-lg shadow-sm border border-gray-200" style={{ marginBottom: '16px' }}>
                    <div className="flex items-center gap-8" style={{ paddingLeft: '24px' }}>
                        <div className="relative  text-[#00a046] font-medium cursor-pointer " style={{ padding: '16px 0', fontSize: '15px' }}>
                            Про товар
                            <div className="absolute left-0 w-full"
                            style={{height:'2px',backgroundColor:'#00a046',bottom:'8px'}}/>
                        </div>
                        <div className="relative transition cursor-pointer text-gray-800 hover:text-[#00a046] font-medium group" style={{ padding: '16px 0', fontSize: '15px' }}>
                            Характеристики
                            <div className="absolute left-0 w-full bg-[#00a046] opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{height:'2px',bottom:'8px'}}/>
                        </div>
                        <div className="relative  transition cursor-pointer text-gray-800 hover:text-[#00a046] font-medium group" style={{ padding: '16px 0', fontSize: '15px' }}>
                            Відгуки та питання 5/1
                            <div className="absolute left-0 w-full bg-[#00a046] opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{height:'2px',bottom:'8px'}}/>
                        </div>
                        <div className="relative  transition cursor-pointer text-gray-800 hover:text-[#00a046] font-medium group" style={{ padding: '16px 0', fontSize: '15px' }}>
                            Купують разом
                            <div className="absolute left-0 w-full bg-[#00a046] opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{height:'2px',bottom:'8px'}}/>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    
                    <div className="md:col-span-7 bg-white rounded-lg shadow-sm border border-gray-200 relative flex items-center justify-center" style={{ minHeight: '530px', padding: '40px' }}>
                        
                        <div className="absolute left-6 top-6 bg-yellow-300 font-black px-2 py-0.5 rounded text-xs tracking-wider">
                            SMART
                        </div>

                        <button className="absolute left-4 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:shadow-md transition" style={{ width: '40px', height: '40px' }}>
                            <ChevronLeft size={24} className="text-gray-400" />
                        </button>
                        <button className="absolute right-4 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:shadow-md transition" style={{ width: '40px', height: '40px' }}>
                            <ChevronRight size={24} className="text-gray-400" />
                        </button>

                   
                        <div className="w-full h-full flex items-center justify-center" style={{ maxHeight: '420px' }}>
                            <img
                                src={currentProduct.image}
                                alt={currentProduct.title}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-5 flex flex-col gap-4">
                        
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200" style={{ padding: '24px' }}>
                            <h1 className="font-bold text-gray-900" style={{ fontSize: '18px', lineHeight: '1.3', marginBottom: '16px' }}>
                               {currentProduct.title}
                            </h1>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-1">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
                                    </div>
                                    <span className="text-[#3e77aa] text-sm ml-1 hover:underline cursor-pointer">5 відгуків</span>
                                </div>
                                <span className="text-gray-400 text-sm">Код: 383110854</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200" style={{ padding: '24px' }}>
                            
                            <div className="flex items-center gap-2 border-gray-100" style={{ paddingBottom: '16px' }}>
                                <span className="text-gray-500 text-sm">Продавець:</span>
                                <span className="font-bold text-gray-900 flex items-center gap-1 text-sm">
                                    <span className="bg-[#00a046] rounded-full w-4 h-4 flex items-center justify-center text-white text-[9px] font-bold">R</span>
                                    {currentProduct.seller}
                                </span>
                            </div>

                            <div className="border-b border-gray-200 " style={{marginLeft:'-24px',marginRight:'-24px',marginBottom:'16px'}}></div>

                            <div className="flex items-center gap-1 text-[#00a046] font-medium" style={{ marginBottom: '12px', fontSize: '14px' }}>
                                <Check size={16} strokeWidth={3} />
                                <span>Є в наявності</span>
                            </div>

                            <div className="flex justify-between items-start" style={{ marginBottom: '16px' }}>
                                <div>
                                    <div className="text-gray-400 line-through text-sm" style={{ marginBottom: '2px' }}>{currentProduct.oldPrice} ₴</div>
                                    <div className="text-[#f84147] font-bold flex items-baseline" style={{ fontSize: '36px', lineHeight: '1' }}>
                                        {currentProduct.price} <span style={{ fontSize: '22px', marginLeft: '4px', fontWeight: 'bold' }}>₴</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-400" style={{ marginTop: '12px' }}>
                                    <button className="hover:text-gray-700 transition"><Scale size={24} strokeWidth={1.5} /></button>
                                    <button className="hover:text-orange-500 transition flex items-center gap-0.5">
                                        <Heart size={24} strokeWidth={1.5} />
                                        <span style={{ fontSize: '12px' }}>79</span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-[#f4faf6] border border-[#00a046] rounded-lg flex items-center justify-between" style={{ padding: '12px', marginBottom: '16px', cursor: 'pointer' }}>
                                <div className="flex items-center gap-2 pr-2">
                                    <div className="bg-[#00a046] text-white font-bold rounded text-[11px]" style={{ padding: '2px 6px' }}>1 044 ₴</div>
                                    <span className="text-gray-700 font-medium text-xs leading-tight">Ціна при оплаті Карткою Rozetka</span>
                                </div>
                                <ArrowRight size={16} className="text-gray-400 shrink-0" />
                            </div>
                               
                            <div style={{marginBottom:'16px'}}>
                               {itemIsAlreadyExists ? (
                                <div onClick={handleAddToCart}
                                className="w-full flex items-cetner justify-center gap-2 cursor-pointer select-none"
                                style={{padding:'14px 0'}}>
                                    <div className="text-[#00a046] flex items-center justify-center">
                                        <ShoppingCart size={20} strokeWidth={1.5} fill="none"/>
                                    </div>
                                    <span className="text-[#3e77aa] hover:text-[#f84147] font-normal border-b border-dotted border-[#3e77aa] hover:border-[#f84147] transition-colors"
                                    style={{fontSize:'18px',paddingBottom:'1px'}}>
                                        В кошику
                                    </span>
                                </div>
                               ):(
                            <button className="w-full bg-[#00a046] hover:bg-[#008d3d] text-white font-bold rounded-lg transition" 
                            style={{ padding: '14px', fontSize: '18px'}}
                            onClick={handleAddToCart}>
                                Купити
                            </button>
                               )}
                            </div>

                            <div className="border-b border-gray-200" style={{marginLeft:'-24px',marginRight:'-24px',marginTop:'8px',marginBottom:'16px'}}></div>

                            <div className="flex items-center gap-2 text-gray-500" style={{ fontSize: '13px' }}>
                                <Calculator size={24} className="text-gray-600" />
                                <span className="font-medium text-[15px] text-gray-600">{currentProduct.oldPrice} ₴ за 1 шт <span className="font-medium text-[15px] text-gray-400">/ 1 099 ₴ за 24 шт</span> </span>
                            </div>

                        </div>

                  
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-between cursor-pointer group" style={{ padding: '16px 24px' }}>
                            <span className="text-[#3e77aa] group-hover:text-[#f84147] transition-colors" style={{ fontSize: '15px' }}>
                                Усі товари бренду <span className="font-bold">{currentProduct.title}</span>
                            </span>
                            <ArrowRight size={18} className="text-gray-400 group-hover:text-[#f84147] transition-colors" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}