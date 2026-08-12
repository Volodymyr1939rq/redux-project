import { X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface CreateWishListModalProps {
    onClose: () => void
    onSubmit: (name: string, isDefault: boolean) => void,
    initialName?: string,
    title?: string,
    submitText?: string
}

type FormData = {
    name: string,
    isDefault: boolean
}

export const CreateWishListModal = ({
    onClose,
    onSubmit,
    initialName = "",
    title = "Новий список",
    submitText = "Створити"
}: CreateWishListModalProps) => {
    const ref = useRef<HTMLDivElement>(null)
    
    const [formData, setFormData] = useState<Partial<FormData>>({
        name: initialName || '', 
        isDefault: false
    })

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => { document.removeEventListener('mousedown', handleClickOutside) }
    }, [onClose])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const finalName = (formData.name || "").trim() || 'Список'
        const finalIsDefault = formData.isDefault || false

        onSubmit(finalName, finalIsDefault)
    }
       
    return (
       
       <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div ref={ref}
          className="bg-white rounded-lg w-full max-w-[480px] relative shadow-xl overflow-hidden">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-gray-900 font-bold text-[22px]">
                    {title}
                </h2>
                <button onClick={onClose}
                className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer">
                    <X size={24} strokeWidth={1.5}/>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-6">
                    <label className="block text-[14px] text-gray-500 mb-2">
                    
                        Назва {initialName ? '' : 'нового '}списку
                    </label>
                    <input
                        type="text"
                        placeholder="Список"
                        value={formData.name || ''}
                        name="name"
                        onChange={handleChange}
                        autoFocus
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-[15px] focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-shadow"
                    />
                </div>

                <div className="mb-8 flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="isDefault"
                        name="isDefault" 
                        checked={formData.isDefault || false}
                        onChange={handleChange}
                        className="w-4 h-4 accent-[#00a046] cursor-pointer border-gray-300 rounded"
                    />
                    <label htmlFor="isDefault"
                    className="text-[15px] text-gray-900 cursor-pointer select-none">
                        Зробити списком за замовчуванням
                    </label>
                </div>

                <div className="flex gap-4">
                    <button type="button"
                    onClick={onClose}
                    className="flex-1 py-2.5 bg-white text-[#3e77aa] border border-gray-300 hover:text-blue-500 hover:border-gray-400 rounded-md font-medium text-[15px] transition-colors cursor-pointer">
                        Скасувати
                    </button>

                    <button type="submit"
                    className="flex-1 py-2.5 bg-[#00a046] hover:bg-[#008c3e] text-white rounded-md font-semibold text-[15px] transition-colors cursor-pointer">
                        {submitText}
                    </button>
                </div>
            </form>

          </div>
       </div>
    )
}