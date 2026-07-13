import { Baby, Bath, BatteryCharging, Car, Gamepad2, Gift, Laptop, Martini, Monitor, Package, Paperclip, PawPrint, Shirt, Smartphone, Smile, Sofa, SprayCan, Star, Tag, TreePine, Wrench } from "lucide-react"
import { FaDribbble } from "react-icons/fa"
import { useGetCategoriesQuery } from "../store/api/api";
import { Link } from "react-router-dom";

const iconProps = { size: 22, strokeWidth: 1.5 };

const categoryIcons:Record<string,React.ReactNode> = {
  'Ноутбуки та комп\'ютери': <Laptop {...iconProps} />,
  'Смартфони, ТВ і електроніка': <Smartphone {...iconProps} /> ,
  "Товари для геймерів": <Gamepad2 {...iconProps} /> ,
  "Побутова техніка": <Monitor {...iconProps} /> ,
  "Товари для дому": <Sofa {...iconProps} /> ,
  "Авто і мото": <Car {...iconProps} /> ,
  "Інструменти та обладнання": <Wrench {...iconProps} /> ,
  "Сантехніка та ремонт": <Bath {...iconProps} /> ,
  "Спорт і захоплення": <FaDribbble size={22} /> ,
  "Дача, сад і город": <TreePine {...iconProps} /> ,
  "Одяг, взуття та прикраси": <Shirt {...iconProps} /> ,
  "Краса та здоров'я": <Smile {...iconProps} /> ,
  "Дитячі товари": <Baby {...iconProps} /> ,
  'Зоотовари': <PawPrint {...iconProps} /> ,
  'Офіс, школа, книги': <Paperclip {...iconProps} /> ,
  'Алкогольні напої та продукти': <Martini {...iconProps} /> ,
  'Побутова хімія': <SprayCan {...iconProps} /> ,
  'Енергонезалежність': <BatteryCharging {...iconProps} /> ,
  'Подарунки та сувеніри': <Gift {...iconProps} /> ,
  'Топи продажів': <Star {...iconProps} /> ,
  'Всі акції': <Tag {...iconProps} /> 
}

export const SideBar = () => {
    const {data:dbCategories,isLoading}=useGetCategoriesQuery()
    
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
            {isLoading ? (
                <div className="p-4 text-center text-gray-500">Завантаження категорій...</div>
            ):(
            <ul style={{ display: 'flex', flexDirection: 'column', padding: '12px 16px 12px 8px', margin: 0, listStyle: 'none' }}>
                {dbCategories?.map((cat) => (
                    <li key={cat.id}>
                        <Link
                         to={`/category/${cat.id}`}
                            className="text-[#221f1f] hover:text-[#00a046] hover:bg-[#e5f4eb] rounded-lg group transition-colors"
                            style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '8px 12px', fontSize: '15px', textDecoration: 'none'}}
                        >
                       
                            <span 
                                className="text-[#797878] group-hover:text-[#00a046] transition-colors " 
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px' }}
                            >
                                {categoryIcons[cat.title] || <Package {...iconProps}/>}
                            </span>
                            {cat.title}
                        </Link>
                    </li>
                ))}
            </ul>
            )}

        </aside>
    )
}