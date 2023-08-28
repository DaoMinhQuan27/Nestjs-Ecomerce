import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductCategorysService } from './product-categorys.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { IUser } from 'src/auth/user.interface';
import { Public, ResponseMessage, User } from 'src/decorator/customzie.decorator';

@Controller('product-categorys')
export class ProductCategorysController {
  constructor(private readonly productCategorysService: ProductCategorysService) {}

  @Post()
  @ResponseMessage('Create a product category')
  create(@Body() createProductCategoryDto: CreateProductCategoryDto, @User() user : IUser) {
    return this.productCategorysService.create(createProductCategoryDto,user);
  }

  @Public()
  @Get()
  @ResponseMessage('Fetch product categorys with pagination')
  findAll(@Query('page') page: string, @Query('limit') limit: string, @Query() query: any) {
    return this.productCategorysService.findAll(+page, +limit, query);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Fetch a product category by id')
  findOne(@Param('id') id: string) {
    return this.productCategorysService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update a product category')
  update(@Param('id') id: string, @Body() updateProductCategoryDto: UpdateProductCategoryDto, @User() user : IUser) {
    return this.productCategorysService.update(id, updateProductCategoryDto,user);
  }

  @Delete(':id')
  @ResponseMessage('Delete a product category')
  remove(@Param('id') id: string, @User() user : IUser) {
    return this.productCategorysService.remove(id,user);
  }
}
