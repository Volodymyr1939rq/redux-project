import { Injectable } from "@nestjs/common";
import { render } from "@react-email/render";
import * as React from 'react'

@Injectable()
export class TemplateService{
    public async generateHtml(component:React.ReactElement):Promise<string>{
        return await render(component)
    }
}