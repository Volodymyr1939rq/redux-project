export interface otpRequestedEvent{
    identifier:string
    type:'phone' | 'email'
    code:string
}