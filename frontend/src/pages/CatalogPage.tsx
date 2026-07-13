import { Link, useParams, useSearchParams } from "react-router-dom"
import { useGetAllBrandsQuery, useGetAllItemsQuery, useGetCategoryByIdQuery } from "../store/api/api";
import { Loader, X } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { LayoutToggle } from "../components/LayoutToggle";
import { PriceFilter } from "../components/PriceFilter";
import { BrandFilter } from "../components/BtandFilter";
import { SellerFilter } from "../components/SellerFilter";
import { SortFilter } from "../components/SortFilter";
import { Pagination } from "../components/Pagination";

export const CatalogPage=()=>{
    const {id:categoryId}=useParams<{id:string}>()
    const [searchParams,setSearchParams]=useSearchParams()
    const minPrice=searchParams.get('minPrice')|| undefined
    const maxPrice=searchParams.get('maxPrice') || undefined
    const brand=searchParams.get('brand') || undefined
    const seller = searchParams.get("sellers") || undefined
    const sort=searchParams.get('sort') || undefined
    const page=searchParams.get('page') || 1
    const layout=searchParams.get('layout') || 'large'
    const {data:categoryResponse,isLoading:isProductLoading}=useGetAllItemsQuery({
        categoryId:categoryId,
        limit:20,
        minPrice,
        maxPrice,
        brand,
        seller,
        sort,
        page
    })
    const {data:category}=useGetCategoryByIdQuery(categoryId!)
    const {data:allBrands=[]}=useGetAllBrandsQuery()
    const activeBrands=brand ? brand.split(','):[]
    const activeSellers=seller ? seller.split(',') : []
    const hasActiveFilter=activeBrands.length>0 || activeSellers.length>0 || minPrice || maxPrice

    const removeFilter=(key:string,valueToRemove?:string)=>{
         const params=new URLSearchParams(searchParams)
         if(valueToRemove){
            const currentValues=params.get(key)?.split(',') || []
            const newValue=currentValues.filter(v=>v!==valueToRemove)

            if(newValue.length>0){
               params.set(key,newValue.join(','))
            }else{
                params.delete(key)
            }
         }else{
            params.delete(key)
         }
         params.delete('page')
         setSearchParams(params)
    }

    const cleanAllFilter=()=>{
        const params=new URLSearchParams()
        const sort=params.get("sort")
        if(sort) {
            params.set('sort',sort)
        }
            setSearchParams(params)
    }

    return (
       <div className="font-sans" style={{maxWidth:'1200px',margin:'0 auto',padding:'20px 24px 40px 24px'}}>
        <div className="text-3xl font-bold text-[#221f1f]" style={{marginBottom:'24px'}}>
            {category?.title}
        </div>
        
            {category?.children && category.children.length>0 && (
              <div style={{marginBottom:'40px'}}>
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-x-2 gap-y-6">

            {category.children.map((cat:any)=>(
                <Link key={cat.id}
                to={`/category/${cat.id}`}
                className="flex flex-col items-center w-28 gap-2 group cursor-pointer">
                   <div className="h-16 w-16 flex items-center justify-center">
                    <img src={cat.image || 'https://placehold.co/200x200/transparent/3e77aa?text=No+Image'}
                    alt={cat.title}
                    className="max-w-100% max-h-100% object-contain mix-blend-multiply"
                    />
                   </div>
                   <span className="text-[13px] text-center text-[#333] group-hover:text-[#f84147] transition-colors leading-snug">
                    {cat.title}
                   </span>
                </Link>
            ))}
                </div>
              </div>
             )}
         
         <div className="border-b border-gray-200" style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center',gap:'16px',paddingBottom:'16px'}}>
            <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[14px] text-gray-500">
                    Знайдено {categoryResponse?.total || 0} товарів 
                </span>
                {hasActiveFilter && (
                <button 
                onClick={cleanAllFilter}
                className="text-[13px] text-gray-500 hover:text-[#f84147] border border-gray-300 hover:border-[#f84147] transition-colors bg-white rounded-2xl" style={{padding:'6px 12px' }}>
                    Очистити все
                </button>
                )}
                {activeSellers.map(sellerValue=>(
                <div 
                key={sellerValue}
                onClick={()=>removeFilter('sellers',sellerValue)}
                className="bg-gray-100 text-[13px] cursor-pointer hover:bg-gray-200 transition-colors flex items-center gap-2 rounded-2xl" style={{padding:'6px 12px'}}>
                    {sellerValue==='other' ? 'Інші продавці' : sellerValue}
                    <X size={14} className="text-red-400 hover:text-red-500"/>
                </div>
                ))}
                {activeBrands.map(brandId=>{
                    const brandObj=allBrands.find((b:any)=>b.id===brandId)
                    const brandName=brandObj ? brandObj.name : "Завантаження..."

                    return (
                    <div
                        key={brandId}
                        onClick={()=>removeFilter('brand',brandId)}
                        className="bg-gray-100 text-[13px] cursor-pointer hover:bg-gray-200 transition-colors flex items-center gap-2 rounded-2xl" style={{padding:'6px 12px'}}
                        >
                        {brandName}
                        <X size={14} className="text-red-400 hover:text-red-500"/>
                    </div>
                    );
                })}
                {(minPrice || maxPrice) && (
                   <div
                   onClick={()=>{removeFilter('minPrice');removeFilter('maxPrice')}}
                   className="bg-gray-100 text-[13px] cursor-pointer hover:bg-gray-200 transition-colors flex items-center gap-2 rounded-2xl"
                   style={{padding:'6px 12px'}}
                   >
                    {minPrice && maxPrice ? `${minPrice}-${maxPrice} ₴` : minPrice ? `Від ${minPrice} ₴` : `До ${maxPrice} ₴`}
                     <X size={14} className="text-red-400 hover:text-red-500"/>
                   </div>
                )}
            </div>
            <div className="flex items-center gap-2">
                    <SortFilter/>
                    <LayoutToggle/>
            </div>
         </div>
         <div className="flex items-start gap-8" >
            <aside className="w-64 shrink-0">
                <div className="sticky top-4">
                    <div className="border-r border-[#e5e5e5]" style={{paddingRight:'16px',paddingTop:'24px'}}>
                        <PriceFilter/>
                        <SellerFilter/>
                        <BrandFilter/>
                    </div>
                </div>
            </aside>
            <div className="flex-1 min-w-0">
                {isProductLoading ? (
                    <div className="flex justify-center" style={{padding:'40px'}}>
                        <Loader className="animate-ring font-bold"/>
                    </div>
                ): categoryResponse?.data && categoryResponse.data.length>0 ? (
                    <>
                    <div className={`border-l border-t border-gray-200 grid gap-0 ${
                        layout==='large'
                        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                        : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'
                    }`}>
                        {categoryResponse.data.map((item:any)=>(
                            <ProductCard key={item.id} product={item}/>
                        ))}
                    </div>
                    <Pagination lastPage={categoryResponse.lastPage}/>
                    </>
                ):(
                    <div className="text-gray-500 text-center" style={{padding:'40px'}}>
                        Поки нема товарів
                    </div>
                )}
            </div>
         </div>
       </div>
    )
}