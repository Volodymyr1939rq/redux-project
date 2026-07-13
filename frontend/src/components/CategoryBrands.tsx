import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const brandsData = [
    { id: 1, name: 'Apple', logo: 'https://placehold.co/100x40/fff/a0a0a0?text=Apple' },
    { id: 2, name: 'ASUS', logo: 'https://placehold.co/100x40/fff/a0a0a0?text=ASUS' },
    { id: 3, name: 'HP', logo: 'https://placehold.co/100x40/fff/a0a0a0?text=HP' },
    { id: 4, name: 'Acer', logo: 'https://placehold.co/100x40/fff/a0a0a0?text=Acer' },
    { id: 5, name: 'Lenovo', logo: 'https://placehold.co/100x40/fff/a0a0a0?text=Lenovo' },
    { id: 6, name: 'Samsung', logo: 'https://placehold.co/100x40/fff/a0a0a0?text=Samsung' },
    { id: 7, name: 'Dell', logo: 'https://placehold.co/100x40/fff/a0a0a0?text=Dell' },
    { id: 8, name: 'Canon', logo: 'https://placehold.co/100x40/fff/a0a0a0?text=Canon' },
    { id: 9, name: 'Sony', logo: 'https://placehold.co/100x40/fff/a0a0a0?text=Sony' },
    { id: 10, name: 'LG', logo: 'https://placehold.co/100x40/fff/a0a0a0?text=LG' },
    { id: 11, name: 'MSI', logo: 'https://placehold.co/100x40/fff/a0a0a0?text=MSI' },
    { id: 12, name: 'Gigabyte', logo: 'https://placehold.co/100x40/fff/a0a0a0?text=Gigabyte' },
];

export const CategoryBrands = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [showLeftArrow, setShowLeftArrow] = useState(false);

    const handleScroll = () => {
        if(!scrollRef.current) return
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        setShowLeftArrow(scrollLeft > 0)
        setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1)
    };

    useEffect(() => {
        handleScroll();
     
        window.addEventListener('resize', handleScroll);
        return () => window.removeEventListener('resize', handleScroll);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
       if(scrollRef.current) {
        const scrollAmount = 400; 
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
       }
    };

    return (
        <div style={{ position: 'relative', width: '100%', backgroundColor: '#fff', borderBottom: '1px solid #e5e5e5', marginTop: '24px' }}>
            
            <style>
                {`
                .rozetka-scrollbar::-webkit-scrollbar {
                    height: 4px; 
                }
                .rozetka-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .rozetka-scrollbar::-webkit-scrollbar-thumb {
                    background: transparent;
                    border-radius: 4px;
                }
                .rozetka-scrollbar:hover::-webkit-scrollbar-thumb {
                    background: #b5b5b5;
                }
                `}
            </style>
            {showLeftArrow && (
                <button 
                    onClick={() => scroll('left')}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center text-gray-800 hover:text-[#00a046] transition-colors z-10"
                >
                    <ChevronLeft size={24}/>
                </button>
            )}

            <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="rozetka-scrollbar scroll-smooth"
                style={{ 
                    display: 'flex', 
                    overflowX: 'auto', 
                    padding: '16px 0',
                }}
            >
                {brandsData.map((brand, index) => (
                    <a 
                        key={brand.id} 
                        href="#"
                        className="flex items-center justify-center group"
                        style={{ 
                            flexShrink: 0,
                            width: '140px',
                            textDecoration: 'none',
                            borderRight: index !== brandsData.length - 1 ? '1px solid #e5e5e5' : 'none'
                        }}
                    >
                        <img 
                            src={brand.logo} 
                            alt={brand.name} 
                            style={{ height: '28px', objectFit: 'contain' }}
                            className="grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                        />
                    </a>
                ))}
            </div>

            {showRightArrow && (
                <button 
                    onClick={() => scroll('right')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-center text-gray-800 hover:text-[#00a046] transition-colors z-10"
                >
                    <ChevronRight size={24}/>
                </button>
            )}
        </div>
    );
};