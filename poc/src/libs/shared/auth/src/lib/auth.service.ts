import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@poc/prisma';
import { SigninDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService
    ) {}

    async signup(dto: SignupDto): Promise<User> {
        const hash = await argon.hash(dto.password);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            },
        });

        return user;
    }

    async signin(dto: SigninDto): Promise<{ access_token: string }> {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) {
            throw new ForbiddenException('Incorrect user or password');
        }

        const isPasswordMatched = await argon.verify(user.hash, dto.password);

        if (!isPasswordMatched) {
            throw new ForbiddenException('Incorrect user or password');
        }

        return {
            access_token: await this.generateAccessToken(user.id, user.email),
        };
    }

    generateAccessToken(id: number, email: string): Promise<string> {
        const payload = { sub: id, email };

        return this.jwtService.signAsync(payload);
    }
}
