import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested, isNotEmpty } from 'class-validator';
import mongoose, { SchemaTypes } from 'mongoose';



export class CreateOrderDto {
    @ApiProperty()
    @IsOptional()
    products: {
        product:mongoose.Schema.Types.ObjectId,
        count:number, 
        color:string,
    }[]

    @ApiProperty()
    @IsOptional()
    coupon: mongoose.Schema.Types.ObjectId;

}

