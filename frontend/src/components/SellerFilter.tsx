import { useSearchParams } from "react-router-dom"
import { useGetUniqSellersQuery } from "../store/api/api"
import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"

export const SellerFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const getSellerUrl = searchParams.get("sellers")
        ? searchParams.get('sellers')!.split(',')
        : []

    const [selectedSeller, setSelectedSeller] = useState<string[]>(getSellerUrl)
    const { data: sellers = [], isLoading } = useGetUniqSellersQuery()

    const toggleSeller = (sellerId: string) => {
        const isAlreadySelected = selectedSeller.includes(sellerId)
        const newSeller = isAlreadySelected
            ? selectedSeller.filter((id) => id !== sellerId)
            : [...selectedSeller, sellerId]

        setSelectedSeller(newSeller)
        const params = new URLSearchParams(searchParams)
        if (newSeller.length > 0) {
            params.set('sellers', newSeller.join(','))
        } else {
            params.delete('sellers')
        }
        setSearchParams(params)
    }

    useEffect(() => {
        const currentUrlSeller = searchParams.get('sellers')
            ? searchParams.get('sellers')!.split(',')
            : []
        setSelectedSeller(currentUrlSeller)
    }, [searchParams])

    const rozetkaSeller = sellers.find(s => s.name === 'Rozetka')
    
    const otherSellersCount = sellers
        .filter(s => s.name !== 'Rozetka')
        .reduce((sum, seller) => sum + seller.count, 0) 

    return (
        <div className="border-b border-gray-200" style={{ paddingBottom: '20px', marginBottom: '20px' }}>
            <div className="group cursor-pointer flex items-center justify-between" style={{ marginBottom: '12px' }}>
                <h3 className="text-[15px] text-[#221f1f] font-medium group-hover:text-[#00a046] transition-colors">
                    Продавець
                </h3>
                <ChevronUp size={18} className="text-gray-400" />
            </div>
            
            <div className="flex flex-col gap-3 text-[14px]">
                {isLoading ? (
                    <div className="text-[13px] text-gray-500 py-2">Завантаження...</div>
                ) : (
                    <>
                        {rozetkaSeller && (
                            <label className="cursor-pointer group flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={selectedSeller.includes('Rozetka')}
                                    onChange={() => toggleSeller('Rozetka')}
                                    className="accent-[#00a046] cursor-pointer w-5 h-5"
                                />
                                <span className="group-hover:text-[#ff7878] transition-colors">
                                    Rozetka <span className="text-gray-400 text-[12px]">({rozetkaSeller.count || 0})</span>
                                </span>
                            </label>
                        )}

                        {otherSellersCount > 0 && (
                            <label className="cursor-pointer group flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={selectedSeller.includes('other')}
                                    onChange={() => toggleSeller('other')}
                                    className="accent-[#00a046] cursor-pointer w-5 h-5"
                                />
                                <span className="group-hover:text-[#ff7878] transition-colors">
                                    Інші продавці <span className="text-gray-400 text-[12px]">({otherSellersCount})</span>
                                </span>
                            </label>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}