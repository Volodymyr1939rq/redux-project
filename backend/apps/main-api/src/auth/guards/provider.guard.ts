import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { ProviderService } from "../provider/provider.service";
import { Request } from "express";


@Injectable()
export class AuthProviderGuard implements CanActivate{
    public constructor(private readonly providerService:ProviderService){}

    public canActivate(context: ExecutionContext){
        const request=context.switchToHttp().getRequest() as Request
        const provider=request.params.provider
        const ProviderInstance=this.providerService.findByService(provider as string)

        if(!ProviderInstance){
            throw new NotFoundException(`Провайдер ${provider} не знайдений. Будь ласка перевірте правильність введених даних`)
        }
        return true
    }
}