import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { TemplateService } from './template.service';
import { ReviewReplyEmail } from './templates/ReviewReplyEmail';
import { otpRequestedEvent } from '@app/contracts';
@Injectable()
export class MailService {
    public constructor(private readonly transporter:MailerService,
        private readonly templateService:TemplateService,
        private readonly mailerService:MailerService
    ){}

    public async sendReviewReply(email:string,productName:string,replyText:string){
        const html=await this.templateService.generateHtml(
            <ReviewReplyEmail
            productName={productName}
            replyText={replyText}
            reviewUrl={email}
            />
        )
        await this.transporter.sendMail({
            to:email,
            subject:`Нова відповідь на ваш відгук ${productName}`,
            html
        })
    }

    public async sendAuthOtp(data:otpRequestedEvent){
        const {identifier,code}=data
        await this.mailerService.sendMail({
            to:identifier,
            subject:'Код підтвердження авторизації',
            text:`Ваш код для входу: ${code}. Нікому не передавайте цей код.`
        })
    }
}
