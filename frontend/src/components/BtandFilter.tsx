import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetAllBrandsQuery } from "../store/api/api";
import { useSearchParams } from "react-router-dom";

export const BrandFilter=()=>{
    const [searchParams,setSearchParam]=useSearchParams()
    const [searchTerm,setSearchTerm]=useState("")
    
    const brandsUrl=searchParams.get('brand')
    ? searchParams.get('brand')!.split(',')
    : []
    
    const [selectedBrands,setSelectedBrands]=useState<string[]>(brandsUrl)
    const {data:brands=[],isLoading}=useGetAllBrandsQuery()

    const toggleBrand=(brandId:string)=>{
        const isAlreadySelected=selectedBrands.includes(brandId)
        const newBrands=isAlreadySelected 
        ? selectedBrands.filter((id)=>id!==brandId)
        : [...selectedBrands,brandId]
        
        setSelectedBrands(newBrands)
        const params=new URLSearchParams(searchParams)
        if(newBrands.length>0){
            params.set('brand',newBrands.join(','))
        }else{
            params.delete('brand')
        }
        setSearchParam(params)
    }
    
    useEffect(()=>{
        const currentUrlBrands=searchParams.get('brand')
        ? searchParams.get('brand')!.split(',')
        : []
        setSelectedBrands(currentUrlBrands)
    },[searchParams])

    const filterBrands= brands.filter((brand)=>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    return (
        <div className="border-b border-gray-200 " style={{marginBottom:'20px',paddingBottom:'20px'}}>
            <div className="group cursor-pointer flex items-center justify-between" style={{marginBottom:'12px'}}>
                <h3 className="text-[15px] text-[#221f1f] font-medium group-hover:text-[#f84147] transition-colors">Бренди</h3>
                <ChevronUp size={18} className="text-gray-400"/>
            </div>
            
            <div className="relative " style={{marginBottom:'16px'}}>
                <input 
                    type="text"
                    placeholder="Пошук"
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    className="border border-gray-300 text-[13px] outline-none focus:border-[#00a046] w-full h-9 rounded-xl" style={{padding:'12px',marginBottom:'16px'}}
                />
            </div>
            
            <div className="max-h-56 overflow-y-auto brand-scroll flex flex-col gap-3" style={{paddingRight:'8px'}}>
                {isLoading ? (
                    <div className="text-[13px] text-gray-500 py-2">Завантаження...</div>
                ):
                filterBrands.length>0 ? (
                    filterBrands.map((brand)=>(
                        <label
                            key={brand.id}
                            className="flex items-center gap-3 group cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand.id)}
                                onChange={()=>toggleBrand(brand.id)}
                                className="w-5 h-5 accent-[#00a046] cursor-pointer"
                            />
                            <span className="text-[14px] text-[#221f1f] group-hover:text-[#f84147] transition-colors">{brand.name}</span>
                            <span className="text-[12px] text-gray-400" style={{marginLeft:'auto'}}>
                                {brand.count}
                            </span>
                        </label>
                    ))
                ):(
                    <div className="text-[14px] text-gray-500 text-center" style={{paddingTop:'8px',paddingBottom:'8px'}}>
                        Бренд не знайдено
                    </div>
                )}
            </div>
        </div>
    )
}