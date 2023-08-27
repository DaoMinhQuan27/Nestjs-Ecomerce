import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IUser } from 'src/auth/user.interface';
import { Product, ProductDocument } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import slugify from 'slugify';
import aqp from 'api-query-params';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: SoftDeleteModel<ProductDocument>,) {}

  async create(createProductDto: CreateProductDto, user :IUser) {
    try {
      console.log(createProductDto);
      const slug = slugify(createProductDto.title)
      createProductDto.slug = slug;
      
      const checkOldProduct = await this.productModel.findOne({slug});
      if(checkOldProduct) throw new BadRequestException('Product already exists');
      const product = await this.productModel.create({...createProductDto, createdBy: {email:user.email, _id: user._id}});
      return product ;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(page: number, limit: number, query: any) {
    const limit1 = limit || 5;
    const offset = (page - 1) * limit1;
    const { filter, sort, projection, population } = aqp(query);
    delete filter.page;
    const totalItems = await this.productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit1);
    
    let result = await this.productModel.find(filter).limit(limit1).skip(offset)
      // @ts-ignore:Unreachable code error
      .sort(sort).select(projection).populate(population)
      ;
      return {
        meta : {
          current:page,
          pageSize:limit1,
          pages:totalPages,
          total:totalItems,
        },
        result
      }
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id);
      if(!product || product.isDeleted == true) throw new BadRequestException('Product not found')
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto, user :IUser) {
    try {
      const product = await this.productModel.findById(id);
      if(!product) throw new BadRequestException('Product not found');
      const slug = slugify(updateProductDto.title)
      updateProductDto.slug = slug;
      const response = await this.productModel.updateOne({_id: id}, {...updateProductDto, updatedBy: {email:user.email, _id: user._id}});
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string, user :IUser) {
    try {
      const product = await this.productModel.findById(id);
      if(!product) throw new BadRequestException('Product not found');
      const response = await this.productModel.updateOne({_id: id}, {deletedBy: {email:user.email, _id: user._id}});
      return this.productModel.softDelete({_id: id});
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
