import { registerAs } from "@nestjs/config";

export const twilioConfig=registerAs('twilio',()=>({
         sid:process.env.TWILIO_ACCOUNT_SID,
         authtoken:process.env.TWILIO_AUTH_TOKEN,
         phone:process.env.TWILIO_PHONE_NUMBER
}))