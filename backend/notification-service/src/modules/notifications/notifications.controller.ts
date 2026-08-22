import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from 'src/infrastructure/rmq/rmq.service';
import type { otpRequestedEvent, ReviewReplyevent } from '@app/contracts';
@Controller()
export class NotificationsController {
  public constructor(
    private readonly notificationsService: NotificationsService,
    private readonly rmqService:RmqService
  ) {}

  @EventPattern('auth.otp.requested')
  public async otpRequested(@Payload() data:otpRequestedEvent,@Ctx() ctx:RmqContext){
    try {
      await this.notificationsService.sendOtp(data)
      this.rmqService.ack(ctx)
    } catch (error) {
      if(error instanceof Error){
        console.log('OTP processing error: ', error.message)
      }else{
        console.log('OTP processing error: ', error);
      }
      this.rmqService.nack(ctx)
    }
  }
  @EventPattern('review.reply.created')
  public async handleReviewReply(@Payload() data:ReviewReplyevent,@Ctx() ctx:RmqContext){
    try {
      await this.notificationsService.sendReviewReply(data)
      this.rmqService.ack(ctx)
    } catch (error) {
      if(error instanceof Error){
        console.log('Review reply processing error: ', error.message)
      }else{
        console.log('Review reply processing error: ', error)
      }
      this.rmqService.nack(ctx)
    }
  }
}
