import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

interface EmailAuth {
    password:string
    email:string
}

interface EmailModalProps{
    isLogginIn:boolean
    loginError:any
    onBack:()=>void
    onSubmitEmail:(data:EmailAuth)=>void
}

export const EmailModal=({isLogginIn,loginError,onBack,onSubmitEmail}:EmailModalProps)=>{
    const [showPassword,setShowPassword]=useState(false)
       const {register,handleSubmit,formState:{errors,isValid}}=useForm<EmailAuth>({
        mode:'onChange',
        defaultValues:{
            email:'',
            password:''
        }
       })
       return (
        <form onSubmit={handleSubmit(onSubmitEmail)} className="flex flex-col">
            <div className="space-y-4 mb-6">
                <div>
                    <label className="text-sm block text-gray-500 mb-1">
                        Ел. пошта
                    </label>
                    <input
                    type="email"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-colors ${
                        errors.email || loginError ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                    {...register('email',{
                        required:'Електронна пошта обов\'язкова',
                        pattern:{
                            value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message:'Невірний формат email'
                        }
                    })}
                    disabled={isLogginIn}
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <label className="text-sm block text-gray-500 mb-1">Пароль</label>
                    <div className="flex items-center gap-4">
                        <input
                        type={showPassword ? 'text' : 'password'}
                        className={`flex-1 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-colors ${
                            errors.password || loginError ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                        }`}
                        {...register('password',{
                            required:'Пароль обов\'язковий',
                            minLength:{
                                value:6,
                                message:'Пароль має містити 6 символів'
                            }
                        })}
                        disabled={isLogginIn}
                        />
                        <button type="button"
                        onClick={()=>setShowPassword(!showPassword)}
                        className="text-[#3e77aa] hover:text-red-500 transition-colors shrink-0"
                        tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={22} strokeWidth={1.5}/> : <Eye size={22} strokeWidth={1.5}/>}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-sm  text-red-500">{errors.password.message}</p>
                    )}
                    {loginError &&  (
                        <p className="mt-1 text-sm text-red-500">Невірна пошта або пароль</p>
                    )}
                </div>
            </div>
            <button 
            type='submit'
            disabled={!isValid || isLogginIn}
            className="w-full bg-[#00a046] hover:bg-[#008a3c] text-white font-medium py-3 rounded-lg transition-colors">
                {isLogginIn ? 'Вхід...' : 'Продовжити'}
            </button>
            <div className="flex items-center gap-6 flex-col">
                <a href="#" className="text-[16px] text-[#3e77aa] font-medium hover:text-[#f84147] transition-colors mt-4">
                    Нагадати пароль
                </a>
                <button 
                type="submit"
                onClick={onBack}
                className="text-[16px] text-[#3e77aa] font-medium hover:text-[#f84147] transition-colors">
                    Увійти за номером телефону
                </button>
            </div>
        </form>
       )
}