import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"

interface CodeStepProps{
    phone:string,
    isVerified:boolean,
    verifyError:any,
    onBack:()=>void
    onSubmitCode:(code:string)=>void
}

interface CodeFormInputs{
    otp:string[]
}

export const CodeModal=({phone,isVerified,verifyError,onBack,onSubmitCode}:CodeStepProps)=>{
    const {register,handleSubmit,watch}=useForm<CodeFormInputs>({
        defaultValues:{
            otp:['','','','']
        }
    })
    
    const inputRefs=useRef<(HTMLInputElement | null)[]>([])

    const [timeLeft,setTimeLeft]=useState(118)

    useEffect(()=>{
        if(timeLeft<=0) return 
        const timerId=setInterval(()=>setTimeLeft(prev=>prev-1),1000)
        return ()=>clearInterval(timerId)
    },[timeLeft])

    const formatTime=(seconds:number)=>{
        const m=Math.floor(seconds/60)
        const s=seconds%60
        return `${m}:${s.toString().padStart(2,'0')}`
    }

    const onSubmit=(data:CodeFormInputs)=>{
        const fullCode=data.otp.join('')
        if(fullCode.length===4){
            onSubmitCode(fullCode)
        }
    }

    const currentOpt=watch('otp')
    const isCodeComplete=currentOpt.join('').length===4
    const cleanPhone=phone.replace(/\s/g,'')

    return (
        <div className="flex flex-col">
            <h3 className="text-[18px] font-bold text-gray-900 mb-2">Код підтвердження</h3>
            <p className="text-[14px] text-gray-900 mb-6">
                На <span className="font-bold">{cleanPhone}</span> був надісланий код підтвердження
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-flex-col">
                <div className="flex gap-2 justify-between mb-6">
                    {Array.from({length:4}).map((_,index)=>{
                        const {onChange,ref,...rest}=register(`otp.${index}`)

                        return (
                              <input
                              key={index}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              disabled={isVerified}
                              className={`w-12 h-12 md:w-14 md:h-14 border rounded-xl text-center text-2xl font-medium focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-colors ${
                                verifyError ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                              }`}
                              {...rest}

                              ref={(el)=>{
                                ref(el)
                                inputRefs.current[index]=el
                              }}
                              onFocus={(e)=>e.target.select}

                              onChange={(e)=>{e.target.value.replace(/\D/g,'')
                                onChange(e)

                                if(e.target.value.length<3){
                                    inputRefs.current[index+1]?.focus()
                                }
                              }}
                              onKeyDown={(e)=>{
                                if(e.key==='Backspace' && !e.currentTarget.value && index>0){
                                    inputRefs.current[index-1]?.focus()
                                }
                              }}
                              />
                        )        
                    })}
                </div>
                {verifyError && (
                    <p className="text-xs text-center text-red-500 mb-4 -mt-2">Не вірний код.Спробуйте ще раз</p>
                )}

                <a href="#" className="text-[14px] text-gray-900 underline hover:no-underline mb-6 inline-block w-max">
                    Не отримали код підтвердження?
                </a>

                <button 
                    type='submit'
                    disabled={!isCodeComplete || isVerified }
                    className="w-full bg-[#00a046] hover:bg-[#008a3c] text-white font-medium py-3 rounded-lg transition-colors"
                >
                    {isVerified ? 'Перевірка...' : 'Підтвердити'}
                </button>

                <div className="text-[14px] text-center text-gray-500 mb-6">
                    Відправити код повторно: <span className="text-gray-500">{formatTime(timeLeft)} хв</span>
                </div>

                <button 
                type="button"
                onClick={onBack}
                className="text-[#3e77aa] hover:text-[#f84147] transition-colors text-[14px] font-medium"
                >
                   Назад
                </button>
            </form>
        </div>
    )
}