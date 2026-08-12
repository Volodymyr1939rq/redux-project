import { MoreVertical, Plus, Share2 } from "lucide-react"
import { FavoritesSideBar } from "../components/FavoritesSideBar"
import { useClearFromWishListMutation, useCreateWishListMutation, useGetMeQuery, useGetWishListQuery, useMakeDefaultwishListMutation, useMoveItemsMutation, useUpdateWishListMutation, type WishListResponse } from "../store/api/api"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { EditModal } from "../components/EditModal"
import { CreateWishListModal } from "../components/CreateWishListModal"
import { MoveItemsModal } from "../components/MoveItemsModal"

export const WishListPage = () => {
    const { data: user } = useGetMeQuery()
    const navigate=useNavigate()
    const { data: wishlists = [] } = useGetWishListQuery(undefined, { skip: !user })
    const [isOpenCreateWishList, setIsOpenCreateWishList] = useState(false)
      
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null)
    const [listToEdit,setListToEdit]=useState<WishListResponse | null>(null)
    const [deleteFromWishList] = useClearFromWishListMutation()
    const [createWishList] = useCreateWishListMutation()
    const [updateWishList]=useUpdateWishListMutation()
    const [makeDefaultList]=useMakeDefaultwishListMutation()
    const [moveItemsFromWishList]=useMoveItemsMutation()
    const [moveItemsFromList,setMoveItemsFromList]=useState<WishListResponse | null>(null)

    const handleDeleteList = async (listId: string) => {
        try {
            await deleteFromWishList(listId).unwrap()
            setActiveMenuId(null) 
        } catch (error) {
            console.error('Помилка при видаленні списку', error)
        }
    }

    const handleCreateWishList = async (name: string, isDefault: boolean) => {
         try {
            if(listToEdit){
                await updateWishList({wishlistId:listToEdit.id,name}).unwrap()
            }else{
                await createWishList(name).unwrap()
            }
            setIsOpenCreateWishList(false)
            setListToEdit(null)
         } catch (error) {
            console.error('Помилка при створенні списку', error)
         }

    }

    const handleMoveAllItems=async(targetListId:string)=>{
        if(!targetListId) return null
        try {
            const moveItems=moveItemsFromList?.items.map(item=>
                moveItemsFromWishList({
                    favoriteId:item.id,
                    targetWishListId:targetListId
                }).unwrap()
            )

            if(!moveItems || moveItems.length===0){
                console.log('нема товарів для переміщення')
                setMoveItemsFromList(null)
                return
            }

            await Promise.all(moveItems)
            setMoveItemsFromList(null)
        } catch (error) {
            console.error('Помилка при переміщенні товарів',error)
    }
}


    return (
        <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 items-start">
            
            <FavoritesSideBar/>
            
            <div className="flex-1 w-full">
                
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl text-gray-900 font-bold">Список бажань</h1>
                    {wishlists.length > 0 && (
                        <button onClick={() => {setIsOpenCreateWishList(true)
                            setListToEdit(null)
                        }}
                         className="text-[#3e77aa] hover:text-red-400 transition cursor-pointer">
                            <Plus size={32} strokeWidth={1.5}/>
                        </button>
                    )}
                </div>
                
                {wishlists.length > 0 ? (
                
                    <div className="flex flex-col gap-4">
                     
                        {wishlists.map((list, index) => (
                            <div key={list.id} 
                            onClick={()=>navigate(`/wishlist/${list.id}`)}
                            className="border border-gray-200 p-5 rounded-lg curosr-pointer">
                                
                           
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-[16px] font-bold text-gray-900">
                                            {list.name} 
                                            {index === 0 && <span className="text-gray-500 text-[13px] font-normal ml-1">(Основний)</span>}
                                        </h3>
                                        <p className="text-[14px] text-gray-500 mt-1">
                                           Кількість товарів: {list.items.length}
                                        </p>
                                    </div>
                                    <div className="flex gap-3 text-[#3e77aa]">
                                        <button className="hover:text-red-400 p-1.5 rounded-full transition cursor-pointer"
                                        onClick={(e)=>{
                                            e.stopPropagation()
                                        }}>
                                            <Share2 size={24} strokeWidth={1.5}/>
                                            
                                        </button>
                                        <div className="relative">
                                            <button 
                                                
                                                className="p-1.5 rounded-full transition cursor-pointer"
                                            
                                                onClick={(e) =>{
                                                    e.stopPropagation()
                                                    setActiveMenuId(activeMenuId === list.id ? null : list.id)}}
                                            >
                                                <MoreVertical size={24} strokeWidth={1.5}/>
                                            </button>
                                         
                                            <EditModal
                                                isOpen={activeMenuId === list.id}
                                                onClose={() => setActiveMenuId(null)}
                                                onDelete={() => handleDeleteList(list.id)}
                                                onEdit={()=>{
                                                    setListToEdit(list)
                                                    setIsOpenCreateWishList(true)
                                                    setActiveMenuId(null)
                                                }}
                                                isDefault={index===0}
                                                hasItems={list.items.length>0}
                                                onMakeDefault={async ()=>{
                                                      try {
                                                        await makeDefaultList({wishlistId:list.id}).unwrap()
                                                        setActiveMenuId(null)
                                                      } catch (error) {
                                                        console.error('Не вдалося зробити список основним',error)
                                                      }
                                                }}
                                                onMoveItems={()=>{
                                                     setMoveItemsFromList(list)
                                                     setActiveMenuId(null)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                             
                                <div className="flex gap-4 overflow-x-auto py-2">
                                    {list.items.length > 0 ? (
                                        list.items.map((fav: any) => (
                                            <Link 
                                                to={`/product/${fav.productId}`}
                                                key={fav.id}
                                                className="w-20 h-20 shrink-0 flex items-center justify-center p-1 transition"
                                            >
                                                <img
                                                    src={fav.product.image || 'https://via.placeholder.com/150'}
                                                    alt={fav.product.title}
                                                    className="max-w-full max-h-full object-contain"
                                                />
                                            </Link>
                                        ))
                                    ) : (
                                    
                                        <div className="text-gray-900 text-[15px] py-4 w-full flex justify-center">
                                            Список бажань порожній
                                        </div>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                ) : (
               
                    <div className="flex flex-col items-center justify-center mt-12 pb-10">
                        <img
                            src="https://xl-static.rozetka.com.ua/h-9155d2e4/assets/img/design/cabinet/cabinet-wishlist-empty.svg"
                            alt="Порожній список"
                            className="w-[280px] sm:w-[320px] h-auto mb-6"
                        />
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Списків бажань немає</h2>
                        <p className="text-[15px] text-gray-600 mb-8 text-center max-w-[420px]">
                            Створюйте власні списки бажань та додавайте товари, які вам подобаються
                        </p>
                        <button onClick={() => setIsOpenCreateWishList(true)} className="bg-[#00a046] hover:bg-[#008c3e] text-white px-6 py-2.5 rounded-md font-semibold transition-colors cursor-pointer">
                            Створити новий список
                        </button>
                    </div>
                )}

            </div>

            {isOpenCreateWishList && (
                <CreateWishListModal 
                    onClose={() => setIsOpenCreateWishList(false)} 
                    onSubmit={handleCreateWishList}
                    initialName={listToEdit?.name || ''}
                    title={listToEdit ? 'Редагувати назву' : 'Новий список'}
                    submitText={listToEdit ? 'Зберегти' : 'Створити'}
                />
            )}

            {moveItemsFromList && (
                <MoveItemsModal wishlists={wishlists}
                onClose={()=>setMoveItemsFromList(null)}
                onSubmit={handleMoveAllItems}
                currentListId={moveItemsFromList.id}/>
            )}
        </div>
    )
}