import { useEffect, useRef } from "react"

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    onEdit:()=>void;
    onMakeDefault:()=>void;
    onMoveItems:()=>void;
    isDefault:boolean;
    hasItems:boolean;
}

export const EditModal = ({ isOpen, onClose, onDelete,onEdit,onMakeDefault,onMoveItems,isDefault,hasItems }: EditModalProps) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isOpen) return
        const handleClickOutput = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutput)
        return () => { document.removeEventListener('mousedown', handleClickOutput) }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleDelete = () => {
        onDelete();
        onClose();
    }

    const handleEdit=()=>{
        onEdit()
        onClose()
    }

    const handleMakeDefault=()=>{
        onMakeDefault()
        onClose()
    }

    const handleMoveItems=()=>{
        onMoveItems()
        onClose()
    }

    return (
        <div 
            className="absolute top-0 right-full mr-2 w-[250px] bg-white rounded-lg shadow-[0_2px_16px_rgba(0,0,0,0.12)] border border-gray-100 z-20 py-2"
            onClick={(e) => e.stopPropagation()}
            ref={ref}
        >
            {hasItems && (
                <button onClick={handleMoveItems} 
                className="w-full text-left px-6 py-2 hover:text-red-500 text-gray-800 text-[15px] font-semibold transition-colors">
                    Перемістити товар
                </button>
            )}

            {!isDefault && (
                <button onClick={handleMakeDefault}
                className="w-full text-left px-6 py-2 hover:text-red-500 text-gray-800 text-[15px] font-semibold transition-colors">
                    Зробити список основним
                </button>
            )}
            <button
                className="w-full text-left px-6 py-2 hover:text-red-500 text-gray-800 text-[15px] font-semibold transition-colors"
                onClick={handleEdit}
            >
                Перейменувати
            </button>
            <button
                className="w-full text-left px-6 py-2 hover:text-red-500 text-gray-800 text-[15px] font-semibold transition-colors"
                onClick={handleDelete}
            >
                Видалити список
            </button>
        </div>
    )
}