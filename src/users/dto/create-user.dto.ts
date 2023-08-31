import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
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
    @IsOptional()
    address: string;

    @ApiProperty()
    @IsOptional()
    wishlist: mongoose.Schema.Types.ObjectId;

    @ApiProperty({required:false})
    @IsOptional()
    phone: string;

    @ApiProperty({required:false})
    @IsOptional()
    image: string;

    @ApiProperty({required:false})
    @IsOptional()
    isActive: boolean;

    @ApiProperty({required:false})
    @IsOptional()
    gender: string;

    @ApiProperty({required:false})
    @IsOptional()
    typeLogin: string;

    @ApiProperty({required:false})
    @IsOptional()
    age: number;

    @ApiProperty({required:false})
    @IsOptional()
    wishList: mongoose.Schema.Types.ObjectId[];

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
    @IsOptional()
    address: string;
    @ApiProperty({required:false})
    @IsOptional()
    phone: string;
    @ApiProperty({required:false})
    @IsOptional()
    gender: string;
    @ApiProperty({required:false})
    @IsOptional()
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