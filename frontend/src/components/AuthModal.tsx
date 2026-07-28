import { X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useLoginWithEmailMutation, useLoginWithGoogleMutation, useSendPhoneCodeMutation, useVerifyPhoneCodeMutation } from "../store/api/api"
import { CodeModal } from "./CodeModal"
import { EmailModal } from "./EmailModal"



interface PhoneFormInput{
    phone:string
  
}

interface AuthModalProps{
    onClose:()=>void
    isOpen:boolean
}

export const AuthModal=({onClose,isOpen}:AuthModalProps)=>{
    const [step,setStep]=useState<'PHONE' | 'CODE' | 'EMAIL'>('PHONE')

    const [sendCode,{isLoading:isSending,error:sendError}]=useSendPhoneCodeMutation()
    const [verifyCode,{isLoading:isVerify,error:verifyError}]=useVerifyPhoneCodeMutation()
    const [loginWithEmail,{isLoading:isEmailLoginIn,error:emailLoginError}]=useLoginWithEmailMutation()
    const [loginWithGoogle,{isLoading:isGoogleLoading}]=useLoginWithGoogleMutation()

    const handleGoogleLogin=async()=>{
        try {
            const {url}=await loginWithGoogle('google').unwrap()

            window.location.href=url
        } catch (error) {
            console.error('Помилка отримання посилання Google',error)
        } 
    }
    const formatPhoneNumber=(value:string)=>{
         const digits=value.replace(/\D/g,'')
         
         let userDigit=digits
         if(digits.startsWith('38')){
            userDigit=digits.slice(2)
         }

         const limited=userDigit.slice(0,10)
         if(limited.length===0) return '+38 '
         let res = '+38 ';
         if (limited.length > 0) res += limited.slice(0, 3);
         if (limited.length > 3) res += ' ' + limited.slice(3,6); 
         if (limited.length > 6) res += ' ' + limited.slice(6, 8); 
         if (limited.length > 8) res += ' ' + limited.slice(8, 10); 

        return res;
    }
     const {register,handleSubmit,formState:{errors,isValid},reset,getValues}=useForm<PhoneFormInput>({
        mode:'onChange',
        defaultValues:{
            phone:'+38 '
        }
     })

     const {onChange,...phoneRegister}=register('phone',{
        required:'Номер телефону обов\'язковий',
        pattern:{
            value:/^\+38 0\d{2} \d{3} \d{2} \d{2}$/,
            message:'номер телефону має містити 12 символів'
        }
     })

     if(!isOpen) return null

     const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const formatedPhone=formatPhoneNumber(e.target.value)
        e.target.value=formatedPhone

        onChange(e)
     }

     const onSubmitPhone=async(data:PhoneFormInput)=>{
        const cleanPhone=data.phone.replace(/\s/g,'')

        try {
            await sendCode({phone:cleanPhone}).unwrap()
            setStep('CODE')
        } catch (error) {
            console.error('Помилка відправки коду ',error)
        }

    }

    const handleClose=()=>{
        reset()
        setStep('PHONE')
        onClose()
    }
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl relative">
                <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4 -mx-6 px-6">
                    <h2 className="font-bold text-2xl text-gray-900">Вхід</h2>
                    <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-red-500 transition-colors">
                        <X size={24} strokeWidth={1.5}/>
                    </button>
                </div>

                {step==='PHONE' && (
                    <>
                <form 
                onSubmit={handleSubmit(onSubmitPhone)} className="space-y-4">
                    <div>
                        <label className="text-sm block text-gray-400 mb-1">
                            Номер телефону
                        </label>
                        <input
                        type="tel"
                        maxLength={17}
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-colors ${
                            errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                        }`}
                        {...phoneRegister}
                        onChange={handleOnChange}
                        />
                        {errors.phone && (
                            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                        )}
                        {sendError && (
                            <p className="mt-1 text-xs text-red-500">Помилка відправки коду</p>
                        )}
                    </div>
                    <button 
                    type="submit"
                    disabled={!isValid || isSending}
                    className="w-full bg-[#00a046] hover:bg-[#008a3c] text-white font-medium py-3 rounded-lg transition-colors">
                        {isSending ? 'Відправка...' : 'Продовжити'}
                    </button>
                </form>
                <div className="mt-5">
                <p className="mb-4 text-center text-xs text-gray-500 leading-relaxed">
                    Продовжуючи, ви підтверджуєте, що згодні увійти до облікового запису та надаєте згоду на{' '}
                    <a href="#" className="underline hover:text-gray-700">обробку персональних даних</a>
                </p>
                </div>
                <div className="relative my-6 flex items-center justify-center">
                    <div className="absolute inset-x-0 h-px bg-gray-200"></div>
                    <span className="relative bg-white px-4 text-sm text-gray-400">
                        або
                    </span>
                </div>
                <div className="space-y-3">
                    <button 
                    onClick={handleGoogleLogin}
                    disabled={isGoogleLoading}
                    className="flex items-center justify-center w-full gap-3 rounded-lg border border-gray-300 py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        {isGoogleLoading ? 'Завантаження...' : 'Продовжити через Google'}

                    </button>
                    <button
                    onClick={()=>setStep('EMAIL')}
                    className="flex items-center justify-center w-full gap-3 rounded-lg border border-gray-300 py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Увійти через електронну пошту
                    </button>
                </div>
                    </>
                )}

                {step==='CODE' && (
                    <CodeModal
                    phone={getValues('phone')}
                    isVerified={isVerify}
                    verifyError={verifyError}
                    onBack={()=>setStep('PHONE')}
                    onSubmitCode={async(fullCode)=>{
                        const cleanPhone=getValues('phone').replace(/\s/g,'')
                        try {
                            await verifyCode({phone:cleanPhone,code:fullCode}).unwrap()
                            reset()
                            setStep('PHONE')
                            handleClose()
                        } catch (error) {
                            
                        }
                    }}
                    />
                )}
                {step==='EMAIL' && (
                    <EmailModal 
                    isLogginIn={isEmailLoginIn}
                    loginError={emailLoginError}
                    onBack={()=>setStep('PHONE')}
                    onSubmitEmail={async(data)=>{
                        try {
                            await loginWithEmail({email:data.email,password:data.password}).unwrap()
                            setStep('PHONE')
                            onClose()
                        } catch (error) {
                            console.error('Помилка входу через пошту',error)
                        }
                        console.log('Дані для логіну',data)
                    }}/>
                )}
            </div>
        </div>
    )
}