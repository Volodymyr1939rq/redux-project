import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly prismaService:PrismaService
  ) {}

}
