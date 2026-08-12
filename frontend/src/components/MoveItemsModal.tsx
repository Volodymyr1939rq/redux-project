import { useEffect, useRef, useState } from "react"
import type { WishListResponse } from "../store/api/api"
import { X } from "lucide-react"


interface MoveItemsProps{
    onClose:()=>void
    onSubmit:(targetListId:string)=>void
    wishlists:WishListResponse[]
    currentListId:string
}

export const MoveItemsModal=({onClose,onSubmit,wishlists,currentListId}:MoveItemsProps)=>{
     const ref=useRef<HTMLDivElement>(null)
     const [selectedId,setSelectedId]=useState<string | null>(null)

     const availableLists=wishlists.filter(f=>f.id!==currentListId)

     useEffect(()=>{
        const handleClickOutSide=(event:MouseEvent)=>{
            if(ref.current && !ref.current.contains(event.target as Node)){
                onClose()
            }
            document.addEventListener('mousedown',handleClickOutSide)
            return ()=>{document.removeEventListener('mousedown',handleClickOutSide)}
        }
     },[onClose])

     const handleSubmit=()=>{
        if(selectedId){
            onSubmit(selectedId)
        }

     }

     return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
            <div ref={ref}
            className="bg-white rounded-xl w-full max-w-[420px] relative shadow-xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-[22px] text-gray-900 font-bold">
                        Перемістити товар
                    </h2>
                    <button onClick={onClose}
                    className="text-gray-900 hover:text-red-400 transition-colors cursor-pointer">
                        <X size={24} strokeWidth={1.5}/>
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-[15px] text-gray-800 mb-5">
                        Виберіть список куди перенести товари
                    </p>
                    <div className="flex flex-col gap-3.5 mb-8">
                        {availableLists.length>0 ? (
                            availableLists.map(list=>(
                                <label key={list.id} className="flex items-center gap-3 cursor-pointer group">
                                    <input 
                                    type="radio"
                                    value={list.id}
                                    checked={selectedId===list.id}
                                    onChange={()=>setSelectedId(list.id)}
                                    className="w-5 h-5 accent-[#00a046] cursor-pointer"
                                    />
                                    <span className="text-[15px] text-gray-900 group-hover:text-[#3e77aa] transition-colors">
                                        {list.name}
                                    </span>
                                </label>
                            ))
                        ):(
                            <p className="text-gray-500 text-[14px]">
                                У вас немає інших списків для переміщення
                            </p>
                        )}
                    </div>
                    <div className="flex gap-4">
                       <button 
                       type="button"
                       onClick={onClose}
                       className="flex-1 py-2.5 bg-white text-[#3e77aa] border border-gray-300 hover:text-blue-400 rounded-lg font-medium text-[15px] transition-colors cursor-pointer">
                           Скасувати
                       </button>

                       <button 
                       type="button"
                       onClick={handleSubmit}
                       disabled={!selectedId}
                       className="flex-1 py-2.5 bg-[#00a046] hover:bg-[#008c3e] text-white rounded-lg font-medium text-[15px] transition-colors cursor-pointer disabled:bg-[#f5f5f5] disabled:text-[#a6a5a5] disabled:border disabled:border-gray-200 disabled:cursor-not-allowed">
                        Перемістити
                       </button>
                    </div>
                </div>
            </div>
        </div>
     )
}