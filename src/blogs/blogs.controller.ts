import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UseInterceptors, UploadedFile,BadRequestException, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customzie.decorator';
import { IUser } from 'src/auth/user.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from 'src/uploads/uploads.service';
import { Throttle } from '@nestjs/throttler';


@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService,
    private readonly uploadsService: UploadsService,
    ) {}

  @Post()
  @ResponseMessage('Create a blog')
  create(@Body() createBlogDto: CreateBlogDto, @User() user: IUser) {
    return this.blogsService.create(createBlogDto, user);
  }

  @Post('upload/:id')
  @Throttle(3, 60)
  @ResponseMessage('Upload image for blog')
  @UseInterceptors(FileInterceptor('images'))
  async uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        // Max:5MB
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5  }),
        new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
      ],
    }),
  ) file: Express.Multer.File, @Param('id') id: string, @User() user: IUser) {
    const upload = await this.uploadsService.uploadSingleFile(file.buffer, file.originalname, 'blogs', id);
    if(upload) {
      return this.blogsService.updateImage(upload.fileUrl, id, user);
    } else {
      throw new Error('Upload failed');
    }
  }

  @Patch('upload/:id')
  @Throttle(3, 60)
  @ResponseMessage('Update image for blog')
  @UseInterceptors(FileInterceptor('images'))
  async updateFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        // Max:5MB
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5  }),
        new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
      ],
    }),
  ) file: Express.Multer.File, @Param('id') id: string, @User() user: IUser) {
    if(!file) throw new BadRequestException('Require images');
    // Delete old image
    const blog = await this.blogsService.findOne(id);
    if(blog.images) {
      await this.uploadsService.deleteSingleFile(blog.images);
    }

    // Upload new image
    const upload = await this.uploadsService.uploadSingleFile(file.buffer, file.originalname, 'blogs', id);
    if(upload) {
      return this.blogsService.updateImage(upload.fileUrl, id, user);
    } else {
      throw new Error('Upload failed');
    }
  }

  @Delete('upload/:id')
  @Throttle(3, 60)
  @ResponseMessage('Delete image for blog')
  async deleteFile( @Param('id') id: string, @Body() body: any, @User() user: IUser) {
    const upload = await this.uploadsService.deleteSingleFile(body.fileName);
    return this.blogsService.updateImage('', id,user);
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
