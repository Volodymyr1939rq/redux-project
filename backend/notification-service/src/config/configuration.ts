import { registerAs } from "@nestjs/config";

export const mailConfig=registerAs('mail',()=>({
    host:process.env.SMTP_HOST,
    port:parseInt(process.env.SMTP_PORT || '0',10),
    username:process.env.SMTP_USERNAME,
    password:process.env.SMTP_PASSWORD,
    fromAddress:process.env.SMTP_FROM_ADDRESS,
    secure:process.env.SMTP_SECURE === 'true'
}))