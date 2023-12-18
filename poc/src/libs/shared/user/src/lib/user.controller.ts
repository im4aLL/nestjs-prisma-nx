import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser, JwtGuard } from '@poc/auth';
import { User } from '@prisma/client';

@ApiTags('User')
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    @Get('me')
    getCurrentUser(@CurrentUser() user: User) {
        return user;
    }
}
