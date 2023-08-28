
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, } from 'class-validator';
import mongoose from 'mongoose';

export class CreateBlogDto {
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @ApiProperty({required:false})
    view: string;

    @IsNotEmpty()
    @ApiProperty()
    category: mongoose.Schema.Types.ObjectId;

    @ApiProperty({required:false})
    author: mongoose.Schema.Types.ObjectId;

    @ApiProperty({required:false})
    likes: mongoose.Schema.Types.ObjectId[];

    @ApiProperty({required:false})
    images: string;
}


