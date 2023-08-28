import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customzie.decorator';
import { IUser } from 'src/auth/user.interface';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @ResponseMessage('Create a blog')
  create(@Body() createBlogDto: CreateBlogDto, @User() user: IUser) {
    return this.blogsService.create(createBlogDto, user);
  }

  @Post('like/:id')
  @ResponseMessage('Like or unlike a blog')
  like(@User() user : IUser, @Param('id') id : string) {
    return this.blogsService.like(user, id);
  }

  @Public()
  @Get()
  @ResponseMessage('Fetch blogs with pagination')
  findAll(@Query() query: any, @Query('page') page: string, @Query('limit') limit: string) {
    return this.blogsService.findAll(+page, +limit, query);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Fetch blog by id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update a blog')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto, @User() user: IUser) {
    return this.blogsService.update(id, updateBlogDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete a blog')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.blogsService.remove(id, user);
  }
}
