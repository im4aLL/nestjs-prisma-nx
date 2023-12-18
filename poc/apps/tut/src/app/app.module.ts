import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@poc/auth';
import { BookmarkModule } from '@poc/bookmark';
import { PrismaModule } from '@poc/prisma';
import { UserModule } from '@poc/user';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UserModule,
        BookmarkModule,
        PrismaModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
