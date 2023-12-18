import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtGuard } from '@poc/auth';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
    @UseGuards(JwtGuard)
    @Get('me')
    getCurrentUser(@CurrentUser() user: User) {
        return user;
    }
}
