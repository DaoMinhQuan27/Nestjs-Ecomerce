import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested, isNotEmpty } from 'class-validator';
import mongoose, { SchemaTypes } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';


export class CreateProductDto {
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @ApiProperty({required:false})
    slug: string;

    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @ApiProperty()
    brand: string;

    @ApiProperty()
    @IsNotEmpty()
    category: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @ApiProperty({required:false})
    price: number;

    @IsNotEmpty()
    @ApiProperty({required:false})
    quantity: number;
    
    @ApiProperty({required:false})
    sold: number;

    @ApiProperty({required:false})
    colors: string;

    @ApiProperty({required:false})
    images: string[];

    @ApiProperty({required:false})
    ratings: {star:number, postedBy:mongoose.Schema.Types.ObjectId, comment:string}[];


    @ApiProperty({required:false})
    totalRatings: number;
}

