import { otpRequestedEvent, ReviewReplyevent } from '@app/contracts';
import { Injectable } from '@nestjs/common';
import { MailService } from 'src/infrastructure/mail/mail.service';

@Injectable()
export class NotificationsService {
    public constructor(private readonly mailService:MailService,
       
    ){}

   public async sendOtp(data:otpRequestedEvent){
        const {identifier,type,code}=data
        if(type==='email'){
             await this.mailService.sendAuthOtp(data)
             console.log(`[EMAIL] Лист відправлено на ${identifier}`);
        } else if(type==='phone'){
          console.log(`Код для входу: ${code}`);
        }
   }

   public async sendReviewReply(data:ReviewReplyevent){
    const {email,productName,replyText}=data
    await this.mailService.sendReviewReply(email,productName,replyText)
   }
}
