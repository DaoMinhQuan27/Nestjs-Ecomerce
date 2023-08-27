import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { IUser } from 'src/auth/user.interface';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
const bcrypt = require('bcryptjs');

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,) {}

  async findUserByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async register(user: RegisterUserDto, role: mongoose.Types.ObjectId) {
    try {
      const {password} = user;
      user.password = this.hashPassword(password);
      const newUser = await this.userModel.create({...user, role})
      return newUser;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  comparePassword(password: string, hashPassword: string) {
    return bcrypt.compareSync(password, hashPassword);
  }
  hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  updateRefreshToken(_id: string, refreshToken: string) {
    try {
      const response = this.userModel.updateOne({_id}, {refreshToken});
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async create(createUserDto: CreateUserDto, user :IUser) {
    try {
      const {password, email} = createUserDto;
      const checkEmail = await this.userModel.findOne({email});
      if(checkEmail) throw new BadRequestException('Email already exists');
      const response  = await this.userModel.create({...createUserDto, 
        password: this.hashPassword(password), createdBy: {email:user.email, _id: user._id}});

      return {
        _id:response._id,
        createdAt:response.createdAt,
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createUser(user:any) {
    try {
      const result = await this.userModel.create(user);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(page: number, limit: number, query: any) {
    const limit1 = limit || 5;
    const offset = (page - 1) * limit1;
    const { filter, sort, projection, population } = aqp(query);
    delete filter.page;
    const totalItems = await this.userModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit1);
    
    let result = await this.userModel.find(filter).limit(limit1).skip(offset)
      // @ts-ignore:Unreachable code error
      .sort(sort).select(projection).populate(population).select(['-password', '-refreshToken']).populate({path:'role', select:'name'})
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

  async findOne(id:string) {
    try {
      if(!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
      const user = await this.userModel.findById(id).populate({path:'role', select:'name'});
      if(!user || user.isDeleted == true) throw new BadRequestException('User not found')
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto, user :IUser) {
    try {
      if(!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
      console.log(updateUserDto);
      const response = await this.userModel.updateOne({_id: id},{...updateUserDto, updatedBy: {email:user.email, _id: user._id}});
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string, user :IUser) {
    try {
      if(!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
      const response = await this.userModel.updateOne({_id: id},{deletedBy: {email:user.email, _id: user._id}});
      return this.userModel.softDelete({_id: id});
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateChangeToken(id: any,changePasswordToken: string) {
    try {
      if(!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
      const response = await this.userModel.updateOne({_id: id},{
        passwordResetToken: changePasswordToken,
      });
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updatePassword(id:any,password: string) {
    try {
      if(!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid id');
      const response = await this.userModel.updateOne({_id: id},{
        password: this.hashPassword(password),
        passwordResetToken: '',
      });
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(id:any,update:any) {
    try {
      const response = await this.userModel.updateOne({_id: id},update);
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
