import { Baby, Bath, BatteryCharging, Car, Gamepad2, Gift, Laptop, Martini, Monitor, Paperclip, PawPrint, Shirt, Smartphone, Smile, Sofa, SprayCan, Star, Tag, TreePine, Wrench } from "lucide-react"
import { FaDribbble } from "react-icons/fa"

const iconProps = { size: 22, strokeWidth: 1.5 };

const categories = [
    { name: 'Ноутбуки та комп\'ютери', icon: <Laptop {...iconProps} /> },
    { name: 'Смартфони, ТВ і електроніка', icon: <Smartphone {...iconProps} /> },
    { name: "Товари для геймерів", icon: <Gamepad2 {...iconProps} /> },
    { name: "Побутова техніка", icon: <Monitor {...iconProps} /> },
    { name: "Товари для дому", icon: <Sofa {...iconProps} /> },
    { name: "Авто і мото", icon: <Car {...iconProps} /> },
    { name: "Інструменти та обладнання", icon: <Wrench {...iconProps} /> },
    { name: "Сантехніка та ремонт", icon: <Bath {...iconProps} /> },
    { name: "Дача, сад і город", icon: <TreePine {...iconProps} /> },
    { name: "Спорт і захоплення", icon: <FaDribbble size={22} /> },
    { name: "Одяг, взуття та прикраси", icon: <Shirt {...iconProps} /> },
    { name: "Краса та здоров'я", icon: <Smile {...iconProps} /> },
    { name: "Дитячі товари", icon: <Baby {...iconProps} /> },
    { name: 'Зоотовари', icon: <PawPrint {...iconProps} /> },
    { name: 'Офіс, школа, книги', icon: <Paperclip {...iconProps} /> },
    { name: 'Алкогольні напої та продукти', icon: <Martini {...iconProps} /> },
    { name: 'Побутова хімія', icon: <SprayCan {...iconProps} /> },
    { name: 'Енергонезалежність', icon: <BatteryCharging {...iconProps} /> },
    { name: 'Подарунки та сувеніри', icon: <Gift {...iconProps} /> },
    { name: 'Топи продажів', icon: <Star {...iconProps} /> },
    { name: 'Всі акції', icon: <Tag {...iconProps} /> }
];

export const SideBar = () => {
    return (
        <aside 
            style={{ width: '350px', flexShrink: 0, borderRight: '1px solid #e5e7eb',paddingTop:'20px',paddingLeft:'30px' }} 
            className="hidden lg:block"
        >
         
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                
                <div style={{ backgroundColor: '#e5f4eb', padding: '16px', cursor: 'pointer', borderBottom: '1px solid #e5e7eb' }}>
                    <div style={{ fontWeight: 'bold', color: '#221f1f', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <div style={{ backgroundColor: 'white', borderRadius: '2px', padding: '0 4px', fontSize: '10px', border: '1px solid #00a046', height: '18px', display: 'flex', alignItems: 'center' }}>
                            💳
                        </div>
                        Картка Rozetka
                    </div>
                    <div style={{ fontSize: '13px', color: '#4d4b4b' }}>Персональні знижки та бонуси</div>
                </div>

                <div style={{ backgroundColor: '#fff8d6', padding: '16px', cursor: 'pointer', borderBottom: '1px solid #e5e7eb' }}>
                    <div style={{ fontWeight: 'bold', color: '#221f1f', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ backgroundColor: '#ffeb00', color: 'black', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '12px', fontWeight: 900, letterSpacing: '-1px' }}>
                            S!
                        </span>
                        Підписка Smart
                    </div>
                    <div style={{ fontSize: '13px', color: '#4d4b4b', lineHeight: '1.2' }}>
                        Безкоштовна доставка з Rozetka+Prom за 50 ₴/міс
                    </div>
                </div>
                
            </div>

            <ul style={{ display: 'flex', flexDirection: 'column', padding: '12px 16px 12px 8px', margin: 0, listStyle: 'none' }}>
                {categories.map((cat, index) => (
                    <li key={index}>
                        <a
                            href="#"
                            className="text-[#221f1f] hover:text-[#00a046] hover:bg-[#e5f4eb] rounded-lg group transition-colors"
                            style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px 12px', fontSize: '15px', textDecoration: 'none'}}
                        >
                            <span 
                                className="text-[#797878] group-hover:text-[#00a046] transition-colors " 
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px' }}
                            >
                                {cat.icon}
                            </span>
                            {cat.name}
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    )
}