import { ShoppingCart, Trash2 } from "lucide-react"
import { addToCard, decreaseQuantity, removeFromCard } from "../store/cart/cartSlice" 
import { useAppDispatch, useAppSelector } from "../store/hooks/hook"
import { useGetAllItemsQuery } from "../store/api/api"

export const ShopPage=()=>{
    const dispatch=useAppDispatch()
    const cartItems=useAppSelector((state)=>state.cardItem.items) 
    const totalItems=cartItems.reduce((total,item)=>total+item.quantity,0)
    
    const {data:items,isLoading,error}=useGetAllItemsQuery();
    console.log("Дані апі:",{items,isLoading,error});
    if (isLoading) return <div className="text-center mt-20 text-xl font-bold">Завантаження...</div>
    if (error) return <div className="text-center mt-20 text-xl text-red-500 font-bold">Помилка завантаження товарів</div>
    
    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans flex flex-col items-center">
          <header className="flex justify-between items-center mb-5 bg-white p-4 rounded-xl shadow-sm w-full max-w-4xl">
            <h1 className="font-bold text-xl">Магазин</h1>
            <div className="relative">
                <ShoppingCart size={24}></ShoppingCart>
                {totalItems>0 &&(
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold flex items-center justify-center w-5 h-5 rounded-full">
                        {totalItems}
                    </div>
                )}
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mb-10">
            {items?.map((item)=>{
                 
                 const currentIdItem=cartItems.find((product)=>product.id===item.id)
                
                 return (
                    <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg p-5 flex flex-col">
                        <img className="w-full h-48 object-contain rounded-xl mb-4"
                        src={item.image}
                        alt={item.title}
                        />
                        <h2 className="text-lg font-bold mb-2 line-clamp-2" title={item.title}>{item.title}</h2>
                        <p className="text-gray-600 mb-4 font-semibold">{item.price}$</p>
                        
                        <div className="mt-auto">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-lg">
                                    <button onClick={()=>dispatch(decreaseQuantity(item.id))}
                                        className="font-bold text-xl text-gray-600 hover:text-black transition px-2">
                                            -
                                        </button>
                                        <span className="font-bold text-lg min-w-5 text-center">
                                            {currentIdItem ? currentIdItem.quantity : 0}
                                        </span>
                                        <button onClick={()=>dispatch(addToCard(item))}
                                            className="font-bold text-xl text-gray-600 hover:text-black transition px-2">
                                            +
                                        </button>
                                </div>
                            </div>
                    
                            {!currentIdItem && (
                            <button onClick={()=>dispatch(addToCard(item))}
                            className="w-full bg-black text-white font-semibold py-2 px-4 rounded-xl hover:bg-neutral-800 transition duration-200 active:scale-95">
                                Додати в кошик
                            </button>
                            )}
                        </div>
                    </div>
                 )
            })}
          </div>
     
          <div className="mt-8 w-full max-w-md">
                {cartItems.length===0 ? (
                   <div className="text-center py-6 text-gray-600 bg-white rounded-xl shadow-sm">
                    Кошик порожній. Додайте щось у кошик.
                   </div>
                ):(
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                        <h3 className="font-bold text-lg mb-4">У вашому кошику:</h3>
                        {cartItems.map((item)=>(
                            <div key={item.id} className="flex justify-between items-center border-b pb-2 mb-2 last:border-0 last:mb-0 last:pb-0">
                               <div>
                                <span className="font-medium line-clamp-1">{item.title}</span>
                                <span className="text-gray-500 ml-2">x{item.quantity}</span>
                               </div>
                               <button 
                               onClick={()=>dispatch(removeFromCard(item.id))}
                               className="text-red-500 hover:text-red-700 ml-2 p-1">
                                <Trash2 size={20}></Trash2>
                               </button>
                            </div>
                        ))}
                    </div>
                )}
          </div>
        </div>
    )
}