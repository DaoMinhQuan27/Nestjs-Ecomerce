
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, } from 'class-validator';
import mongoose from 'mongoose';

export class CreateBlogDto {
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @ApiProperty({required:false})
    @IsOptional()
    view: string;

    @IsNotEmpty()
    @ApiProperty()
    category: mongoose.Schema.Types.ObjectId;

    @ApiProperty({required:false})
    @IsOptional()
    author: mongoose.Schema.Types.ObjectId;

    @ApiProperty({required:false})
    @IsOptional()
    likes: mongoose.Schema.Types.ObjectId[];

    @ApiProperty({required:false})
    @IsOptional()
    images: string;
}


