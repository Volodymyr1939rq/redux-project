import { Home } from "lucide-react"
import { Link } from "react-router-dom"

interface BreadCrumbsItem{
    label:string,
    path:string
}
interface BreadCrumbsProps{
    item:BreadCrumbsItem[]
}
export const BreadCrumbs=({item}:BreadCrumbsProps)=>{
    return (
        <nav className="flex items-center gap-1.5 text-[13px] text-[#797878] mb-4 select-none flex-wrap">
            <Link to={'/'}
            className="hover:text-[#00a046] transition-colors flex item-center">
                <Home size={20}/>
            </Link>
            {item.map((items,index)=>{
                const isLast=index===item.length-1

                return (
                    <div key={items.path+index} className="flex items-center gap-1.5">
                        <span className="text-[#bfbebe] text-[11px] font-light">/</span>
                        {isLast ? (
                        <span className="text-[#221f1f] cursor-default">
                            {items.label}
                        </span>
                        ):(
                    <Link to={items.path}
                    className="hover:text-[#00a046] hover:underline transition-colors">
                      {items.label}
                    </Link>
                        )}
                    </div>
                )
            })}
        </nav>
    )
}