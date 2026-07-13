import { useSearchParams } from "react-router-dom"

export const SortFilter=()=>{
    const [searchParams,setSearchParams]=useSearchParams()

    const currentSort=searchParams.get('sort') || 'rating'

    const handleSortChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        const value=e.target.value
        const params=new URLSearchParams(searchParams)

        if(value==='rating'){
            params.delete('sort')
        }else{
            params.set('sort',value)
        }
        setSearchParams(params)
    }

    return (
         <select 
         value={currentSort}
         onChange={handleSortChange}
         className="border border-gray-300 text-[14px] text-gray-700 outline-none focus:border-[#00a046] cursor-pointer bg-white rounded-md h-10"
                        style={{padding:'6px 32px 6px 12px',appearance:'auto'}}>
                           <option value={'rating'}>За рейтингом</option>
                           <option value={'cheap'}>Від дешевих до дорогих</option>
                           <option value={'expensive'}>Від дорогих до дешевих</option>
                           <option value={'novelty'}>Новинки</option>
                        </select>
    )
}