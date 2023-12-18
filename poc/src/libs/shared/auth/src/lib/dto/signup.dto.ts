import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
    @ApiProperty({
        required: true,
        description: 'Must be a valid email',
        example: 'john@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        required: true,
        description: 'Password',
        example: 'Password',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
