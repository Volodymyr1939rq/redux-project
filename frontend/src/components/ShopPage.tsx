
import { useGetAllItemsQuery } from "../store/api/api"

import { ProductCard } from "./ProductCard"
import { PromoSlider } from "./PromoSlider";
import { SideBar } from "./SideBar";

export const ShopPage=()=>{
    // const dispatch=useAppDispatch()
    
    const {data:items,isLoading,error}=useGetAllItemsQuery();
    console.log("Дані апі:",{items,isLoading,error});
    
    return (
        <div className="min-h-screen bg-white pt-4 font-sans text-gray-900">
            <div className="max-w-310 mx-auto w-full px-4 flex items-start">
                <SideBar/>
            
            <main className="flex-1 min-w-0 " style={{paddingLeft:'40px'}}>
                <PromoSlider/>
               <h2 className="text-xl font-bold mb-8"style={{marginLeft:'3px',marginTop:'60px'}}>Рекомендації на основі ваших переглядів</h2>
               {isLoading && (
                <div className="text-center mt-20 text-xl font-bold">Завантаження...</div>
               )}
               {error && (
                <div className="text-center mt-20 text-xl text-red-500 font-bold">Помилка завантаження товарів</div>
               )}
            {!isLoading && !error && (
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0" style={{marginTop:'10px'}}>
            {items?.data?.map((item)=>(
                <ProductCard key={item.id} product={item}/>
            ))}
          </div>
            )}
            </main>
            </div>
        </div> 
    )
}