import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, Roles, User } from 'src/decorator/customzie.decorator';
import { IUser } from 'src/auth/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(['admin'])
  @ResponseMessage('Create a user')
  create(@Body() createUserDto: CreateUserDto, @User() user : IUser) {
    console.log(createUserDto);
    return this.usersService.create(createUserDto, user);
  }

  @Get()
  @Roles(['admin'])
  @ResponseMessage('Fetch users with pagination')
  findAll(@Query() query: any, @Query('page') page: string, @Query('limit') limit: string) {
    return this.usersService.findAll(+page, +limit, query);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Fetch user by id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(['admin'])
  @ResponseMessage('Update a user')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @User() user : IUser) {
    console.log(updateUserDto);
    return this.usersService.update(id, updateUserDto,user);
  }

  @Delete(':id')
  @Roles(['admin'])
  @ResponseMessage('Delete a user')
  remove(@Param('id') id: string, @User() user : IUser) {
    return this.usersService.remove(id, user);
  }
}
