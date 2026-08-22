import type {MailerOptions} from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

export function getMailerConfig(configService:ConfigService):MailerOptions{
    return {
        transport:{
            host:configService.get('mail.host'),
            port:configService.get('mail.port'),
            auth:{
                user:configService.get('mail.username'),
                pass:configService.get('mail.password')
            },
            secure:configService.get('mail.secure')
        },
        defaults:{
            from:`Vasya ${configService.get('mail.fromAddress')}`
        }
    }
}