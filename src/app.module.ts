import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesModule } from './roles/roles.module';
import { RolesGuard } from './auth/roles.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProductsModule } from './products/products.module';
import { ProductCategorysModule } from './product-categorys/product-categorys.module';
import { BlogCategorysModule } from './blog-categorys/blog-categorys.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    // Use MongoDb 
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        connectionFactory: connection => {
        connection.plugin(softDeletePlugin);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
      transport: {
        host: configService.get<string>('EMAIL_HOST'),
        secure: false,
      auth: {
        user: configService.get<string>('EMAIL_ADMIN'),
        pass: configService.get<string>('EMAIL_PASSWORD'),
      },
    },
      preview: configService.get<boolean>('EMAIL_PREVIEW'),
    }),
  inject: [ConfigService],
  }),
    UsersModule,
    AuthModule,
    RolesModule,
    ProductsModule,
    ProductCategorysModule,
    BlogCategorysModule,
    BlogsModule
  ],
  controllers: [AppController],
  providers: [AppService , 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  
})
export class AppModule {}
