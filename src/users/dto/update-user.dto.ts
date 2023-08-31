import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ArrayMinSize, IsArray, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @ApiProperty()
    @IsArray()
    @ArrayMinSize(1)
    cart: {
        product:mongoose.Schema.Types.ObjectId,
        quantity: number
        color: string
    }[]
}
