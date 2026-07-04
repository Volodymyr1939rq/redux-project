import { useSearchParams } from "react-router-dom"
import { useGetAllItemsQuery } from "../store/api/api"
import { EmptySearchPage } from "./EmptySearchPage"

export const SearchPage=()=>{
    const [searchParam]=useSearchParams()
    const searchQuery=searchParam.get('text') || ''

    const {data:searchResults,isFetching}=useGetAllItemsQuery(
        searchQuery,
        {skip:!searchQuery}
    )

    if(isFetching){
        return <div className="p-10 text-center text-xl">Шукаємо...</div>
    }

    if(searchResults && searchResults.length===0){
        return <EmptySearchPage/>
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">
                Результати пошуку «{searchQuery}»
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
                {searchResults?.map(item => (
                    <div key={item.id} className="border p-4 rounded-md">
                        {item.title}
                    </div>
                ))}
            </div>
        </div>
    );
}