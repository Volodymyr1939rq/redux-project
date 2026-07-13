import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useGetBannersQuery } from "../store/api/api"

interface PromoSliderProps {
    height?: string;
}

export const PromoSlider = ({ height = '155px' }: PromoSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { data: banners, isLoading } = useGetBannersQuery()
    
    useEffect(() => {
        if (!banners || banners.length === 0) return
        const interval = setInterval(() => {
            nextSlide()
        }, 5000)
        return () => clearInterval(interval)
    }, [currentIndex, banners])
    
    if (isLoading) {
        return (
            <div 
                className="w-full bg-gray-200 animate-pulse rounded-lg" 
                style={{ marginTop: '20px', height: height }}
            ></div>
        );
    }
    
    if (!banners || banners.length === 0) return null
    
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? banners.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === banners.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    return (
        <div className="relative w-full rounded-lg overflow-hidden" style={{ marginTop: '20px', height: height }}>
            <div className="flex transition-transform ease-out duration-500 h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {banners?.map((banner) => (
                    <img key={banner.id}
                    src={banner.imageUrl || 'https://placehold.co/200x200/transparent/3e77aa?text=No+Image'}
                    alt={`Slide ${banner.id}`}
                    className="w-full h-full object-cover flex shrink-0"></img>
                ))}
            </div>
            
            <button onClick={prevSlide}
            className="group-hover:flex absolute top-1/2 -translate-y-1/2 left-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all text-gray-800 hover:text-[#00a046]">
                <ChevronLeft size={24}/>
            </button>
            
            <button onClick={nextSlide}
            className="group-hover:flex absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all text-gray-800 hover:text-[#00a046]">
                <ChevronRight size={24}/>
            </button>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {banners.map((_, slideIndex) => (
                    <button key={slideIndex}
                    onClick={() => setCurrentIndex(slideIndex)}
                    className={`transition-all w-1.5 h-1.5 rounded-full ${
                        currentIndex === slideIndex ? 'bg-[#00a046] scale-125' : 'bg-white/60 hover:bg-white'
                    }`}>
                    </button>
                ))}
            </div>
        </div>
    )
}