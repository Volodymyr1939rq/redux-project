import { Link, useParams } from "react-router-dom"
import { useGetAllItemsQuery, useGetCategoryByIdQuery } from "../store/api/api"
import { PromoSlider } from "../components/PromoSlider"
import { SubCategoriesGrid } from "../components/SubCategoriesGrid"
import { CategoryBrands } from "../components/CategoryBrands"
import { PopularProducts } from "../components/PopularProducts"
import { CatalogPage } from "./CatalogPage"
import { BreadCrumbs } from "../components/BreadCrumbs"

export const CategoryPage=()=>{
    const {id}=useParams<{id:string}>()

    const {data:category,isLoading:isCategoryLoading}=useGetCategoryByIdQuery(id!)

    const {data:categoryResponse,isLoading:isProductLoading}=useGetAllItemsQuery({
        categoryId:id,
        limit:10
    })
    const popularCategories=category?.children?.slice(0,8) || []
    if(!isCategoryLoading && category && category.parentId){
        return <CatalogPage/>
    }
    const breadcrumbs=category?.breadcrumbs?.map((b)=>({
        label:b.title,
        path:`/category/${b.id}`
    })) || []
    return(
        <div className="font-sans" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 40px 24px' }}>
            {breadcrumbs?.length>0 && (
                <div className="mb-4">
                    <BreadCrumbs item={breadcrumbs}/>
                </div>
            )}
            {isCategoryLoading ? (
                <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-md" style={{marginBottom:'6px'}}></div>

            ):(
                <h1 className="text-4xl font-bold text-[#221f1f]" style={{marginTop:'20px'}}>
                    {category?.title}
                </h1>
            )}
            <div className="flex flex-col lg:flex-row gap-8 items-start" style={{marginLeft:'32px',marginBottom:'48px'}}>
            <div className="flex-1 lg:w-[55%] min-w-0 rounded-lg">
                <PromoSlider height="280px"/>
            </div>
            <div className="w-full lg:w-[45%] shrink-0">
                <h3 className="text-[16px] font-bold text-[#221f1f]" style={{marginBottom:"25px"}}>
                    Популярні категорії
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {popularCategories.map((cat:any)=>(
                        <Link 
                        key={cat.id}
                        to={`/category/${cat.id}`}
                        className="flex items-center gap-3 group cursor-pointer border-b border-[#e5e5e5]" style={{paddingBottom:'16px'}}
                        >
                            <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-white">
                                <img
                                src={cat.image || 'https://placehold.co/200x200/transparent/3e77aa?text=No+Image'}
                                alt={cat.title}
                                className="max-w-full max-h-full object-contain mix-blend-multiply"/>
                            </div>
                            <span className="text-[13px] text-[#3e77aa] group-hover:text-[#f84147] transition-colors leading-tight line-clamp-3">
                                {cat.title}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
            </div>
            <div style={{marginTop:'50px',marginLeft:'30px'}}>
                <SubCategoriesGrid subCategories={category?.children}
                isLoading={isCategoryLoading}/>
            </div>
           
            <div style={{marginBottom:'24px',marginLeft:'30px'}}>
                <CategoryBrands/>
            </div>
            {!isProductLoading && categoryResponse?.data && (
            <div style={{marginBottom:'24px',marginLeft:'30px'}}>
                <PopularProducts products={categoryResponse.data}/>
            </div>
            )}
        </div>
    )
}