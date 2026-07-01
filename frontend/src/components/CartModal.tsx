import { X, Trash2 } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../store/hooks/hook"
import { removeFromCart, decreaseQuantity, addToCart } from "../store/cart/cartSlice"

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cardItem.items);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            style={{ padding: '16px' }}
            onClick={onClose} 
        >
            <div 
                className="bg-white rounded-xl flex flex-col shadow-2xl relative overflow-hidden"
                style={{ width: '100%', maxWidth: '900px', minHeight: '450px', maxHeight: '90vh' }}
                onClick={(e) => e.stopPropagation()} 
            >
              
                <div className="flex justify-between items-center border-b border-gray-200 shrink-0" style={{ padding: '24px' }}>
                    <h2 className="text-2xl font-bold text-gray-900">Кошик</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition">
                        <X size={28} strokeWidth={2} />
                    </button>
                </div>

                
                <div className="overflow-y-auto flex-1 bg-white" style={{ padding: '24px' }}>
                    {cartItems.length === 0 ? (
                       <div className="flex flex-col items-center justify-center" style={{ padding: '48px 24px' }}>
                            <img 
                                src="https://xl-static.rozetka.com.ua/assets/img/design/modal-cart-dummy.svg" 
                                alt="Порожній кошик" 
                                style={{ width: '240px', height: '240px', marginBottom: '32px', objectFit: 'contain' }}
                            />
                            <h3 className="text-2xl font-bold text-gray-900" style={{ marginBottom: '12px' }}>Кошик порожній</h3>
                            <p className="text-gray-500" style={{ fontSize: '15px' }}>Але це ніколи не пізно виправити :)</p>
                        </div>
                    ) : (
                        <div className="flex flex-col" style={{ gap: '16px' }}>
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center border border-gray-200 rounded-xl" style={{ padding: '16px', gap: '16px' }}>
                                    
                                    <div className="shrink-0 flex items-center justify-center" style={{ width: '64px', height: '64px' }}>
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="max-w-full max-h-full object-contain mix-blend-multiply" 
                                        />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0" style={{ paddingRight: '16px' }}>
                                        <h3 className="text-gray-900 line-clamp-2 leading-snug" style={{ fontSize: '14px' }}>{item.title}</h3>
                                        <p className="text-gray-500" style={{ fontSize: '12px', marginTop: '4px' }}>Продавець: ROZETKA</p>
                                    </div>

                                    <div className="flex items-center shrink-0" style={{ gap: '24px' }}>
                                        
                                       
                                        <div className="flex items-center justify-between border border-gray-300 rounded overflow-hidden" style={{ width: '100px', height: '36px' }}>
                                            <button 
                                                onClick={() => dispatch(decreaseQuantity(item.id))} 
                                                className="bg-white hover:bg-gray-100 flex items-center justify-center text-gray-400 transition"
                                                style={{ width: '32px', height: '100%', fontSize: '18px' }}
                                            >
                                                -
                                            </button>
                                            <span className="font-medium" style={{ fontSize: '15px' }}>{item.quantity}</span>
                                            <button 
                                                onClick={() => dispatch(addToCart(item))} 
                                                className="bg-white hover:bg-gray-100 flex items-center justify-center text-[#3e77aa] transition"
                                                style={{ width: '32px', height: '100%', fontSize: '18px' }}
                                            >
                                                +
                                            </button>
                                        </div>
                                        
                                      
                                        <span className="font-bold text-gray-900 text-right" style={{ width: '100px', fontSize: '20px' }}>
                                            {(item.price * item.quantity).toFixed(0)} ₴
                                        </span>
                                        
                                        <button 
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="text-gray-400 hover:text-red-500 transition"
                                            title="Видалити"
                                            style={{ padding: '4px' }}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 bg-white shrink-0 flex items-center justify-between" style={{ padding: '24px' }}>
                        
                        <button 
                            onClick={onClose}
                            className="border border-gray-200 hover:border-gray-300 text-[#3e77aa] font-medium rounded-lg transition bg-white"
                            style={{ padding: '10px 24px' }}
                        >
                            Продовжити покупки
                        </button>

                        <div className="bg-[#f4faf6] border border-[#00a046] rounded-lg flex items-center" style={{ padding: '16px 24px', gap: '24px' }}>
                            <span className="font-bold text-gray-900 leading-none" style={{ fontSize: '28px' }}>
                                {totalPrice.toFixed(0)} <span style={{ fontSize: '20px' }}>₴</span>
                            </span>
                            <button className="bg-[#00a046] hover:bg-[#008d3d] text-white font-bold rounded-lg transition" style={{ padding: '12px 32px', fontSize: '16px' }}>
                                Оформити замовлення
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}