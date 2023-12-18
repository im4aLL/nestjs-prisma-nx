import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() dto: SignupDto): Promise<User> {
        return await this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: SigninDto) {
        return this.authService.signin(dto);
    }
}
