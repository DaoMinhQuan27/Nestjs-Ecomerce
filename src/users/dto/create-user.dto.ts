import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    address: mongoose.Schema.Types.ObjectId;

    @ApiProperty()
    wishlist: mongoose.Schema.Types.ObjectId;

    @ApiProperty({required:false})
    phone: string;

    @ApiProperty({required:false})
    image: string;

    @ApiProperty({required:false})
    isBlocked: boolean;

    @ApiProperty({required:false})
    gender: string;

    @ApiProperty({required:false})
    typeLogin: string;

    @ApiProperty({required:false})
    refreshToken: string;

    @ApiProperty({required:false})
    age: number;

    @ApiProperty({required:false})
    cart: string[];

    @ApiProperty({required:false})
    passwordChangeAt: string;

    @ApiProperty({required:false})
    passwordResetToken: string;
    

    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty()
    role: mongoose.Schema.Types.ObjectId;
}

export class RegisterUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty({required:false})
    address: string;
    @ApiProperty({required:false})
    phone: string;
    @ApiProperty({required:false})
    gender: string;
    @ApiProperty({required:false})
    age: number;

}

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'user1@gmail.com', description: 'email'})
    username: string;

    @IsNotEmpty()
    @ApiProperty({example: 'password123', description: 'Password'})
    password: string;
}