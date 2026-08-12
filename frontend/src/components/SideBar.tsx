import { Baby, Bath, BatteryCharging, Car, Gamepad2, Gift, Laptop, Martini, Monitor, Package, Paperclip, PawPrint, Shirt, Smartphone, Smile, Sofa, SprayCan, Star, Tag, TreePine, Wrench } from "lucide-react"
import { FaDribbble } from "react-icons/fa"
import { useGetCategoriesQuery } from "../store/api/api";
import { Link } from "react-router-dom";
import { PromoCards } from "./PromoCards";

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
          <PromoCards/>
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