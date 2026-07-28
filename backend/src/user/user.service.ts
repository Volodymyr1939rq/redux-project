import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthProvider, Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    public constructor(private readonly prismaService:PrismaService){}

    async getUserById(id:string){
        const user=await this.prismaService.user.findUnique({
            where:{
                id
            },
            include:{
                accounts:true
            }
        })
        if(!user){
            throw new NotFoundException("Користувач не знайдений,будь ласка перевірте введені дані")
        }
        return user
    }

    async findByEmail(email:string){
        const user=await this.prismaService.user.findUnique({
            where:{
                email
            },
            include:{
                accounts:true
            }
        })
        return user
    }

    async findUserByPhoneNumber(phone:string){
        const user=await this.prismaService.user.findUnique({
            where:{
                phone
            },
            include:{
                accounts:true
            }
        })
        return user
    }

    async createUser(
        email:string | null,
        phone:string | null,
        picture:string | null,
        name:string,
        isVerified:boolean,
        password?:string | null
    )
    {
        if(email){
            const existedUser=await this.findByEmail(email)
            if(existedUser){
                return existedUser
            }
        }

        if(phone){
            const existUserWithPhone=await this.findUserByPhoneNumber(phone)
            if(existUserWithPhone){
                return existUserWithPhone
            }
        }
        const user=await this.prismaService.user.create({
            data:{
                email,
                phone,
                picture,
                name,
                isVerified,
                password:password ? await hash(password) : null,
            },
            include:{
                accounts:true
            }
        })
        return user
    }

    async update(id:string,data:Prisma.UserUpdateInput){
        const updateUser=await this.prismaService.user.update({
            where:{
                id
            },
            data
        })
        return updateUser
    }
    
}
