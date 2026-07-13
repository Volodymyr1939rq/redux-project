import { ChevronUp } from "lucide-react"
import Slider from "rc-slider"
import { useEffect, useState } from "react"
import "rc-slider/assets/index.css"
import { useSearchParams } from "react-router-dom"


export const PriceFilter=()=>{
    const [searchParams,setSearchParam]=useSearchParams()
    const minPrice=Number(searchParams.get('minPrice')) || 0
    const maxPrice=Number(searchParams.get('maxPrice')) || 100000
   
    const [range,setRange]=useState([minPrice,maxPrice])

    const updateUrlParams=(newRange:number[])=>{
      const params=new URLSearchParams(searchParams)
      params.set("minPrice",newRange[0].toString())
      params.set("maxPrice",newRange[1].toString())
      setSearchParam(params)
    }
    const handleInputChange=(index:number,value:string)=>{
        const newValue=parseInt(value) || 0
        const newRange=[...range]
        newRange[index]=newValue
        setRange(newRange)
        updateUrlParams(newRange)
    }

    useEffect(()=>{
        setRange([
            Number(searchParams.get('minPrice')) || 0,
            Number(searchParams.get('maxPrice')) || 100000
        ])
    },[searchParams])

    return (
        <div className="border-b border-gray-200 " style={{paddingBottom:'20px',marginBottom:'20px',marginTop:'16px'}}>
             <div className="group cursor-pointer flex justify-between items-center" style={{marginBottom:'16px'}}>
                        <h3 className="text-[15px] text-[#221f1f] font-medium" style={{marginBottom:'15px'}}>
                           Ціна, грн
                        </h3>
                           <ChevronUp size={18} className="text-gray-400"/>
                            </div>
                <div className="flex items-center gap-3" style={{marginBottom:'24px'}}>
                    <input 
                    type="number"
                    value={range[0]}
                    onChange={(e)=>handleInputChange(0,e.target.value)}
                    className="border border-gray-300 rounded-md outline-none focus:border-[#00a046] text-[15px] w-[102px] h-9 " style={{paddingLeft:'9px',paddingRight:'9px'}}
                    />
                    <span className="text-gray-500">-</span>
                    <input 
                    type="number"
                    value={range[1]}
                    onChange={(e)=>handleInputChange(1,e.target.value)}
                    className="border border-gray-300 rounded-md outline-none focus:border-[#00a046] text-[15px] w-[102px] h-9 " style={{paddingLeft:'9px',paddingRight:'9px'}}/>
                </div>
                <div style={{paddingLeft:'8px',paddingRight:'8px',marginBottom:'8px'}}>
                    <Slider
                    range
                    min={0}
                    max={100000}
                    value={range}
                    onChange={(val)=>setRange(val as number[])}
                    onChangeComplete={(val)=>updateUrlParams(val as number[])}
                    styles={{
                        track:{
                            backgroundColor:'#00a046',
                            height:'4px'
                        },
                        rail:{
                            backgroundColor:'#e5e5e5',
                            height:'4px'
                        },
                        handle:{
                            borderColor:'#00a046',
                            backgroundColor:'#00a046',
                            width:'25px',
                            height:'25px',
                            marginTop:'-10px',
                            boxShadow:'0 1px 3px rgba(0,0,0,0.2)',
                            opacity:1,
                            borderRadius:'50%',
                            cursor:'pointer'
                        }
                    }}/>
                </div>
        </div>
    )
}