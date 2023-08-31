import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, } from 'class-validator';

export class CreateCouponDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @ApiProperty()
    discount: number;

    @IsNotEmpty()
    @ApiProperty()
    expiredDate: string;

}
