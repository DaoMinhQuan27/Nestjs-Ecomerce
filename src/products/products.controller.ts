import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IUser } from 'src/auth/user.interface';
import { Public, ResponseMessage, User } from 'src/decorator/customzie.decorator';
import { IRating } from './ratings.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ResponseMessage('Create a product')
  create(@Body() createProductDto: CreateProductDto, @User() user : IUser) {
    return this.productsService.create(createProductDto , user);
  }

  @Post('ratings')
  @ResponseMessage('Ratings a product')
  createRating(@Body() body : IRating, @User() user : IUser) {
    return this.productsService.createRating(body, user);
  }

  @Public()
  @Get()
  @ResponseMessage('Fetch products with pagination')
  async findAll(@Query() query: any, @Query('page') page: string, @Query('limit') limit: string) {
    return this.productsService.findAll(+page, +limit, query);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Fetch product by id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update a product')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @User() user : IUser) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete a product')
  remove(@Param('id') id: string , @User() user : IUser) {
    return this.productsService.remove(id, user);
  }
}
