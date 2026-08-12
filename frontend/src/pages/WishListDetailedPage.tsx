import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { 
    useClearFromWishListMutation, 
    useGetMeQuery, 
    useGetWishListByIdQuery, 
    useGetWishListQuery, 
    useMakeDefaultwishListMutation, 
    useUpdateWishListMutation,
    useMoveItemsMutation, // ✅ Додали правильний імпорт
    type WishListResponse 
} from "../store/api/api"
import { FavoritesSideBar } from "../components/FavoritesSideBar"
import { ChevronLeft, MoreVertical, Share2 } from "lucide-react"
import { WishListSortFilter } from "../components/WishListSortFilter"
import { ProductCard } from "../components/ProductCard"
import { useState } from "react"
import { EditModal } from "../components/EditModal"
import { MoveItemsModal } from "../components/MoveItemsModal"
import { CreateWishListModal } from "../components/CreateWishListModal" 

export const WishListDetailedPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const sortParam = searchParams.get('sort') || 'date'
    const { data: user } = useGetMeQuery()

    const { data: currentWishList, isLoading } = useGetWishListByIdQuery(
        { id: id!, sort: sortParam },
        { skip: !id }
    )
    
    const { data: wishlists = [] } = useGetWishListQuery(undefined, { skip: !user })

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [listToEdit, setListToEdit] = useState<WishListResponse | null>(null)
    const [moveItemsFromList, setMoveItemsFromList] = useState<WishListResponse | null>(null)

    const [deleteFromWishList] = useClearFromWishListMutation()
    const [updateWishList] = useUpdateWishListMutation()
    const [makeDefaultList] = useMakeDefaultwishListMutation()
    const [moveItemsFromWishList] = useMoveItemsMutation() 

    const handleMoveAllItems = async (targetListId: string) => {
        if (!targetListId || !moveItemsFromList) return
        try {
            const movePromises = moveItemsFromList.items.map(item =>
                moveItemsFromWishList({
                    favoriteId: item.id,
                    targetWishListId: targetListId
                }).unwrap()
            )

            if (movePromises.length === 0) {
                console.log('нема товарів для переміщення')
                setMoveItemsFromList(null)
                return
            }

            await Promise.allSettled(movePromises) 
            setMoveItemsFromList(null)
            navigate('/wishlist')
        } catch (error) {
            console.error('Помилка при переміщенні товарів', error)
        }
    }

    const handleDeleteList = async (listId: string) => {
        try {
            await deleteFromWishList(listId).unwrap()
            setIsMenuOpen(false) 
            navigate('/wishlist') 
        } catch (error) {
            console.error('Помилка при видаленні списку', error)
        }
    }

    const handleRenameList = async (name: string) => {
        try {
            if (listToEdit) {
                await updateWishList({ wishlistId: listToEdit.id, name }).unwrap()
            } 
            setListToEdit(null)
        } catch (error) {
            console.error('Помилка при перейменуванні списку', error)
        }
    }

    if (isLoading) {
        return (
            <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 items-start">
                <FavoritesSideBar />
                <h2 className="flex-1 text-center py-20 text-gray-900">
                    Завантаження...
                </h2>
            </div>
        )
    }

    if (!currentWishList) {
        return (
            <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 items-start">
                <FavoritesSideBar />
                <h2 className="flex-1 text-center py-20 text-gray-900">
                    Список не знайдено.
                </h2>
            </div>
        )
    }

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 items-start">
            <FavoritesSideBar />

            <div className="flex-1 w-full">
                <Link to='/wishlist' className="inline-flex items-center text-[#3e77aa] hover:text-red-400 mb-6 transition-colors font-medium">
                    <ChevronLeft size={20} strokeWidth={2} className="mr-1" />
                    Списки бажань 
                </Link>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl text-gray-900 mb-2 font-bold flex items-center">
                            {currentWishList.name}
                    
                            {currentWishList.isDefault && (
                                <span className="text-gray-500 text-[18px] font-normal ml-2">
                                    (Основний)
                                </span>
                            )}
                        </h1>
                        <p className="text-[15px] text-gray-500">Кількість товарів: {currentWishList.items.length}</p>
                    </div>
                    
                    <div className="flex items-center gap-3 text-[#3e77aa]">
                        <button className="hover:text-red-400 p-1.5 rounded-full transition cursor-pointer"
                                onClick={(e) => { e.stopPropagation() }}>
                            <Share2 size={24} strokeWidth={1.5} />
                        </button>
                        <div className="relative">
                            <button 
                                className="p-1.5 rounded-full transition cursor-pointer"
                                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            >
                                <MoreVertical size={24} strokeWidth={1.5} />
                            </button>

                            <EditModal 
                                isOpen={isMenuOpen}
                                onClose={() => setIsMenuOpen(false)}
                                onDelete={() => handleDeleteList(currentWishList.id)}
                                onEdit={() => {
                                    setListToEdit(currentWishList)
                                    setIsMenuOpen(false)
                                }}
                                isDefault={currentWishList.isDefault}
                                hasItems={currentWishList.items.length > 0}
                                onMakeDefault={async () => {
                                    await makeDefaultList({ wishlistId: currentWishList.id }).unwrap()
                                    setIsMenuOpen(false)
                                }}
                                onMoveItems={() => {
                                    setMoveItemsFromList(currentWishList)
                                    setIsMenuOpen(false)
                                }}
                            />
                        </div>
                    </div>
                </div> 

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <button className="bg-[#00a046] hover:bg-[#008c3e] text-white px-6 py-2.5 font-semibold rounded-md transition-colors w-full sm:w-auto cursor-pointer">
                        Купити все
                    </button>
                    <div className="w-full sm:w-[240px]">
                        <WishListSortFilter />
                    </div>
                </div>

                {currentWishList.items.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                        {currentWishList.items.map((fav: any) => (
                            <div key={fav.id} className="relative">
                                <ProductCard product={fav.product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500 text-[15px] border border-gray-200 rounded-lg">
                        У цьому списку ще немає товарів.
                    </div>
                )}
            </div>
            
            {moveItemsFromList && (
                <MoveItemsModal 
                    wishlists={wishlists}
                    onClose={() => setMoveItemsFromList(null)}
                    onSubmit={handleMoveAllItems}
                    currentListId={moveItemsFromList.id}
                />
            )}

            {listToEdit && (
                <CreateWishListModal 
                    onClose={() => setListToEdit(null)} 
                    onSubmit={handleRenameList}
                    initialName={listToEdit.name}
                    title="Редагувати назву"
                    submitText="Зберегти"
                />
            )}
        </div>
    )
}