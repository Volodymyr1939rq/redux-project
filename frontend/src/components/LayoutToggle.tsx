
import { useSearchParams } from "react-router-dom";

export const LayoutToggle = () => {
    const [searchParams,setSearchParams]=useSearchParams()
    const activeView=searchParams.get('layout') || 'large'

    const handleToggle=(view:'large' | 'small')=>{
        const params=new URLSearchParams(searchParams)
        params.set('layout',view)
        params.delete("page")
        setSearchParams(params)
    }

    return (
        <div className="border border-gray-300 rounded-lg inline-flex items-center bg-white p-1 gap-0">
            
            <button
                type="button" 
                onClick={() => handleToggle('large')}
                className={`flex items-center justify-center rounded-md transition-colors ${
                    activeView === 'large' 
                        ? 'bg-gray-100 text-[#221f1f]' 
                        : 'text-gray-400 hover:text-gray-600 bg-transparent'
                }`} 
             
                style={{ width: '44px', height: '40px', padding: 0, border: 'none', outline: 'none' }}
            >
               
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="3" cy="3" r="1.5" />
                    <circle cx="8" cy="3" r="1.5" />
                    <circle cx="13" cy="3" r="1.5" />
                    <circle cx="3" cy="8" r="1.5" />
                    <circle cx="8" cy="8" r="1.5" />
                    <circle cx="13" cy="8" r="1.5" />
                    <circle cx="3" cy="13" r="1.5" />
                    <circle cx="8" cy="13" r="1.5" />
                    <circle cx="13" cy="13" r="1.5" />
                </svg>
            </button>

            <button 
                type="button"
                onClick={() => handleToggle('small')}
                className={`flex items-center justify-center rounded-md transition-colors ${
                    activeView === 'small' 
                        ? 'bg-gray-100 text-[#221f1f]' 
                        : 'text-gray-400 hover:text-gray-600 bg-transparent'
                }`} 

                style={{ width: '44px', height: '40px', padding: 0, border: 'none', outline: 'none' }}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="2" cy="2" r="1.2" />
                    <circle cx="6" cy="2" r="1.2" />
                    <circle cx="10" cy="2" r="1.2" />
                    <circle cx="14" cy="2" r="1.2" />
                    <circle cx="2" cy="6" r="1.2" />
                    <circle cx="6" cy="6" r="1.2" />
                    <circle cx="10" cy="6" r="1.2" />
                    <circle cx="14" cy="6" r="1.2" />
                    <circle cx="2" cy="10" r="1.2" />
                    <circle cx="6" cy="10" r="1.2" />
                    <circle cx="10" cy="10" r="1.2" />
                    <circle cx="14" cy="10" r="1.2" />
                    <circle cx="2" cy="14" r="1.2" />
                    <circle cx="6" cy="14" r="1.2" />
                    <circle cx="10" cy="14" r="1.2" />
                    <circle cx="14" cy="14" r="1.2" />
                </svg>
            </button>
            
        </div>
    );
};