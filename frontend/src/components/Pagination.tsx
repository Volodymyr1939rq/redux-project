import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom"

interface PaginationProps{
    lastPage:number;
}
export const Pagination=({lastPage}:PaginationProps)=>{
    const [searchParams,setSearchParams]=useSearchParams()

    const currentPage=Number(searchParams.get('page')) || 1

    if(lastPage<=1) return null

    const handlePageChange=(page:number)=>{
        const params=new URLSearchParams(searchParams)
        params.set('page',page.toString())
        setSearchParams(params)

        window.scrollTo({top:0,behavior:'smooth'})
    } 

    const pages=Array.from({length:lastPage},(_,i)=>i+1)

    return (
        <div className="flex w-full flex-col items-center" style={{marginTop:'40px',marginBottom:'36px'}}>
            {currentPage<lastPage && (
               <div style={{marginBottom:'24px'}}>
                <button onClick={()=>handlePageChange(currentPage+1)}
                    className="bg-[#00a046] hover:bg-[#00873a] text-white text-[16px] font-medium transition-colors rounded-xl"
                    style={{padding:'12px 32px'}}>
                        Показати ще
                    </button>
               </div>
            )}
            <div className="w-full border-t border-gray-200 " style={{marginBottom:'24px'}}></div>
            <div className="flex items-center justify-center gap-2">
                <button
                onClick={()=>handlePageChange(currentPage-1)}
                disabled={currentPage===1}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#00a046] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <ChevronLeft size={24}/>
                </button>
                {pages.map((page)=>(
                    <button 
                    key={page}
                    onClick={()=>handlePageChange(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl text-[14px] font-medium transition-colors ${
                        currentPage===page
                        ? "border border-[#00a046] text-[#00a046] bg-[#f2fbf5]"
                        : "border border-gray-200 text-[#221f1f] hover:border-gray-400 bg-white"
                    }`}>
                        {page}
                    </button>
                ))}
                <button
                onClick={()=>handlePageChange(currentPage+1)}
                disabled={currentPage===lastPage}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#00a046] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight size={24}/>
                </button>
            </div>
        </div>
    )
}