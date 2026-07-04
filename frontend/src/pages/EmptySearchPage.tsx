import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const POPULAR_CATEGORIES = [
    { id: 1, name: "Мобільні телефони", image: "https://via.placeholder.com/80x100?text=Phone" },
    { id: 2, name: "Ноутбуки", image: "https://via.placeholder.com/80x100?text=Laptop" },
    { id: 3, name: "Навушники", image: "https://via.placeholder.com/80x100?text=Headphones" },
    { id: 4, name: "Телевізори", image: "https://via.placeholder.com/80x100?text=TV" },
    { id: 5, name: "Карти пам'яті", image: "https://via.placeholder.com/80x100?text=SD" },
    { id: 6, name: "Флеш пам'ять USB", image: "https://via.placeholder.com/80x100?text=USB" },
    { id: 7, name: "Телевізори", image: "https://via.placeholder.com/80x100?text=TV" },
    { id: 8, name: "Карти пам'яті", image: "https://via.placeholder.com/80x100?text=SD" },
    { id: 9, name: "Флеш пам'ять USB", image: "https://via.placeholder.com/80x100?text=USB" },
];

export const EmptySearchPage = () => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [showRightArrow, setShowRightArrow] = useState(false)
    const [showLeftArrow, setShowLeftArrow] = useState(false)
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('text') || '';
     
    const handleScroll = () => {
        if(!scrollRef.current) return
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        setShowLeftArrow(scrollLeft > 0)
        setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1)
    }

    useEffect(() => {
        handleScroll()
    }, [])

    const scroll = (direction: 'left' | 'right') => {
       if(scrollRef.current) {
        const scrollAmount = 300 
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        })
       }
    }

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '40px 16px', backgroundColor: '#ffffff' }}>
            <style>
                {
                    `
                    .rozetka-scrollbar::-webkit-scrollbar {
                    height:1.5px
                    }
                    .rozetka-scrollbar::-webkit-scrollbar-track{
                    background:#f5f5f5
                    
                    }
                    .rozetka-scrollbar::-webkit-scrollbar-thumb{
                    background:#b5b5b5;
                    border-radius:4px;
                    
                    }
                    .rozetka-scrollbar::-webkit-scrollbar-thumb:hover{
                    background:#a6a5a5
                    }
                    `
                }
            </style>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '64px', marginBottom: '64px' }}>
                
                <div style={{ width: '256px', height: '256px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                        src="https://xl-static.rozetka.com.ua/h-877c584d/assets/img/catalog/catalog-empty-supermarket.svg" 
                        alt="Нічого не знайдено" 
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '576px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#221f1f', marginBottom: '16px', lineHeight: 1.2 }}>
                        За запитом «<span style={{ color: '#00a046' }}>{searchQuery}</span>» нічого не знайдено :(
                    </h1>
                    
                    <p style={{ fontSize: '15px', color: '#221f1f', marginBottom: '24px' }}>
                        Перевірте правильність написання запиту, спробуйте використати синоніми чи більш загальні запити
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        <button 
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                setTimeout(() => {
                                    const searchInput = document.getElementById('main-search-input');
                                    if (searchInput) searchInput.focus();
                                }, 100);
                            }}
                            style={{ 
                                backgroundColor: '#00a046', 
                                color: '#ffffff', 
                                padding: '10px 24px', 
                                borderRadius: '8px', 
                                fontWeight: 500, 
                                fontSize: '15px', 
                                border: 'none', 
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            Змінити запит
                        </button>
                        
                        <button 
                            onClick={() => navigate('/catalog')}
                            style={{ 
                                backgroundColor: '#3e77aa', 
                                color: '#ffffff', 
                                padding: '10px 24px', 
                                borderRadius: '8px', 
                                fontWeight: 500, 
                                fontSize: '15px', 
                                border: 'none', 
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            Скористатися каталогом
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ width: '100%', position: 'relative' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#221f1f', marginBottom: '24px' }}>
                    Популярні категорії
                </h2>
                
                <div style={{ position: 'relative' }}>
                    
                    {showLeftArrow && (
                        <button 
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-white shadow-md transition-colors z-10 hover:text-[#00a046]"
                            style={{ color: '#a6a5a5' }}
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
                            alignItems: 'stretch', 
                            overflowX: 'auto', 
                            padding: '16px 0', 
                            borderTop: '1px solid #e9e9e9', 
                            borderBottom: '1px solid #e9e9e9' 
                        }}
                    >
                        {POPULAR_CATEGORIES.map((category, index) => (
                            <div 
                                key={category.id}
                                onClick={() => navigate(`/category/${category.id}`)}
                                style={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    justifyContent: 'flex-start', 
                                    minWidth: '160px', 
                                    padding: '0 16px', 
                                    cursor: 'pointer',
                                    borderRight: index !== POPULAR_CATEGORIES.length - 1 ? '1px solid #e9e9e9' : 'none'
                                }}
                            >
                                <div style={{ height: '96px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                    <img 
                                        src={category.image} 
                                        alt={category.name} 
                                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                                <span style={{ fontSize: '14px', color: '#221f1f', textAlign: 'center' }}>
                                    {category.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    {showRightArrow && (
                        <button 
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-white shadow-md transition-colors z-10 hover:text-[#00a046]"
                            style={{ color: '#a6a5a5' }}
                        >
                            <ChevronRight size={24} />
                        </button>
                    )}
                </div>
            </div>
            
        </div>
    );
};