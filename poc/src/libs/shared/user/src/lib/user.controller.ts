import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtGuard } from '@poc/auth';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    @Get('me')
    getCurrentUser(@CurrentUser() user: User) {
        return user;
    }
}
